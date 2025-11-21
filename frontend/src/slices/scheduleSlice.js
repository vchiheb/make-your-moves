import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("schedule")
  ? JSON.parse(localStorage.getItem("schedule"))
  : { schedule: null };

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addSchedule: (state, action) => {
      console.log("ADDING SCHEDULE: ", action.payload);
      const newState = action.payload;
      //state = newState;
      localStorage.setItem("schedule", JSON.stringify(newState));
      return newState;
    },
    resetDay: (state, action) => {
      const dayTitle = action.payload.dayTitle.toLowerCase();
      const day = state[dayTitle];

      const newSchedule = {
        ...state,
        [dayTitle]: {
          ...day,
          note: "",
          date: "",
          onWaking: {
            ...day.onWaking,
            note: "",
            activities: day.onWaking.activities.map((item) => {
              return {
                ...item,
                complete: false,
                timestamp: "",
              };
            }),
          },
          morning: {
            ...day.morning,
            note: "",
            activities: day.morning.activities.map((item) => {
              return {
                ...item,
                complete: false,
                timestamp: "",
              };
            }),
          },
          midday: {
            ...day.midday,
            note: "",
            activities: day.midday.activities.map((item) => {
              return {
                ...item,
                complete: false,
                timestamp: "",
              };
            }),
          },
          afternoon: {
            ...day.afternoon,
            note: "",
            activities: day.afternoon.activities.map((item) => {
              return {
                ...item,
                complete: false,
                timestamp: "",
              };
            }),
          },
          evening: {
            ...day.evening,
            note: "",
            activities: day.evening.activities.map((item) => {
              return {
                ...item,
                complete: false,
                timestamp: "",
              };
            }),
          },
          bedtime: {
            ...day.bedtime,
            note: "",
            activities: day.bedtime.activities.map((item) => {
              return {
                ...item,
                complete: false,
                timestamp: "",
              };
            }),
          },
        },
      };

      localStorage.setItem("schedule", JSON.stringify(newSchedule));
      return newSchedule;
    },
    completeActivity: (state, action) => {
      const activity = action.payload.activity;
      const activityId = activity._id;
      const isDone = action.payload.isDone;
      const dayTitle = action.payload.dayTitle.toLowerCase();
      //const timestamp = new Date(action.payload.timestamp);
      let timeSlotTitle = action.payload.timeSlotTitle.toLowerCase();
      if (timeSlotTitle === "on waking") {
        timeSlotTitle = "onWaking";
      }
      let day = state[dayTitle];
      const timeSlot = day[timeSlotTitle];
      const newSchedule = {
        ...state,
        [dayTitle]: {
          ...day,
          [timeSlotTitle]: {
            ...timeSlot,
            activities: [
              ...timeSlot.activities.map((item) => {
                if (item._id === activityId) {
                  console.log("equal");
                  return { ...item, complete: isDone };
                }
                return item;
              }),
            ],
          },
        },
      };
      localStorage.setItem("schedule", JSON.stringify(newSchedule));
      return newSchedule;
    },
    addDayNote: (state, action) => {
      const note = action.payload.note;
      const dayTitle = action.payload.dayTitle.toLowerCase();
      const day = state[dayTitle];

      const newSchedule = {
        ...state,
        [dayTitle]: {
          ...day,
          note,
        },
      };

      const newState = { ...state, schedule: newSchedule };

      localStorage.setItem("schedule", JSON.stringify(newSchedule));
      return newSchedule;
    },
    addDayDate: (state, action) => {
      const date = action.payload.date;
      const dayTitle = action.payload.dayTitle.toLowerCase();
      const day = state[dayTitle];

      const newSchedule = {
        ...state,
        [dayTitle]: {
          ...day,
          date,
        },
      };

      const newState = { ...state, schedule: newSchedule };

      localStorage.setItem("schedule", JSON.stringify(newSchedule));
      return newSchedule;
    },
    addTimeSlotNote: (state, action) => {
      const timeSlotNote = action.payload.note;
      const dayTitle = action.payload.dayTitle.toLowerCase();
      let timeSlotTitle = action.payload.timeSlotTitle.toLowerCase();
      if (timeSlotTitle === "on waking") {
        timeSlotTitle = "onWaking";
      }
      const day = state[dayTitle];
      const timeSlot = day[timeSlotTitle];
      const newSchedule = {
        ...state,
        [dayTitle]: {
          ...day,
          [timeSlotTitle]: {
            ...timeSlot,
            note: timeSlotNote,
          },
        },
      };

      localStorage.setItem("schedule", JSON.stringify(newSchedule));
      return newSchedule;
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
