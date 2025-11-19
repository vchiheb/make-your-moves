import { useContext } from "react";
import { ProjectsContext } from "../context/projects-context";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import ProjectToolbar from "./toolbars/ProjectToolbar";
import Task from "./Task";
import Goal from "./Goal";

import ImageCard from "./UI/ImageCard";

export default function Project({ data }) {
  const {
    handleDeleteProject,
    handleToggleTaskPriority,
    handleAddTask,
    handleArchiveTask,
    handleDeleteTask,
    handleSaveProject,
    handleArchiveProject,
    handleAddGoal,
    handleArchiveGoal,
    handleDeleteGoal,
    handleOpenGoalDrawer,
    handleOpenTaskDrawer,
    handleSetCurrentProject,
  } = useContext(ProjectsContext);
  return (
    <>
      {data && data.coverImage && (
        <ImageCard
          imageName={data.coverImage.fileName}
          href={`/projects/${data._id}`}
          title={data.title}
        >
          <div className="row" style={{ position: "relative" }}>
            <div className="col s10 m11">{data.description}</div>
            <div
              className="col s1 m1 project-toolbar"
              style={{ position: "relative" }}
            >
              <ProjectToolbar
                handleDeleteProject={handleDeleteProject}
                handleArchiveProject={handleArchiveProject}
                project={data}
                handleSaveProject={handleSaveProject}
              />
            </div>
          </div>
          <div>
            <Box
              component="div"
              sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
              noValidate
              autoComplete="off"
              fullwidth="true"
            >
              <TextField
                label="New Task"
                variant="outlined"
                fullwidth="true"
                onFocus={() => handleSetCurrentProject(data._id)}
                onKeyDown={(event) => handleAddTask(event, data._id, data)}
              />
            </Box>
          </div>
          {data.tasks &&
            data.tasks.map((item, index) => (
              <Task
                handleDeleteTask={handleDeleteTask}
                handleArchiveTask={handleArchiveTask}
                handleOpenTaskDrawer={handleOpenTaskDrawer}
                handleToggleTaskPriority={handleToggleTaskPriority}
                data={item}
                key={index}
                projectId={data._id}
              />
            ))}

          <div>
            <Box
              component="div"
              sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
              noValidate
              autoComplete="off"
              fullwidth="true"
            >
              <TextField
                label="New Goal"
                variant="outlined"
                fullwidth="true"
                onKeyDown={(event) => handleAddGoal(event, data._id, data)}
                onFocus={() => {
                  handleSetCurrentProject(data._id);
                }}
              />
            </Box>
          </div>
          {data.goals &&
            data.goals.map((item, index) => {
              return (
                <Goal
                  handleDeleteGoal={handleDeleteGoal}
                  handleArchiveGoal={handleArchiveGoal}
                  handleOpenGoalDrawer={handleOpenGoalDrawer}
                  data={item}
                  key={index}
                  projectId={data._id}
                />
              );
            })}
        </ImageCard>
      )}
    </>
  );
}
