import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ProjectContentToolbar({
  projectId,
  handleEditProject,
  handleDeleteProject,
}) {
  return (
    <>
      <div className="project-content-toolbar">
        <Box
          sx={{
            "& > :not(style)": {
              m: 1,
              _display: "flex",
              alignItems: "center",
              width: "175px",
            },
          }}
        >
          <Fab variant="extended" size="small" color="primary">
            <AddIcon sx={{ mr: 1 }} />
            New Goal
          </Fab>
          <Fab variant="extended" size="small" color="primary">
            <AddIcon sx={{ mr: 1 }} />
            New Task
          </Fab>
        </Box>
      </div>
    </>
  );
}
