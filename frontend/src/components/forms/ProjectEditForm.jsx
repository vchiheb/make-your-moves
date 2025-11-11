import { useState } from "react";
import { useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import SubmitButton from "../UI/SubmitButton";
import { useUploadProductImageMutation } from "../../slices/projectApiSlice";
import { useDispatch } from "react-redux";

export default function ProjectEditForm({
  projectId,
  data,
  saveProjectDetails,
}) {
  console.log("id: ", projectId);
  const project = data;

  console.log("project: ", project);
  let projectTitle = null;
  let projectDescription = null;
  let projectCoverImageArtistName = null;
  let projectCoverImageAttributionLink = null;
  let projectCoverImageFileName = null;
  if (project) {
    projectTitle = project.title;
    projectDescription = project.description;
    projectCoverImageFileName = project.coverImage.fileName;
    projectCoverImageArtistName = project.coverImage.artistName;
    projectCoverImageAttributionLink = project.coverImage.sourceUrl;
  }
  const [title, setTitle] = useState(data.title);
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState(projectDescription);
  const [descriptionError, setDescriptionError] = useState(false);
  const [coverImageFileName, setCoverImageFileName] = useState(
    projectCoverImageFileName
  );
  const [coverImageArtistName, setCoverImageArtistName] = useState(
    projectCoverImageArtistName
  );
  const [coverImageAttributionLink, setCoverImageAttributionLink] = useState(
    projectCoverImageAttributionLink
  );
  const dispatch = useDispatch();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const handleSubmit = (event) => {
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

    if (valid) {
      console.log({ title });
      const projectItem = {
        _id: projectId,
        title: title,
        description: description,
        coverImage: {
          fileName: coverImageFileName,
          altText: title,
          sourceUrl: coverImageAttributionLink,
          artistName: coverImageArtistName,
        },
      };

      saveProjectDetails(projectItem);
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
      {project && (
        <div style={{ width: "100%" }}>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            fullWidth="true"
          >
            <Typography variant="h5">Edit Project</Typography>
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
              {coverImageFileName}
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>

            <TextField
              label="Cover Image Artist"
              variant="outlined"
              value={coverImageArtistName}
              onChange={(e) => setCoverImageArtistName(e.target.value)}
              error={descriptionError}
              helperText={
                descriptionError ? "Project description is required" : ""
              }
              fullWidth="true"
            />

            <TextField
              label="Cover Image Attribution Link"
              variant="outlined"
              value={coverImageAttributionLink}
              onChange={(e) => setCoverImageAttributionLink(e.target.value)}
              error={descriptionError}
              helperText={
                descriptionError ? "Project description is required" : ""
              }
              fullWidth="true"
            />

            <SubmitButton>Save</SubmitButton>
          </Box>
        </div>
      )}
    </>
  );
}
