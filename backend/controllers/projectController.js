import mongoose from "mongoose";

import asyncHandler from "../middleware/asyncHandler.js";

import Project from "../models/projectModel.js";

// @desc  Fetch all projects
// @route GET /api/projects
// @access User / Admin
const getProjects = asyncHandler(async (req, res) => {
  console.log("getting projects");
  const userId = req.user._id;
  const items = await Project.find({ user: userId }).sort({ title: 1 }).exec();
  //const items = await Project.find({}).sort({ title: 1 }).exec();
  res.json(items);
});

const updateProject = asyncHandler(async (req, res) => {
  console.log("updating project");
  const projectId = req.params.id;
  const { title, description, coverImage } = req.body;

  const item = await Project.findById(projectId);
  if (item) {
    try {
      item.title = title;
      item.description = description;
      item.coverImage = coverImage;
      const updatedItem = await item.save();

      res.json(updatedItem);
      console.log("UPDATED ITEM", updatedItem);
    } catch (err) {
      console.log("error: ", err);
      res.status(500);
    }
  }
  console.log("finished updating item");
});

const updateProjectTaskList = await asyncHandler(async (req, res) => {
  //res.json("udpate chapter content");
  console.log("updating project task list");
  const projectId = req.params.id;
  const userId = req.user._id;
  console.log("project ID: ", projectId, " content: ", req.body);
  try {
    const item = await Project.findOne({ _id: projectId, user: userId });
    if (item) {
      const content = req.body.tasks;
      let cleanContent = [];
      for (let i = 0; i < content.length; i++) {
        console.log("content: ", content[i]);
        if (content[i]._id > 1) {
          console.log("PUSHING: ", content[i]);
          cleanContent.push(content[i]);
        } else {
          console.log("ADDING: ", content[i]);
          cleanContent.push({
            title: content[i].title,
            duration: content[i].duration,
            notes: content[i].notes,
            actualDuration: content[i].actualDuration,
          });
        }
      }

      item.tasks = cleanContent;
      const updatedItem = await item.save();
      console.log("SAVED tasks: ", updatedItem);
      res.json(updatedItem);
    }
  } catch (error) {
    console.log("ERROR: ", error);
  }
});

const updateProjectGoalList = await asyncHandler(async (req, res) => {
  //res.json("udpate chapter content")
  console.log("updating project goal list");
  const projectId = req.params.id;
  const userId = req.user._id;
  console.log("project ID: ", projectId, " content: ", req.body);
  try {
    const item = await Project.findOne({ _id: projectId, user: userId });
    if (item) {
      const content = req.body.goals;
      let cleanContent = [];
      for (let i = 0; i < content.length; i++) {
        console.log("content: ", content[i]);
        if (content[i]._id < 1) {
          console.log("ADDING: ", content[i]);
          cleanContent.push({
            title: content[i].title,
            duration: content[i].duration,
            frequency: content[i].frequency,
            timeSlots: content[i].timeSlots,
            timePeriod: content[i].timePeriod,
            days: content[i].days,
          });
        } else {
          console.log("PUSHING: ", content[i]);
          //console.log("DAY MONDAY: ", content[i].days.monday.timeSlots);
          cleanContent.push(content[i]);
        }
      }
      console.log("clean content", cleanContent);
      item.goals = cleanContent;
      const updatedItem = await item.save();
      console.log("SAVED goals: ", updatedItem);
      res.json(updatedItem);
    }
  } catch (error) {
    console.log(error);
  }
});

const addProject = asyncHandler(async (req, res) => {
  console.log("adding project");

  try {
    const { title, description, coverImage } = req.body;
    const item = new Project({
      user: req.user._id,
      title: title,
      description: description,
      coverImage: coverImage,
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

const getProject = asyncHandler(async (req, res) => {
  console.log("getting project");

  const itemId = req.params.id;
  console.log("cid: " + itemId);
  if (itemId !== "-1") {
    try {
      const item = await Project.findById(itemId);
      if (item) {
        res.json(item);
        return;
      } else {
        res.status(404);
        throw new Error("resource not found");
      }
    } catch (error) {
      res.status(404);
      throw new Error(error);
    }
  } else {
    res.status(200);
    res.json();
  }
});

const deleteProject = await asyncHandler(async (req, res) => {
  console.log("deleting item");

  const item = await Project.findById(req.params.id);

  if (item) {
    await Project.deleteOne({ _id: item._id });
    res.json({ message: "Item removed" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }

  console.log("deleted item");
});

export {
  getProjects,
  addProject,
  getProject,
  updateProject,
  deleteProject,
  updateProjectTaskList,
  updateProjectGoalList,
};
