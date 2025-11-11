import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
    },
    sourceUrl: {
      type: String,
    },
    artistName: {
      type: String,
    },
  },
  { timestamps: true }
);

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
    },
    actualDuration: {
      type: Number,
    },
    timeRequired: {
      type: Number,
    },
    notes: {
      type: String,
    },
    created: {
      type: Date,
    },
    completed: {
      type: Date,
    },
  },
  { timestamps: true }
);

const timeSlotSchema = mongoose.Schema(
  {
    onWaking: {
      type: Boolean,
      default: false,
    },
    morning: {
      type: Boolean,
      default: false,
    },
    midday: {
      type: Boolean,
      default: false,
    },
    afternoon: {
      type: Boolean,
      default: false,
    },
    evening: {
      type: Boolean,
      default: false,
    },
    bedtime: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const daysSchema = mongoose.Schema(
  {
    monday: {
      timeSlots: {
        type: timeSlotSchema,
      },
    },
    tuesday: {
      timeSlots: {
        type: timeSlotSchema,
      },
    },
    wednesday: {
      timeSlots: {
        type: timeSlotSchema,
      },
    },
    thursday: {
      timeSlots: {
        type: timeSlotSchema,
      },
    },
    friday: {
      timeSlots: {
        type: timeSlotSchema,
      },
    },
    saturday: {
      timeSlots: {
        type: timeSlotSchema,
      },
    },
    sunday: {
      timeSlots: {
        type: timeSlotSchema,
      },
    },
  },
  { timestamps: true }
);

const goalSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
    },
    frequency: {
      type: Number,
    },
    timePeriod: {
      type: Number,
    },
    created: {
      type: Date,
    },
    timeSlots: {
      type: timeSlotSchema,
    },
    days: {
      type: daysSchema,
    },
  },
  { timestamps: true }
);

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: imageSchema,
    },
    images: [imageSchema],
    tasks: [taskSchema],
    goals: [goalSchema],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
