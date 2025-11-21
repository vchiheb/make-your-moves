import { useContext } from "react";
import { ProjectsContext } from "../../../context/projects-context";

import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteIcon from "@mui/icons-material/Delete";

import Drawer from "@mui/material/Drawer";
import ProjectArchiveDrawerToolbar from "../toolbars/ProjectArchiveDrawerToolbar";

export default function ProjectArchiveDrawer({ open, project }) {
  const {
    handleUnarchiveTask,
    handleDeleteTask,
    handleUnarchiveGoal,
    handleDeleteGoal,
  } = useContext(ProjectsContext);

  return (
    <div>
      <Drawer anchor="top" open={open} transitionDuration={800}>
        <div className="projects-drawer">
          <ProjectArchiveDrawerToolbar />
          <div className="container">
            <h1>Project Archive: {project && project.title}</h1>
            <h2>Tasks</h2>
            {project &&
              project.tasks &&
              project.tasks.map((t, index) => {
                if (t.archived)
                  return (
                    <div className="row" key={index}>
                      <div className="col s9">{t.title}</div>
                      <div className="col s1">
                        <div
                          onClick={() => handleUnarchiveTask(project, t)}
                          title="Unarchive Task"
                        >
                          <UnarchiveIcon _sx={{ mr: 1 }} />
                        </div>
                      </div>
                      <div className="col s1">
                        <div
                          onClick={() => handleDeleteTask(t, project._id)}
                          title="Delete Task"
                        >
                          <DeleteIcon _sx={{ mr: 1 }} />
                        </div>
                      </div>
                    </div>
                  );
                return;
              })}
            <h2>Goals</h2>
            {project &&
              project.goals &&
              project.goals.map((g, index) => {
                if (g.archived)
                  return (
                    <div className="row" key={index}>
                      <div className="col s9">{g.title}</div>
                      <div className="col s1">
                        <div
                          onClick={() => handleUnarchiveGoal(project, g)}
                          title="Unarchive Goal"
                        >
                          <UnarchiveIcon _sx={{ mr: 1 }} />
                        </div>
                      </div>
                      <div className="col s1">
                        <div
                          onClick={() => handleDeleteGoal(g, project._id)}
                          title="Delete Goal"
                        >
                          <DeleteIcon _sx={{ mr: 1 }} />
                        </div>
                      </div>
                    </div>
                  );
              })}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
