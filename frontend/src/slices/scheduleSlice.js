import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schedule: localStorage.getItem("schedule")
    ? JSON.parse(localStorage.getItem("schedule"))
    : null,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addSchedule: (state, action) => {
      const newState = { ...state };
      newState.schedule = action.payload;

      localStorage.setItem("schedule", JSON.stringify(newState));
      return newState;
    },
    resetDay: (state, action) => {
      const dayTitle = action.payload.dayTitle.toLowerCase();
      const day = state.schedule[dayTitle];

      const newState = {
        ...state,
        schedule: {
          ...state.schedule,
          [dayTitle]: {
            ...day,
            note: "",
            date: "",
            onWaking: {
              ...day.onWaking,
              note: "",

              activities: [
                ...day.onWaking.activities.map((item) => {
                  return {
                    ...item,
                    complete: false,
                    timestamp: "",
                  };
                }),
              ],
            },
          },
        },
      };

      localStorage.setItem("schedule", JSON.stringify(newState));
      return newState;
    },
    completeActivity: (state, action) => {
      const activity = action.payload.activity;
      const activityId = activity._id;
      const isDone = action.payload.isDone;
      const dayTitle = action.payload.dayTitle.toLowerCase();
      const timestamp = action.payload.timestamp;
      let timeSlotTitle = action.payload.timeSlotTitle.toLowerCase();
      if (timeSlotTitle === "on waking") {
        timeSlotTitle = "onWaking";
      }
      const day = state.schedule[dayTitle];
      const timeSlot = day[timeSlotTitle];

      const newState = {
        ...state,
        schedule: {
          ...state.schedule,
          [dayTitle]: {
            ...day,
            [timeSlotTitle]: {
              ...timeSlot,
              activities: [
                ...timeSlot.activities.map((item) => {
                  if (item._id === activityId) {
                    return { ...item, complete: isDone, timestamp: timestamp };
                  }
                  return item;
                }),
              ],
            },
          },
        },
      };

      localStorage.setItem("schedule", JSON.stringify(newState));
      return newState;
    },
    addDayNote: (state, action) => {
      const dayNote = action.payload.note;
      const dayTitle = action.payload.dayTitle.toLowerCase();
      const day = state.schedule[dayTitle];

      const newState = {
        ...state,
        schedule: {
          ...state.schedule,
          [dayTitle]: {
            ...day,
            note: dayNote,
          },
        },
      };

      localStorage.setItem("schedule", JSON.stringify(newState));
      return newState;
    },
    addDayDate: (state, action) => {
      const date = action.payload.date;
      const dayTitle = action.payload.dayTitle.toLowerCase();
      const day = state.schedule[dayTitle];

      const newState = {
        ...state,
        schedule: {
          ...state.schedule,
          [dayTitle]: {
            ...day,
            date,
          },
        },
      };

      localStorage.setItem("schedule", JSON.stringify(newState));
      return newState;
    },
    addTimeSlotNote: (state, action) => {
      const timeSlotNote = action.payload.note;
      const dayTitle = action.payload.dayTitle.toLowerCase();
      let timeSlotTitle = action.payload.timeSlotTitle.toLowerCase();
      if (timeSlotTitle === "on waking") {
        timeSlotTitle = "onWaking";
      }
      const day = state.schedule[dayTitle];
      const timeSlot = day[timeSlotTitle];
      console.log("timeSlotNote: ", timeSlotNote);
      const newState = {
        ...state,
        schedule: {
          ...state.schedule,
          [dayTitle]: {
            ...day,
            [timeSlotTitle]: {
              ...timeSlot,
              note: timeSlotNote,
            },
          },
        },
      };

      localStorage.setItem("schedule", JSON.stringify(newState));
      return newState;
    },
  },
});

export const {
  addSchedule,
  completeActivity,
  addDayNote,
  addDayDate,
  addTimeSlotNote,
  resetDay,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
