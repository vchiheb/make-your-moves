import mongoose from "mongoose";

const activitySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    goal: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const timeSlotSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    timeAvailable: {
      type: Number,
    },
    note: {
      type: String,
    },
    activities: [activitySchema],
  },
  { timestamps: true }
);

const daySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    onWaking: {
      type: timeSlotSchema,
    },
    morning: {
      type: timeSlotSchema,
    },
    midday: {
      type: timeSlotSchema,
    },
    afternoon: {
      type: timeSlotSchema,
    },
    evening: {
      type: timeSlotSchema,
    },
    bedtime: {
      type: timeSlotSchema,
    },
  },
  { timestamps: true }
);

const scheduleSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    note: {
      type: String,
    },
    monday: {
      type: daySchema,
    },
    tuesday: {
      type: daySchema,
    },
    wednesday: {
      type: daySchema,
    },
    thursday: {
      type: daySchema,
    },
    friday: {
      type: daySchema,
    },
    saturday: {
      type: daySchema,
    },
    sunday: {
      type: daySchema,
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
