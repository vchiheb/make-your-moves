import mongoose from "mongoose";

const activitySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    complete: {
      type: Boolean,
      required: true,
      default: false,
    },
    timeCompleted: {
      type: Date,
    },
  },
  { timestamps: true }
);

const timeSlotSchema = mongoose.Schema(
  {
    note: {
      type: String,
    },
    activities: [activitySchema],
  },
  { timestamps: true }
);

const activityLogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    day: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    onWaking: {
      type: timeSlotSchema,
      required: true,
    },
    morning: {
      type: timeSlotSchema,
      required: true,
    },
    midday: {
      type: timeSlotSchema,
      required: true,
    },
    afternoon: {
      type: timeSlotSchema,
      required: true,
    },
    evening: {
      type: timeSlotSchema,
      required: true,
    },
    bedtime: {
      type: timeSlotSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
