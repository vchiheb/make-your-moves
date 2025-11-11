import mongoose from "mongoose";

import asyncHandler from "../middleware/asyncHandler.js";

import TimeLog from "../models/timeLogModel.js";

// @desc  Fetch all schedule logs for user
// @route GET /api/projects
// @access User / Admin
const getTimeLogs = asyncHandler(async (req, res) => {
  console.log("getting time logs");
  const userId = req.user._id;
  const items = await TimeLog.find({ user: userId });
  //const items = await Project.find({}).sort({ title: 1 }).exec();
  res.json(items);
});

const addTimeLog = asyncHandler(async (req, res) => {
  console.log("adding time log item");
  const userId = req.user._id;

  try {
    const {
      project,
      projectTitle,
      task,
      taskTitle,
      description,
      timeSpent,
      onDate,
    } = req.body;
    const item = new TimeLog({
      user: req.user._id,
      project,
      task,
      projectTitle,
      taskTitle,
      description,
      timeSpent,
      onDate,
    });

    console.log("item saving; ", item);
    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
    console.log("item saved; ", updatedItem);
  } catch (error) {
    console.log("ERROR: ", error);
    res.status(404);
    res.json(error);
  }
});

export { getTimeLogs, addTimeLog };
