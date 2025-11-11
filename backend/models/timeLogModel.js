import mongoose from "mongoose";

const timeLogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    projectTitle: {
      type: String,
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    taskTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    timeSpent: {
      type: Number,
      required: true,
    },
    onDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const TimeLog = mongoose.model("TimeLog", timeLogSchema);

export default TimeLog;
