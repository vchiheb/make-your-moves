import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../theme"; // Import your custom theme

import Schedule from "../components/schedule/Schedule.js";
import {
  useAddTimeLogMutation,
  useGetTimeLogsQuery,
} from "../slices/timeLogApiSlice.js";
import {
  useAddActivityLogMutation,
  useGetActivityLogsQuery,
} from "../slices/activityLogApiSlice.js";

import {
  useGetProjectsQuery,
  useGetProjectQuery,
  useDeleteProjectMutation,
  useUpdateProjectTaskListMutation,
  useUpdateProjectGoalListMutation,
  useUpdateProjectMutation,
} from "../slices/projectApiSlice";
import {
  addProjects,
  deleteProject,
  addTask,
  deleteTask,
  addGoal,
  deleteGoal,
  setStateCurrentProjectId,
  updateProject,
  updateGoalsWithIds,
  updateTasksWithIds,
} from "../slices/projectSlice.js";

import Message from "../components/UI/Message.jsx";
import Loader from "../components/UI/Loader.jsx";

import ProjectsToolbar from "../components/toolbars/ProjectsToolbar.jsx";
import ProjectsDrawer from "../components/drawers/ProjectsDrawer.jsx";
import TrackTimeDrawer from "../components/drawers/TrackTimeDrawer.jsx";
import ScheduleDrawer from "../components/drawers/ScheduleDrawer.jsx";
import GoalDrawer from "../components/drawers/GoalDrawer.jsx";
import TaskDrawer from "../components/drawers/TaskDrawer.jsx";
import TasksDrawer from "../components/drawers/TasksDrawer.jsx";

import Projects from "../components/Projects.jsx";

