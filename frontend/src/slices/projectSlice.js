import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

import sortByTitle from "../utils/sort.js";
import ProjectToolbar from "../components/toolbars/ProjectToolbar.jsx";

const initialState = localStorage.getItem("projects")
  ? JSON.parse(localStorage.getItem("projects"))
  : { projects: [] };

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setStateCurrentProjectId: (state, action) => {
      const currentProjectId = action.payload;
      const newState = { ...state };
      newState.currentProjectId = currentProjectId;
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    setCurrentGoalId: (state, action) => {
      const currentGoalId = action.payload;
      const newState = { ...state, currentGoalId };
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    setCurrentTaskId: (state, action) => {
      const currentTaskId = action.payload;
      const newState = { ...state, currentTaskId };
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    addProjects: (state, action) => {
      state.projects = action.payload;
      localStorage.setItem("projects", JSON.stringify(state));
      return state;
    },
    addProject: (state, action) => {
      const newProject = action.payload;
      console.log("new project: ", newProject);
      const newState = { ...state, projects: [...state.projects, newProject] };
      newState.projects.sort((a, b) => sortByTitle(a, b));
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    updateProject: (state, action) => {
      const projectDetails = action.payload;
      console.log("updating project: ", projectDetails);
      const newState = {
        ...state,
        projects: state.projects.map((proj) => {
          if (proj._id === projectDetails._id) {
            console.log("found a match");
            return projectDetails;
          }
          return proj;
        }),
      };
      // resort the project array after update
      newState.projects.sort((a, b) => sortByTitle(a, b));
      localStorage.setItem("projects", JSON.stringify(state));
      return newState;
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((x) => {
        return x._id != action.payload;
      });
      localStorage.setItem("projects", JSON.stringify(state));
      return state;
    },
    addGoal: (state, action) => {
      console.log("add goal, action payload", action.payload);
      const projectId = action.payload.projectId;
      const goalItem = { _id: action.payload._id, title: action.payload.title };
      const newState = {
        projects: state.projects.map((proj) => {
          if (proj._id === projectId) {
            console.log("adding new goal");
            if (proj.goals) {
              return {
                ...proj,
                goals: [...proj.goals, goalItem].sort((a, b) =>
                  sortByTitle(a, b)
                ),
              };
            } else {
              return { ...projectId, goals: [goalItem] };
            }
          }
          return proj;
        }),
      };

      console.log("add goal updated state, ", newState);
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    updateGoalsWithIds: (state, action) => {
      const projectId = action.payload.projectId;
      const goalList = action.payload.goals;
      // SORT TASK LIST BY TITLE

      const g = [...goalList];

      const t = [...goalList];
      t.sort((a, b) => sortByTitle(a, b));
      const newState = {
        ...state,
        projects: [
          ...state.projects.map((proj) => {
            if (proj._id === projectId) {
              return { ...proj, goals: t };
            }
            return proj;
          }),
        ],
      };

      // SORT TASK LIST BY TITLE

      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    saveGoalConfig: (state, action) => {
      const projectId = action.payload.projectId;
      const goal = action.payload.updatedGoal;
      const goalId = goal._id;
      console.log("goal: ", goal);
      const newState = {
        ...state,
        projects: state.projects.map((proj) => {
          if (proj._id === projectId) {
            return {
              ...proj,
              goals: proj.goals
                .map((g) => {
                  if (g._id === goalId) {
                    return goal;
                  }
                  return g;
                })
                .sort((a, b) => sortByTitle(a, b)),
            };
          }
          return proj;
        }),
      };

      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    deleteGoal: (state, action) => {
      console.log("payload: ", action.payload);
      const projectId = action.payload.projectId;
      const goalId = action.payload._id;

      const newState = {
        projects: state.projects.map((proj) => {
          if (proj._id === projectId) {
            return {
              ...proj,
              goals: proj.goals.filter((x) => x._id != goalId),
            };
          }
          return proj;
        }),
      };
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    unarchiveGoal: (state, action) => {
      console.log("payload: ", action.payload);
      const projectId = action.payload.projectId;
      const goalId = action.payload._id;
      const now = new Date();
      const newState = {
        projects: state.projects.map((proj) => {
          if (proj._id === projectId) {
            return {
              ...proj,
              goals: proj.goals.map((x) => {
                if (x._id === goalId) {
                  return {
                    ...x,
                    archived: false,
                    dateArchived: null,
                  };
                }
                return x;
              }),
            };
          }
          return proj;
        }),
      };

      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    archiveGoal: (state, action) => {
      console.log("payload: ", action.payload);
      const projectId = action.payload.projectId;
      const goalId = action.payload._id;
      const now = new Date();
      const newState = {
        projects: state.projects.map((proj) => {
          if (proj._id === projectId) {
            return {
              ...proj,
              goals: proj.goals.map((x) => {
                if (x._id === goalId) {
                  return {
                    ...x,
                    archived: true,
                    dateArchived: now,
                  };
                }
                return x;
              }),
            };
          }
          return proj;
        }),
      };

      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    unarchiveTask: (state, action) => {
      console.log("payload: ", action.payload);
      const projectId = action.payload.projectId;
      const taskId = action.payload._id;
      const now = new Date();
      const newState = {
        projects: state.projects.map((proj) => {
          if (proj._id === projectId) {
            return {
              ...proj,
              tasks: proj.tasks.map((x) => {
                if (x._id === taskId) {
                  return {
                    ...x,
                    archived: false,
                    dateArchived: null,
                  };
                }
                return x;
              }),
            };
          }
          return proj;
        }),
      };

      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    archiveTask: (state, action) => {
      console.log("payload: ", action.payload);
      const projectId = action.payload.projectId;
      const taskId = action.payload._id;
      const now = new Date();
      const newState = {
        projects: state.projects.map((proj) => {
          if (proj._id === projectId) {
            return {
              ...proj,
              tasks: proj.tasks.map((x) => {
                if (x._id === taskId) {
                  return {
                    ...x,
                    archived: true,
                    dateArchived: now.toDateString(),
                  };
                }
                return x;
              }),
            };
          }
          return proj;
        }),
      };

      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    addTask: (state, action) => {
      console.log("add task, action payload", action.payload);
      const projectId = action.payload.projectId;
      const taskItem = { _id: action.payload._id, title: action.payload.title };
      const newState = {
        projects: state.projects.map((proj) => {
          if (proj._id === projectId) {
            return { ...proj, tasks: [...proj.tasks, taskItem] };
          }
          return proj;
        }),
      };
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    updateTask: (state, action) => {
      const projectId = action.payload.projectId;
      const updatedTask = action.payload.task;
      const newState = {
        ...state,
        projects: state.projects.map((proj) => {
          if (proj._id === projectId) {
            return {
              ...proj,
              tasks: [
                ...proj.tasks.map((t) => {
                  if (t._id === updatedTask._id) {
                    return updatedTask;
                  }
                  return t;
                }),
              ],
            };
          }
          return proj;
        }),
      };
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    saveTaskConfig: (state, action) => {
      const projectId = action.payload.projectId;
      const task = action.payload.updatedTask;
      const taskId = task._id;
      console.log("task: ", task);
      const newState = {
        ...state,
        projects: state.projects.map((proj) => {
          if (proj._id === projectId) {
            return {
              ...proj,
              tasks: proj.tasks
                .map((t) => {
                  if (t._id === taskId) {
                    return task;
                  }
                  return t;
                })
                .sort((a, b) => sortByTitle(a, b)),
            };
          }
          return proj;
        }),
      };

      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    updateTasksWithIds: (state, action) => {
      const projectId = action.payload.projectId;
      const taskList = action.payload.tasks;

      // SORT TASK LIST BY TITLE

      const t = [...taskList];
      t.sort((a, b) => sortByTitle(a, b));

      const newState = {
        ...state,
        projects: [
          ...state.projects.map((proj) => {
            if (proj._id === projectId) {
              return { ...proj, tasks: t };
            }
            return proj;
          }),
        ],
      };
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    deleteTask: (state, action) => {
      console.log("payload: ", action.payload);
      const projectId = action.payload.projectId;
      const taskId = action.payload._id;

      const newState = {
        projects: state.projects.map((proj) => {
          if (proj._id === projectId) {
            return {
              ...proj,
              tasks: proj.tasks.filter((x) => x._id != taskId),
            };
          }
          return proj;
        }),
      };
      localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    },
    addChapter: (state, action) => {
      const item = action.payload;
      const existItem = state.chapters.find((x) => {
        return x._id === item._id;
      });
      if (!existItem) {
        state.chapters = [...state.chapters, item];
      }
      localStorage.setItem("chapters", JSON.stringify(state));
      return state;
    },
    addContentItem: (state, action) => {
      const chapterId = action.payload.chapterId;
      const contentText = action.payload.content.text;
      const contentType = action.payload.content.type;
      const contentId = action.payload.content._id;
      const chapter = action.payload.chapter;
      const contentId2 = contentId ? contentId : Math.random();
      const newContentItem = {
        text: contentText,
        type: contentType,
        _id: contentId2,
      };

      if (chapterId) {
        const newState = {
          ...state,
          chapters: state.chapters.map((chapt) => {
            if (chapt._id === chapterId) {
              const newContent = [...chapt.content, newContentItem];
              return { ...chapt, content: newContent };
            } else {
              return chapt;
            }
          }),
        };
        console.log(current(state));
        localStorage.setItem("chapters", JSON.stringify(newState));
        return newState;
      }
    },
    deleteContentItem: (state, action) => {
      const contentItemId = action.payload.contentItemId;
      const chapterId = action.payload.chapterId;
      console.log("deleting: ", contentItemId, " from chapter ", chapterId);
      const newState = {
        ...state,
        chapters: state.chapters.map((chapt) => {
          if (chapt._id === chapterId) {
            return {
              ...chapt,
              content: chapt.content.filter(
                (cont) => cont._id != contentItemId
              ),
            };
          } else {
            return chapt;
          }
        }),
      };
      console.log("newstate", newState);
      localStorage.setItem("chapters", JSON.stringify(newState));
      return newState;
    },
    saveContent: (state, action) => {
      const prevState = current(state);
      const contentText = action.payload.content;
      const chapterId = action.payload.chapterId;
      const contentId = action.payload.contentId;
      const contentType = action.payload.contentType;
      console.log("CONTENT: ", contentText, " ID: ", contentId);
      if (contentId) {
        const newState = {
          ...state,
          chapters: state.chapters.map((chapt) => {
            if (chapt._id === chapterId) {
              const newChapter = {
                ...chapt,
                content: chapt.content.map((cont) => {
                  console.log("id: ", cont._id, " content id: ", contentId);
                  if (cont._id === contentId) {
                    return { ...cont, text: contentText };
                  }
                  if (cont._id === undefined) {
                    return { ...cont, text: contentText, _id: contentId };
                  } else {
                    return cont;
                  }
                }),
              };
              return newChapter;
            } else {
              return chapt;
            }
          }),
        };

        console.log("NEW STATE:", newState);
        localStorage.setItem("chapters", JSON.stringify(newState));
        return newState;
      }
    },
    destroyChapterContentItems: (state, action) => {
      localStorage.setItem("chapterContentItems", []);
      state.chapterContentItems = [];
      return state;
    },
    removeFromChapterContentItems: (state, action) => {
      state.chapterContentItems = state.chapterContentItems.filter(
        (x) => x._id !== action.payload
      );
      localStorage.setItem("chapterContentItems", JSON.stringify(state));
      return state;
    },
    addToChapterContentIems: (state, action) => {
      const item = action.payload;
      const existItem = state.chapterContentItems.find((x) => {
        return x._id === item._id;
      });
      if (existItem) {
        state.chapterContentItems = state.chapterContentItems.map((x) => {
          return x._id === existItem._id ? item : x;
        });
      } else {
        state.chapterContentItems = [...state.chapterContentItems, item];
      }
      localStorage.setItem("chapterContentItems", JSON.stringify(state));
      return state;
    },
  },
});

export const {
  addToChapterContentIems,
  removeFromChapterContentItems,
  initialiseChapter,
  addChapter,
  addContentItem,
  destroyChapterContentItems,
  saveContent,
  deleteContentItem,
  addProjects,
  addProject,
  deleteProject,
  addTask,
  saveTaskConfig,
  deleteTask,
  archiveTask,
  unarchiveTask,
  addGoal,
  archiveGoal,
  unarchiveGoal,
  deleteGoal,
  updateProject,
  setStateCurrentProjectId,
  setCurrentTaskId,
  setCurrentGoalId,
  saveGoalConfig,
  updateGoalsWithIds,
  updateTasksWithIds,
  updateTask,
} = projectSlice.actions;
export default projectSlice.reducer;
