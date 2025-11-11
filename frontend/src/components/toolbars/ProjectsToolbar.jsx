import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function ProjectsToolbar({
  handleCreateNewProject,
  handleTrackTime,
  handleSchedule,
  handleTasks,
  handleBuildSchedule,
}) {
  return (
    <>
      <div className="projects-toolbar">
        <Box
          sx={{
            "& > :not(style)": {
              m: 1,
              display: "flex",
              alignItems: "center",
              width: "175px",
            },
          }}
        >
          <Fab
            variant="extended"
            size="small"
            color="primary"
            onClick={handleCreateNewProject}
          >
            <AddIcon sx={{ mr: 1 }} />
            New Project
          </Fab>
          <Fab
            variant="extended"
            size="small"
            color="primary"
            onClick={handleSchedule}
          >
            <CalendarTodayIcon sx={{ mr: 1 }} />
            Schedule
          </Fab>
          <Fab
            variant="extended"
            size="small"
            color="primary"
            onClick={handleTasks}
          >
            <AssignmentIcon sx={{ mr: 1 }} />
            Tasks
          </Fab>
          <Fab
            variant="extended"
            size="small"
            color="primary"
            onClick={handleBuildSchedule}
          >
            <ScheduleIcon sx={{ mr: 1 }} />
            Build Schedule
          </Fab>
        </Box>
      </div>
    </>
  );
}
