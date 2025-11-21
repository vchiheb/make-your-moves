import { useContext } from "react";
import { ProjectsContext } from "../../../context/projects-context";

import Drawer from "@mui/material/Drawer";
import TasksTrackingForm from "../forms/TasksTrackingForm";

import ProjectDrawerToolbar from "../toolbars/ProjectDrawerToolbar";
import TaskAccordion from "../../features/tasks/TaskAccordion";

export default function TasksDrawer({
  open,
  data,
  timerIsRunning,
  task,
  startTime,
  timeSpent,
}) {
  const { handleCloseTasksDrawer, handleSelectTaskForTimetracking } =
    useContext(ProjectsContext);

  return (
    <>
      <div>
        <Drawer anchor="top" open={open} transitionDuration={800}>
          <div className="projects-drawer">
            <div className="container">
              <ProjectDrawerToolbar
                handleCloseDrawer={handleCloseTasksDrawer}
              />
              <TasksTrackingForm
                task={task}
                timerIsRunning={timerIsRunning}
                startTime={startTime}
                timeSpent={timeSpent}
              />
              {data &&
                data.map((item, index) => (
                  <TaskAccordion
                    key={index}
                    data={item}
                    handleSelectTaskForTimetracking={
                      handleSelectTaskForTimetracking
                    }
                    project={item}
                    timerIsRunning={timerIsRunning}
                  />
                ))}
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}
