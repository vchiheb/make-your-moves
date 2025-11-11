import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import ToolbarButton from "../UI/ToolbarButton";

export default function ProjectToolbar({
  projectId,
  handleEditProject,
  handleDeleteProject,
  handleSaveProject,
}) {
  return (
    <>
      <div className="project-toolbar">
        <Box
          sx={{
            "& > :not(style)": {
              m: 1,
              _display: "flex",
              alignItems: "center",
            },
          }}
        >
          <ToolbarButton
            id={projectId}
            onClick={() => handleEditProject(projectId)}
            title="Edit Project"
          >
            <EditIcon _sx={{ mr: 1 }} />
          </ToolbarButton>
          <ToolbarButton
            id={projectId}
            onClick={() => handleSaveProject(projectId)}
            title="Save Project"
          >
            <SaveIcon _sx={{ mr: 1 }} />
          </ToolbarButton>
          <ToolbarButton
            id={projectId}
            onClick={() => handleDeleteProject(projectId)}
            title="Delete Project"
          >
            <DeleteIcon _sx={{ mr: 1 }} />
          </ToolbarButton>
        </Box>
      </div>
    </>
  );
}
