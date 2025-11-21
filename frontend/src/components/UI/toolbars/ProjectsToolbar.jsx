import { useContext } from "react";
import { ProjectsContext } from "../../../context/projects-context";

import AddIcon from "@mui/icons-material/Add";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function ProjectsToolbar() {
  const {
    handleCreateNewProject,
    handleSchedule,
    handleOpenTasksDrawer,
    handleBuildSchedule,
  } = useContext(ProjectsContext);

  const [displayMenu, setDisplayMenu] = useState(false);
  return (
    <>
      <div
        style={{
          position: "relative",
          right: "0px",
          width: "35px",
          cursor: "pointer",
        }}
        onMouseEnter={() => setDisplayMenu(true)}
        onMouseLeave={() => setDisplayMenu(false)}
        onClick={() => setDisplayMenu(!displayMenu)}
      >
        {displayMenu && (
          <div
            className="_projects-toolbar"
            style={{
              position: "absolute",
              zIndex: "1000",
              display: "flex",
              flexDirection: "row",
              left: "30px",
            }}
          >
            <div
              variant="extended"
              title="New Project"
              size="small"
              color="primary"
              onClick={handleCreateNewProject}
            >
              <AddIcon sx={{ mr: 1 }} />
            </div>
            <div
              variant="extended"
              size="small"
              color="primary"
              title="Tasks"
              onClick={handleOpenTasksDrawer}
            >
              <AssignmentIcon sx={{ mr: 1 }} />
            </div>
            <div
              variant="extended"
              size="small"
              color="primary"
              title="Build Schedule"
              onClick={handleBuildSchedule}
            >
              <ScheduleIcon sx={{ mr: 1 }} />
            </div>
            <div
              variant="extended"
              size="small"
              title="Schedule"
              color="primary"
              onClick={handleSchedule}
            >
              <CalendarTodayIcon sx={{ mr: 1 }} />
            </div>
          </div>
        )}
        <MenuIcon />
      </div>
    </>
  );
}