export default function ProjectsScreen() {
  const [keyvar, setKey] = useState(0);

  const [currentProjectId, setCurrentProjectId] = useState(0);
  const [currentGoalId, setCurrentGoalId] = useState(-1);
  const [currentTaskId, setCurrentTaskId] = useState(-1);
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

  const scheduleBuilt = useSelector((state) => state.scheduleBuilt);
  const [buildSchedule, setBuildSchedule] = useState(!scheduleBuilt);
  const [schedule, setSchedule] = useState(null);

  const [goalDrawerIsOpen, setGoalDrawerIsOpen] = useState(false);
  const [taskDrawerIsOpen, setTaskDrawerIsOpen] = useState(false);
  const [projectsDrawerIsOpen, setProjectsDrawerIsOpen] = useState(false);
  const [trackTimeDrawerIsOpen, setTrackTimeDrawerIsOpen] = useState(false);
  const [scheduleDrawerIsOpen, setScheduleDrawerIsOpen] = useState(false);
  const [tasksDrawerIsOpen, setTasksDrawerIsOpen] = useState(false);

  const dispatch = useDispatch();

  const [deleteProjectFromDatabase, { isLoading2, error2 }] =
    useDeleteProjectMutation();
  const [saveProjectTaskList, { isLoading3, error3 }] =
    useUpdateProjectTaskListMutation();
  const [saveProjectGoalList, { data2: newPostData }] =
    useUpdateProjectGoalListMutation();
  const [updateProjectInDatabase, { isLoading: updatingProject }] =
    useUpdateProjectMutation();

  const [addTimeLogEntry] = useAddTimeLogMutation();
  const [addActivityLogEntry] = useAddActivityLogMutation();

  const { data: projects, isLoading, error } = useGetProjectsQuery();
  const { data: project } = useGetProjectQuery(currentProjectId);

  let stateData = useSelector((state) => {
    return state.project.projects;
  });
  if (!stateData || stateData.length === 0) {
    stateData = projects;
    dispatch(addProjects(projects));
  }

  console.log("state2: ", stateData);

  const resetComponent = () => {
    setKey((prevKey) => prevKey + 1);
  };

  // project functions

  async function handleEditProject(projectId) {
    setCurrentProjectId(projectId);
    resetComponent();
    setProjectsDrawerIsOpen(true);
  }

  function handleDeleteProject(projectId) {
    deleteProjectFromDatabase(projectId);
    dispatch(deleteProject(projectId));
    window.location.reload();
  }
  function handleCreateNewProject() {
    setCurrentProjectId(-1);
    setProjectsDrawerIsOpen(true);
  }

  function handleSetCurrentProject(projectId) {
    setCurrentProjectId(projectId);
    resetComponent();
  }

  function handleSaveProject(projectId) {
    let projectItem = null;
    for (let i = 0; i < stateData.length; i++) {
      if (stateData[i]._id === projectId) {
        projectItem = { ...stateData[i], projectId };
      }
    }

    saveProjectTaskList(projectItem);
    saveProjectGoalList(projectItem);
    console.log("project detais: ", projectItem);
  }

  function handleSaveProjectDetails(projectDetails) {
    if (projectDetails) {
      console.log("DETAILS: ", projectDetails);
      updateProjectInDatabase(projectDetails);
      dispatch(updateProject(projectDetails));
      window.location.reload();
    }
  }

  function handleCloseProjectsDrawer() {
    setProjectsDrawerIsOpen(false);
    resetComponent();
  }

  // time tracking functions
  function handleTrackTime() {
    setTrackTimeDrawerIsOpen(true);
  }

  function handleCloseTrackTimeDrawer() {
    setTrackTimeDrawerIsOpen(false);
  }

  // tasks functions

  function handleCloseTasksDrawer() {
    setTasksDrawerIsOpen(false);
  }

  function handleOpenTasksDrawer() {
    setTasksDrawerIsOpen(true);
  }

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
    //setTask({ title: "", duration: "" });
    const endTime = new Date();
    const timeSpentCalc = endTime - startTime;
    setTimerIsRunning(false);
    setStartTime(-1);
    setTimeSpent((timeSpentCalc / 1000 / 60).toFixed(2));
  }

  function handleLogTime(timeSpentInMinutes, timeSpentDescription) {
    console.log(
      "logging time - project: ",
      timerProject,
      " task: ",
      timerTask,
      " time spent description ",
      timeSpentDescription,
      "time spent in minutes: ",
      timeSpentInMinutes,
      "actual time spent: ",
      timeSpent
    );
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
      onDate: new Date(),
    };
    console.log("log entry: ", logEntry);
    addTimeLogEntry(logEntry);
  }

  // schedule functions
  function handleSchedule() {
    setScheduleDrawerIsOpen(true);
  }

  function handleCloseScheduleDrawer() {
    setScheduleDrawerIsOpen(false);
  }

  function handleBuildSchedule() {
    const schedule = new Schedule();
    schedule.buildSchedule(stateData);
    setSchedule(schedule);
    //setBuildSchedule(false);
  }

  function handleUpdateDayNote(note, dayTitle) {
    schedule.addDayNote(note, dayTitle);
    console.log("schedule 2: ", schedule);
    setSchedule(schedule);
  }

  function handleUpdateDayDate(date, dayTitle) {
    schedule.addDayDate(date, dayTitle);
    console.log("shcedule 3: ", schedule);
    setSchedule(schedule);
  }

  function handleUpdateTimeSlotNote(note, timeSlotTitle, day) {
    schedule.addTimeSlotNote(note, timeSlotTitle, day);
    console.log("schedule ", schedule);
    setSchedule(schedule);
  }

  function handleActivityState(
    activity,
    isDone,
    dayTitle,
    timeSlotTitle,
    timestamp
  ) {
    schedule.completeActivity(
      activity,
      dayTitle,
      timeSlotTitle,
      timestamp,
      isDone
    );
    setSchedule(schedule);
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
    console.log("activity log entry: ", activityLogEntry);
    addActivityLogEntry(activityLogEntry);
  }
  // task functions

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

  async function handleAddTask(event, projectId) {
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
      console.log("result: ", result);
      dispatch(addTask(newTask));
      dispatch(updateTasksWithIds({ projectId, tasks: result.tasks }));
      resetComponent();
      event.target.value = "";
    }
  }

  function handleDeleteTask(taskId, projectId) {
    const task = { _id: taskId, projectId: projectId };
    dispatch(deleteTask(task));
  }
  function handleSaveTaskList(projectId, newTask) {
    console.log("SAVING TASK CONFIG: ", newTask);

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
    console.log("UPDATED PROJECT: ", projectItem);

    saveProjectTaskList(projectItem);
  }

  function handleTasks() {
    setTaskDrawerIsOpen(true);
  }

  // goal functions

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

  async function handleAddGoal(event, projectId, existingProject) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      event.preventDefault();
      const newGoal = {
        _id: Math.random(),
        projectId: projectId,
        title: event.target.value,
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
      console.log("result: ", result);
      dispatch(addGoal(newGoal));
      dispatch(updateGoalsWithIds({ projectId, goals: result.goals }));
      resetComponent();
      event.target.value = "";
    }
  }

  function handleDeleteGoal(goalId, projectId) {
    const goal = { _id: goalId, projectId };
    dispatch(deleteGoal(goal));
  }

  function handleSaveGoalList(projectId, newGoal) {
    console.log("SAVING GOAL CONFIG: ", newGoal);

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

    console.log("UPDATED PROJECT: ", projectItem);

    saveProjectGoalList(projectItem);
  }

  return (
    <>
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
                  goalId={currentGoalId}
                  handleCloseDrawer={handleCloseGoalDrawer}
                  resetComponent={resetComponent}
                  currentGoal={goal}
                  key={keyvar + currentGoalId + 1}
                  saveGoalList={handleSaveGoalList}
                />
              }
              {task && (
                <TaskDrawer
                  open={taskDrawerIsOpen}
                  projectId={currentProjectId}
                  taskId={currentTaskId}
                  handleCloseDrawer={handleCloseTaskDrawer}
                  resetComponent={resetComponent}
                  currentTask={task}
                  key={keyvar + currentTaskId + 2}
                  project={project}
                  task={task}
                  saveTaskList={handleSaveTaskList}
                />
              )}
              <TrackTimeDrawer
                open={trackTimeDrawerIsOpen}
                handleCloseDrawer={handleCloseTrackTimeDrawer}
              />
              <ProjectsDrawer
                open={projectsDrawerIsOpen}
                handleCloseDrawer={handleCloseProjectsDrawer}
                projectId={currentProjectId}
                data={project}
                key={keyvar + currentProjectId + 3}
                saveProjectDetails={handleSaveProjectDetails}
              ></ProjectsDrawer>
              <ScheduleDrawer
                open={scheduleDrawerIsOpen}
                handleCloseDrawer={handleCloseScheduleDrawer}
                handleActivityState={handleActivityState}
                schedule={schedule}
                handleUpdateDayNote={handleUpdateDayNote}
                handleUpdateDayDate={handleUpdateDayDate}
                handleUpdateTimeSlotNote={handleUpdateTimeSlotNote}
                handleLogActivity={handleLogActivity}
              />
              <TasksDrawer
                open={tasksDrawerIsOpen}
                handleCloseDrawer={handleCloseTasksDrawer}
                data={stateData}
                handleSelectTaskForTimetracking={
                  handleSelectTaskForTimetracking
                }
                startTimeTrackingTimer={startTimeTrackingTimer}
                stopTimeTrackingTimer={stopTimeTrackingTimer}
                task={timerTask}
                timerIsRunning={timerIsRunning}
                startTime={startTime}
                timeSpent={timeSpent}
                handleLogTime={handleLogTime}
              />
              <ProjectsToolbar
                handleCreateNewProject={handleCreateNewProject}
                handleTrackTime={handleTrackTime}
                handleSchedule={handleSchedule}
                handleTasks={handleOpenTasksDrawer}
                handleBuildSchedule={handleBuildSchedule}
              />

              <Projects
                data={stateData}
                handleAddTask={handleAddTask}
                handleEditProject={handleEditProject}
                handleDeleteProject={handleDeleteProject}
                handleDeleteTask={handleDeleteTask}
                handleSaveProject={handleSaveProject}
                handleAddGoal={handleAddGoal}
                handleDeleteGoal={handleDeleteGoal}
                handleOpenGoalDrawer={handleOpenGoalDrawer}
                handleOpenTaskDrawer={handleOpenTaskDrawer}
                handleSetCurrentProject={handleSetCurrentProject}
              />
            </div>
          </ThemeProvider>
        </>
      )}
    </>
  );
}
