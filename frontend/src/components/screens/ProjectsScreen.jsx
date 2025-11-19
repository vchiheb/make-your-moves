import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ProjectsContext } from "../../context/projects-context.jsx";

import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../../theme.js";
import Schedule from "../schedule/Schedule.js";
import {
  useAddTimeLogMutation,
  useGetTimeLogsQuery,
} from "../../slices/timeLogApiSlice.js";
import {
  useAddActivityLogMutation,
  useGetActivityLogsQuery,
} from "../../slices/activityLogApiSlice.js";

import {
  useGetScheduleQuery,
  useAddScheduleMutation,
  useUpdateScheduleMutation,
} from "../../slices/scheduleApiSlice.js";

import {
  useGetProjectsQuery,
  useGetProjectQuery,
  useDeleteProjectMutation,
  useUpdateProjectTaskListMutation,
  useUpdateProjectGoalListMutation,
  useUpdateProjectMutation,
} from "../../slices/projectApiSlice.js";
import {
  addProjects,
  deleteProject,
  addTask,
  updateTask,
  deleteTask,
  archiveTask,
  unarchiveTask,
  addGoal,
  archiveGoal,
  unarchiveGoal,
  deleteGoal,
  setStateCurrentProjectId,
  updateProject,
  updateGoalsWithIds,
  updateTasksWithIds,
} from "../../slices/projectSlice.js";

import {
  addSchedule,
  completeActivity,
  addDayNote,
  addDayDate,
  addTimeSlotNote,
  resetDay,
} from "../../slices/scheduleSlice.js";

import Message from "../UI/Message.jsx";
import Loader from "../UI/Loader.jsx";

import ProjectsToolbar from "../toolbars/ProjectsToolbar.jsx";
import ProjectDrawer from "../drawers/ProjectDrawer.jsx";
import ScheduleDrawer from "../drawers/ScheduleDrawer.jsx";
import GoalDrawer from "../drawers/GoalDrawer.jsx";
import TaskDrawer from "../drawers/TaskDrawer.jsx";
import TasksDrawer from "../drawers/TasksDrawer.jsx";

import Projects from "../Projects.jsx";
import ProjectArchiveDrawer from "../drawers/ProjectArchiveDrawer.jsx";

