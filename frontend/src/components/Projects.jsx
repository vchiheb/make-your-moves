import Project from "./Project";

export default function Projects({
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
  return (
    <>
      {data &&
        data.map((item, index) => {
          return (
            <div key={index}>
              <Project
                data={item}
                handleEditProject={handleEditProject}
                handleDeleteProject={handleDeleteProject}
                handleAddTask={handleAddTask}
                handleDeleteTask={handleDeleteTask}
                handleSaveProject={handleSaveProject}
                handleAddGoal={handleAddGoal}
                handleDeleteGoal={handleDeleteGoal}
                handleOpenGoalDrawer={handleOpenGoalDrawer}
                handleOpenTaskDrawer={handleOpenTaskDrawer}
                handleSetCurrentProject={handleSetCurrentProject}
              />
            </div>
          );
        })}
    </>
  );
}
