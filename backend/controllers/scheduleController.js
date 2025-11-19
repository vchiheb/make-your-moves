import mongoose from "mongoose";

import asyncHandler from "../middleware/asyncHandler.js";

import Schedule from "../models/scheduleModel.js";

// @desc  Fetch all schedule logs for user
// @route GET /api/projects
// @access User / Admin
const getSchedule = asyncHandler(async (req, res) => {
  console.log("AAAAAAAgetting schedule");
  const userId = req.user._id;
  const item = await Schedule.findOne({ user: userId });
  //console.log("schedule: ", item);
  res.json(item);
});

const addSchedule = asyncHandler(async (req, res) => {
  console.log("adding schedule");
  const userId = req.user._id;

  try {
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
      req.body.schedule;
    const item = new Schedule({
      user: req.user._id,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
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

const updateSchedule = asyncHandler(async (req, res) => {
  console.log("getting activity log");
  const userId = req.user._id;

  const scheduleId = req.params.id;
  const item = await Schedule.findOne({ user: userId, _id: scheduleId });

  res.json({ message: "Update schedule endpoint" });
});

export { getSchedule, addSchedule, updateSchedule };
