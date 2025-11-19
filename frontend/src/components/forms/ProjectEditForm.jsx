import { useState } from "react";
import { useContext } from "react";
import { ProjectsContext } from "../../context/projects-context";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import SubmitButton from "../UI/SubmitButton";
import {
  useUploadProductImageMutation,
  useAddProjectMutation,
} from "../../slices/projectApiSlice";
import { useDispatch } from "react-redux";
import { addProject } from "../../slices/projectSlice";

export default function ProjectEditForm({
  projectId,
  data,
  saveProjectDetails,
}) {
  const { handleAddNewProject, handleCloseProjectDrawer } =
    useContext(ProjectsContext);

  const project = data;

  let projectTitle = "";
  let projectDescription = "";
  let projectCoverImageFileName = null;
  if (project) {
    projectTitle = project.title;
    projectDescription = project.description;
    projectCoverImageFileName = project.coverImage.fileName;
  }
  const [title, setTitle] = useState(data ? data.title : "");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState(projectDescription);
  const [descriptionError, setDescriptionError] = useState(false);
  const [coverImageFileNameError, setCoverImageFileNameError] = useState(false);
  const [coverImageFileName, setCoverImageFileName] = useState(
    projectCoverImageFileName
  );

  const dispatch = useDispatch();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  const [addProjectToDatabase, { isLoading: loadingAddProject, refetch }] =
    useAddProjectMutation();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    let valid = true;

    // Validate name
    if (title.trim() === "") {
      setTitleError(true);
      valid = false;
    } else {
      setTitleError(false);
    }

    // validate description
    if (description.trim() === "") {
      setDescriptionError(true);
      valid = false;
    } else {
      setDescriptionError(false);
    }

    // validate cover image
    if (!coverImageFileName) {
      valid = false;
      setCoverImageFileNameError(true);
    }

    if (projectId === -1) {
      if (!valid) {
        return;
      }
      const projectItem = {
        title: title,
        description: description,
        coverImage: {
          fileName: coverImageFileName,
        },
      };
      const result = await addProjectToDatabase(projectItem);
      console.log("RESULT: ", result);
      //refetch();
      console.log("saved item", projectItem);
      dispatch(addProject(result.data));
      handleAddNewProject();
      handleCloseProjectDrawer();
    } else {
      if (valid) {
        console.log("TITLE: ", title);
        const projectItem = {
          _id: projectId,
          title: title,
          description: description,
          coverImage: {
            fileName: coverImageFileName,
          },
        };

        saveProjectDetails(projectItem);
      }
    }
  };
  // Create a visually hidden input for accessibility
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      console.log("Selected file:", files[0]);
      // You can now process the file, e.g., upload it to a server
    }
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setCoverImageFileName(res.image);
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {
        <div style={{ width: "100%" }}>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            fullWidth="true"
          >
            <Typography variant="h5">
              {projectId === -1 ? "Add" : "Edit"} Project
            </Typography>
            <TextField
              label="Project Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={titleError}
              helperText={titleError ? "Project title is required" : ""}
              fullWidth="true"
            />
            <TextField
              label="Project Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={descriptionError}
              helperText={
                descriptionError ? "Project description is required" : ""
              }
              fullWidth="true"
            />
            <Button
              component="label" // Turns the Button into a label element
              role={undefined} // Optional: Explicitly define role for accessibility
              variant="contained"
              tabIndex={-1} // Prevents the label from being tab-focusable directly
              startIcon={<CloudUploadIcon />}
            >
              {coverImageFileName ? coverImageFileName : "Upload Cover Image"}
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <span style={{ color: "red" }}>
              {coverImageFileNameError ? "Cover image is required" : ""}
            </span>

            <SubmitButton>Save</SubmitButton>
          </Box>
        </div>
      }
    </>
  );
}
