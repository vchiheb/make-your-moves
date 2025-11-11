import { useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import ArchiveIcon from "@mui/icons-material/Archive";

import ProjectToolbar from "./toolbars/ProjectToolbar";
import ToolbarButton from "./UI/ToolbarButton";
import ImageCard from "./UI/ImageCard";
import { useState } from "react";

export default function Project({
  data,
  handleEditProject,
  handleDeleteProject,
  handleAddTask,
  handleDeleteTask,
  handleSaveProject,
  handleAddGoal,
  handleDeleteGoal,
  handleOpenGoalDrawer,
  handleOpenTaskDrawer,
  handleSetCurrentProject,
}) {
  const dispatch = useDispatch();

  return (
    <>
      {data && data.coverImage && (
        <ImageCard
          imageName={data.coverImage.fileName}
          altText={data.coverImage.altText}
          href={`/projects/${data._id}`}
          title={data.title}
          artistName={data.coverImage.artistName}
          sourceUrl={data.coverImage.sourceUrl}
        >
          <ProjectToolbar
            handleEditProject={handleEditProject}
            handleDeleteProject={handleDeleteProject}
            projectId={data._id}
            handleSaveProject={handleSaveProject}
          />
          <div>{data.description}</div>
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
            data.tasks.map((item, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col s10">{item.title}</div>
                  <div className="col s1">
                    <ToolbarButton
                      title="Configure"
                      onClick={() =>
                        handleOpenTaskDrawer(item._id, data._id, item)
                      }
                    >
                      <SettingsIcon />
                    </ToolbarButton>
                  </div>
                  <div className="col s1">
                    <ToolbarButton
                      title="Delete Task"
                      onClick={() => handleDeleteTask(item._id, data._id)}
                    >
                      <DeleteIcon />
                    </ToolbarButton>
                  </div>
                </div>
              );
            })}

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
                <div className="row" key={index}>
                  <div className="col s10">{item.title}</div>

                  <div className="col s1">
                    <ToolbarButton
                      title="Configure"
                      onClick={() =>
                        handleOpenGoalDrawer(item._id, data._id, item)
                      }
                    >
                      <SettingsIcon />
                    </ToolbarButton>
                  </div>
                  <div className="col s1">
                    <ToolbarButton
                      title="Delete Goal"
                      onClick={() => handleDeleteGoal(item._id, data._id)}
                    >
                      <DeleteIcon />
                    </ToolbarButton>
                  </div>
                </div>
              );
            })}
        </ImageCard>
      )}
    </>
  );
}