export default function ProjectsScreen() {
  const projectsCtxValue = {
    stateData: [],
    handleViewProjectArchive,
    handleCloseProjectArchiveDrawer,
    handleUnarchiveTask,
    handleUnarchiveGoal,
    handleEditProject,
    handleCloseGoalDrawer,
    handleSaveGoalList,
    handleCloseTaskDrawer,
    handleSaveTaskList,
    handleAddNewProject,
    handleCloseProjectDrawer,
    handleSaveProjectDetails,
    handleCloseScheduleDrawer,
    handleActivityState,
    handleUpdateDayNote,
    handleUpdateDayDate,
    handleUpdateTimeSlotNote,
    handleLogActivity,
    handleCloseTasksDrawer,
    handleSelectTaskForTimetracking,
    startTimeTrackingTimer,
    stopTimeTrackingTimer,
    handleLogTime,
    handleCreateNewProject,
    handleSchedule,
    handleOpenTasksDrawer,
    handleBuildSchedule,
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
    handleSaveGoalConfig,
  };

  const [keyvar, setKey] = useState(0);

  const [currentProjectId, setCurrentProjectId] = useState(0);
  const [currentGoalId, setCurrentGoalId] = useState(-1);
  const [currentTaskId, setCurrentTaskId] = useState(-1);
  const [currentProject, setCurrentProject] = useState(null);
  const [goal, setGoal] = useState({
    title: "",
    duration: "",
    frequency: "",
    timePeriod: 1,
  });
  const [startTime, setStartTime] = useState(-1);
  const [timeSpent, setTimeSpent] = useState(0);
  const [task, setTask] = useState({ title: "", duration: "" });
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [timerTask, setTimerTask] = useState({ title: "", duration: "" });
  const [timerProject, setTimerProject] = useState(null);

  const [goalDrawerIsOpen, setGoalDrawerIsOpen] = useState(false);
  const [taskDrawerIsOpen, setTaskDrawerIsOpen] = useState(false);
  const [projectDrawerIsOpen, setProjectDrawerIsOpen] = useState(false);
  const [scheduleDrawerIsOpen, setScheduleDrawerIsOpen] = useState(false);
  const [tasksDrawerIsOpen, setTasksDrawerIsOpen] = useState(false);
  const [projectArchiveDrawerIsOpen, setProjectArchiveDrawerIsOpen] =
    useState(false);

  const dispatch = useDispatch();

  const [deleteProjectFromDatabase] = useDeleteProjectMutation();
  const [saveProjectTaskList] = useUpdateProjectTaskListMutation();
  const [saveProjectGoalList] = useUpdateProjectGoalListMutation();
  const [updateProjectInDatabase] = useUpdateProjectMutation();
  const [addScheduleToDatabase] = useAddScheduleMutation();

  const [addTimeLogEntry] = useAddTimeLogMutation();
  const [addActivityLogEntry] = useAddActivityLogMutation();

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { data: projects, isLoading, error } = useGetProjectsQuery();
  //const { data: project, refetch } = useGetProjectQuery(currentProjectId);

  let stateData = useSelector((state) => {
    return state.project.projects;
  });
  if (!stateData || stateData.length === 0) {
    stateData = projects;
    dispatch(addProjects(projects));
  }
  const project = useSelector((state) => {
    let proj = null;
    if (state.project && state.project.projects) {
      console.log("project: ", state.project.projects);
      proj = state.project.projects.filter((p) => p._id === currentProjectId);
      return proj[0];
    }
    return proj;
  });

  console.log("state: ", stateData);
  console.log("currentProjectId: ", currentProjectId);
  const { data: scheduleData } = useGetScheduleQuery();

  let scheduleState = useSelector((state) => {
    return state.schedule.schedule;
  });

  if (!scheduleState) {
    scheduleState = scheduleData;
    dispatch(addSchedule(scheduleData));
  }

  console.log("scheduleState: ", scheduleState);

  const resetComponent = () => {
    setKey((prevKey) => prevKey + 1);
  };

  /***************************************************
   * USER INTERFACE CHANGE FUNCTIONS
   */

  function handleViewProjectArchive(project) {
    setProjectArchiveDrawerIsOpen(true);
    setCurrentProjectId(project._id);
  }

  function handleCloseProjectArchiveDrawer() {
    setProjectArchiveDrawerIsOpen(false);
  }

  function handleCloseProjectDrawer() {
    setProjectDrawerIsOpen(false);
    resetComponent();
  }

  function handleCloseTasksDrawer() {
    setTasksDrawerIsOpen(false);
  }

  function handleOpenTasksDrawer() {
    setTasksDrawerIsOpen(true);
  }

  function handleSchedule() {
    setScheduleDrawerIsOpen(true);
  }

  function handleCloseScheduleDrawer() {
    setScheduleDrawerIsOpen(false);
  }

  function handleOpenTaskDrawer(taskId, projectId, task) {
    setCurrentProjectId(projectId);
    setCurrentTaskId(taskId);
    setTask(task);
    if (projectId) {
      dispatch(setStateCurrentProjectId(projectId));
    }
    setTaskDrawerIsOpen(true);
  }

  function handleCloseTaskDrawer(updatedTask) {
    setTaskDrawerIsOpen(false);
  }

  function handleOpenGoalDrawer(goalId, projectId, goal) {
    setCurrentProjectId(projectId);
    setCurrentGoalId(goalId);
    setGoal(goal);
    if (projectId) {
      dispatch(setStateCurrentProjectId(projectId));
    }
    setGoalDrawerIsOpen(true);
  }

  function handleCloseGoalDrawer() {
    setGoalDrawerIsOpen(false);
  }

  /***************************************************
   * DATABASE AND STATE UPDATE USER INTERACTIONS
   */

  // project functions

  function handleAddNewProject() {
    //resetComponent();
  }

  function handleEditProject(project) {
    setCurrentProjectId(project._id);
    resetComponent();
    setProjectDrawerIsOpen(true);
  }

  useEffect(() => {
    resetComponent();
  }, [currentProjectId]);

  function handleDeleteProject(project) {
    deleteProjectFromDatabase(project._id);
    dispatch(deleteProject(project._id));
    resetComponent();
    //window.location.reload();
  }
  function handleCreateNewProject() {
    setCurrentProjectId(-1);
    setProjectDrawerIsOpen(true);
  }

  function handleSetCurrentProject(projectId) {
    setCurrentProjectId(projectId);
    resetComponent();
  }

  function handleSaveGoalConfig() {
    resetComponent();
  }

  function handleSaveProject(project) {
    const projectId = project._id;
    let projectItem = null;
    for (let i = 0; i < stateData.length; i++) {
      if (stateData[i]._id === projectId) {
        projectItem = { ...stateData[i], projectId };
      }
    }

    saveProjectTaskList(projectItem);
    saveProjectGoalList(projectItem);
    //   refetch();
  }

  function handleSaveProjectDetails(projectDetails) {
    console.log("PROJECT DETAILS TO SAVE: ", projectDetails);
    if (projectDetails) {
      updateProjectInDatabase(projectDetails);
      //refetch();
      dispatch(updateProject(projectDetails));
      //window.location.reload();
      resetComponent();
      handleCloseProjectDrawer();
    }
  }

  function handleArchiveProject(projectId) {}

  /* time tracking functions */

  function handleSelectTaskForTimetracking(project, task) {
    setTimerTask(task);
    setTimerProject(project);
  }

  function startTimeTrackingTimer() {
    const startTime = new Date();
    console.log("start time: ", startTime);
    setStartTime(startTime);
    setTimerIsRunning(true);
    setTimeSpent("");
  }
  function stopTimeTrackingTimer() {
    const endTime = new Date();
    const timeSpentCalc = endTime - startTime;
    setTimerIsRunning(false);
    setStartTime(-1);
    setTimeSpent((timeSpentCalc / 1000 / 60).toFixed(2));
  }

  function handleLogTime(
    timeSpentInMinutes,
    timeSpentDescription,
    timeSpentDate
  ) {
    let calcTimeSpent = timeSpent;
    if (timeSpentInMinutes > 0) {
      calcTimeSpent = timeSpentInMinutes;
    }
    const logEntry = {
      project: timerProject._id,
      projectTitle: timerProject.title,
      task: timerTask._id,
      taskTitle: timerTask.title,
      description: timeSpentDescription,
      timeSpent: calcTimeSpent,
      onDate: timeSpentDate,
    };
    addTimeLogEntry(logEntry);
  }

  // schedule functions

  async function handleBuildSchedule() {
    const schedule = new Schedule();
    schedule.buildSchedule(stateData);
    const result = await addScheduleToDatabase({ schedule });
  }

  function handleUpdateDayNote(note, dayTitle) {
    dispatch(addDayNote({ note, dayTitle }));

    //schedule.addDayNote(note, dayTitle);
  }

  function handleUpdateDayDate(date, dayTitle) {
    dispatch(addDayDate({ date, dayTitle }));
    //schedule.addDayDate(date, dayTitle);
  }

  function handleUpdateTimeSlotNote(note, timeSlotTitle, day) {
    dispatch(addTimeSlotNote({ note, timeSlotTitle, dayTitle: day }));
    //schedule.addTimeSlotNote(note, timeSlotTitle, day);
  }

  function handleActivityState(
    activity,
    isDone,
    dayTitle,
    timeSlotTitle,
    timestamp
  ) {
    const payload = {
      activity,
      dayTitle,
      timeSlotTitle,
      isDone,
      timestamp,
    };
    dispatch(completeActivity(payload));
  }

  function handleLogActivity(day) {
    const activityLogEntry = {
      day: day.title,
      note: day.note,
      date: day.date,
      onWaking: day.onWaking,
      morning: day.morning,
      midday: day.midday,
      afternoon: day.afternoon,
      evening: day.evening,
      bedtime: day.bedtime,
    };
    addActivityLogEntry(activityLogEntry);
    dispatch(resetDay({ dayTitle: day.title }));
    resetComponent();
  }

  // task functions
  async function handleAddTask(event, projectId, project) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      event.preventDefault();
      const newTask = {
        _id: Math.random(),
        projectId: projectId,
        title: event.target.value,
      };
      dispatch(addTask(newTask));
      setTask(newTask);

      setCurrentProjectId(projectId);
      setCurrentTaskId(newTask._id);

      let projectItem = null;
      for (let i = 0; i < stateData.length; i++) {
        if (stateData[i]._id === projectId) {
          if (stateData[i].tasks) {
            projectItem = {
              ...stateData[i],
              projectId,
              tasks: [...stateData[i].tasks, newTask],
            };
          } else {
            projectItem = {
              ...stateData[i],
              projectId,
              tasks: [newTask],
            };
          }
        }
      }

      const result = await saveProjectTaskList(projectItem).unwrap();
      dispatch(addTask(newTask));
      dispatch(updateTasksWithIds({ projectId, tasks: result.tasks }));
      //refetch();

      resetComponent();
      event.target.value = "";
    }
  }

  function handleToggleTaskPriority(task, projectId) {
    let newPriority = "none";
    console.log("task.priority: ", task.priority);
    if (!task.priority) newPriority = "low";
    if (task.priority === "low") newPriority = "medium";
    if (task.priority === "medium") newPriority = "high";
    if (task.priority === "high") newPriority = "none";
    if (task.priority === "none") newPriority = "low";
    const updatedTask = { ...task, priority: newPriority };
    console.log("priority: ", updatedTask);
    dispatch(updateTask({ projectId, task: updatedTask }));

    let project = stateData.filter((p) => p._id === projectId);
    if (project[0] && project[0].tasks) {
      const updatedProject = {
        ...project[0],
        tasks: project[0].tasks.map((x) => {
          if (x._id === updatedTask._id) {
            return updatedTask;
          }
          return x;
        }),
      };
      saveProjectTaskList(updatedProject);
      //refetch();
    }
  }

  function handleDeleteTask(task, projectId) {
    const payload = { _id: task._id, projectId: projectId };
    dispatch(deleteTask(payload));
  }

  function handleArchiveTask(taskId, projectId) {
    const payload = { _id: taskId, projectId: projectId };
    // update in state
    dispatch(archiveTask(payload));

    // update in database
    const now = new Date();

    let projectItem = null;
    for (let i = 0; i < stateData.length; i++) {
      if (stateData[i]._id === projectId) {
        if (stateData[i].tasks) {
          projectItem = {
            ...stateData[i],
            projectId,
            tasks: [
              ...stateData[i].tasks.map((x) => {
                if (x._id === taskId) {
                  return {
                    ...x,
                    archived: true,
                    dateArchived: formatter.format(now),
                  };
                }
                return x;
              }),
            ],
          };
        }
      }
    }

    saveProjectTaskList(projectItem);
  }

  function handleUnarchiveTask(project, task) {
    const payload = { _id: task._id, projectId: project._id };
    // update in state
    dispatch(unarchiveTask(payload));

    // update in database
    const now = new Date();
    const projectId = project._id;
    const taskId = task._id;

    let projectItem = null;
    for (let i = 0; i < stateData.length; i++) {
      if (stateData[i]._id === projectId) {
        if (stateData[i].tasks) {
          projectItem = {
            ...stateData[i],
            projectId,
            tasks: [
              ...stateData[i].tasks.map((x) => {
                if (x._id === taskId) {
                  return {
                    ...x,
                    archived: false,
                    dateArchived: null,
                  };
                }
                return x;
              }),
            ],
          };
        }
      }
    }

    saveProjectTaskList(projectItem);
  }

  function handleSaveTaskList(projectId, newTask) {
    let projectItem = null;
    for (let i = 0; i < stateData.length; i++) {
      if (stateData[i]._id === projectId) {
        if (stateData[i].tasks) {
          projectItem = {
            ...stateData[i],
            projectId,
            tasks: [
              ...stateData[i].tasks.map((x) => {
                if (x._id === newTask._id) {
                  return newTask;
                }
                return x;
              }),
            ],
          };
        } else {
          projectItem = {
            ...stateData[i],
            projectId,
            tasks: [newTask],
          };
        }
      }
    }

    saveProjectTaskList(projectItem);
    //refetch();
  }

  // goal functions
  async function handleAddGoal(event, projectId, project) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      event.preventDefault();
      const newGoal = {
        _id: Math.random(),
        projectId: projectId,
        title: event.target.value,
        priority: null,
        duration: null,
        frequency: null,
        timePeriod: 1,
        timeSlots: null,
        days: null,
        archived: false,
        dateArchived: null,
      };

      setCurrentProjectId(projectId);
      setCurrentGoalId(newGoal._id);
      setGoal(newGoal);

      let projectItem = null;
      for (let i = 0; i < stateData.length; i++) {
        if (stateData[i]._id === projectId) {
          if (stateData[i].goals) {
            projectItem = {
              ...stateData[i],
              _id: projectId,
              goals: [...stateData[i].goals, newGoal],
            };
          } else {
            projectItem = {
              ...stateData[i],
              _id: projectId,
              goals: [newGoal],
            };
          }
        }
      }
      const result = await saveProjectGoalList(projectItem).unwrap();
      dispatch(addGoal(newGoal));
      dispatch(updateGoalsWithIds({ projectId, goals: result.goals }));
      resetComponent();
      event.target.value = "";
    }
  }

  function handleArchiveGoal(goalId, projectId) {
    const payload = { _id: goalId, projectId: projectId };
    // update in state
    dispatch(archiveGoal(payload));

    // update in database
    const now = new Date();

    let projectItem = null;
    for (let i = 0; i < stateData.length; i++) {
      if (stateData[i]._id === projectId) {
        if (stateData[i].tasks) {
          projectItem = {
            ...stateData[i],
            projectId,
            goals: [
              ...stateData[i].goals.map((x) => {
                if (x._id === goalId) {
                  return {
                    ...x,
                    archived: true,
                    dateArchived: formatter.format(now),
                  };
                }
                return x;
              }),
            ],
          };
        }
      }
    }

    saveProjectGoalList(projectItem);
  }

  function handleUnarchiveGoal(project, goal) {
    const payload = { _id: goal._id, projectId: project._id };
    // update in state
    dispatch(unarchiveGoal(payload));

    // update in database
    const now = new Date();
    const projectId = project._id;
    const goalId = goal._id;

    let projectItem = null;
    for (let i = 0; i < stateData.length; i++) {
      if (stateData[i]._id === projectId) {
        if (stateData[i].goals) {
          projectItem = {
            ...stateData[i],
            projectId,
            goals: [
              ...stateData[i].goals.map((x) => {
                if (x._id === goalId) {
                  return {
                    ...x,
                    archived: false,
                    dateArchived: null,
                  };
                }
                return x;
              }),
            ],
          };
        }
      }
    }

    saveProjectGoalList(projectItem);
  }

  function handleDeleteGoal(goal, projectId) {
    const payload = { _id: goal._id, projectId };
    dispatch(deleteGoal(payload));
  }

  function handleSaveGoalList(projectId, newGoal) {
    let projectItem = null;
    for (let i = 0; i < stateData.length; i++) {
      if (stateData[i]._id === projectId) {
        if (stateData[i].goals) {
          projectItem = {
            ...stateData[i],
            projectId,
            goals: [
              ...stateData[i].goals.map((x) => {
                if (x._id === newGoal._id) {
                  return newGoal;
                }
                return x;
              }),
            ],
          };
        } else {
          projectItem = {
            ...stateData[i],
            projectId,
            goals: [newGoal],
          };
        }
      }
    }

    saveProjectGoalList(projectItem);
  }

  return (
    <ProjectsContext.Provider value={projectsCtxValue}>
      {isLoading ? (
        <div className="container">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="error">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <ThemeProvider theme={customTheme}>
            <div className="container">
              {
                <GoalDrawer
                  open={goalDrawerIsOpen}
                  projectId={currentProjectId}
                  currentGoal={goal}
                  key={keyvar + currentGoalId + 1}
                />
              }
              {task && (
                <TaskDrawer
                  open={taskDrawerIsOpen}
                  projectId={currentProjectId}
                  currentTask={task}
                  key={keyvar + currentTaskId + 2}
                />
              )}

              <ProjectArchiveDrawer
                open={projectArchiveDrawerIsOpen}
                project={project}
                key={keyvar + currentTaskId + 4}
              />
              <ProjectDrawer
                open={projectDrawerIsOpen}
                projectId={currentProjectId}
                data={project}
                key={keyvar + currentTaskId + 3}
              ></ProjectDrawer>
              <ScheduleDrawer
                open={scheduleDrawerIsOpen}
                schedule={scheduleState}
                key={keyvar + currentTaskId + 5}
              />
              <TasksDrawer
                open={tasksDrawerIsOpen}
                data={stateData}
                task={timerTask}
                timerIsRunning={timerIsRunning}
                startTime={startTime}
                timeSpent={timeSpent}
              />
              <ProjectsToolbar />

              <Projects data={stateData} />
            </div>
          </ThemeProvider>
        </>
      )}
    </ProjectsContext.Provider>
  );
}
