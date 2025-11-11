import mongoose from "mongoose";

import asyncHandler from "../middleware/asyncHandler.js";

import ActivityLog from "../models/activityLogModel.js";

// @desc  Fetch all schedule logs for user
// @route GET /api/projects
// @access User / Admin
const getActivityLogs = asyncHandler(async (req, res) => {
  console.log("getting activity log");
  const userId = req.user._id;
  const items = await ActivityLog.find({ user: userId });
  //const items = await Project.find({});
  res.json(items);
});

const addActivityLog = asyncHandler(async (req, res) => {
  console.log("adding activity log item");
  const userId = req.user._id;

  try {
    const {
      day,
      note,
      date,
      onWaking,
      morning,
      midday,
      afternoon,
      evening,
      bedtime,
    } = req.body;
    const item = new ActivityLog({
      user: req.user._id,
      day,
      note,
      date,
      onWaking,
      morning,
      midday,
      afternoon,
      evening,
      bedtime,
    });

    console.log("item saving; ", item);
    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
    console.log("item saved; ", updatedItem);
  } catch (error) {
    console.log("ERROR: ", error);
    res.status(500);
    res.json(error);
  }
});

export { getActivityLogs, addActivityLog };
