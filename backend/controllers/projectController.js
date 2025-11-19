import mongoose from "mongoose";

import asyncHandler from "../middleware/asyncHandler.js";

import Project from "../models/projectModel.js";
import sortByTitle from "../utils/sort.js";

// @desc  Fetch all projects
// @route GET /api/projects
// @access User / Admin
const getProjects = asyncHandler(async (req, res) => {
  console.log("getting projects");
  const userId = req.user._id;
  //const items = await Project.find({ user: userId }).sort({ title: 1 }).exec();

  /*const items = await Project.aggregate([
    {
      $match: {
        // Your find-like query conditions here
        user: { $eq: userId },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        coverImage: 1,
        images: 1,
        tasks: {
          $sortArray: {
            input: {
              $filter: {
                input: "$tasks",
                as: "item",
                cond: { $ne: ["$$item.archived", true] },
              },
            },
            sortBy: { title: 1 },
          },
        },
        goals: {
          $sortArray: {
            input: {
              $filter: {
                input: "$goals",
                as: "item",
                cond: { $ne: ["$$item.archived", true] },
              },
            },
            sortBy: { title: 1 },
          },
        },
        sortBy: { title: 1 },
      },
    },
  ]).sort({ title: 1 });
  */
  const items = await Project.find({}).sort({ title: 1 }).exec();

  // case insensivie SORT TASK AND GOAL LISTS
  const sortedItems = [
    items.map((proj) => {
      return {
        ...proj,
        goals: proj.goals.sort((a, b) => sortByTitle),
        tasks: proj.tasks.sort((a, b) => sortByTitle),
      };
    }),
  ];

  const sortedArray = [];
  for (let i = 0; i < items.length; i++) {
    let project = items[i];
    project.tasks.sort((a, b) => sortByTitle(a, b));
    project.goals.sort((a, b) => sortByTitle(a, b));
    sortedArray.push(project);
  }

  // case insensitive sort projecs
  sortedArray.sort((a, b) => sortByTitle(a, b));

  res.json(sortedArray);
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
            archived: content[i].archived,
            dateArchived: content[i].dateArchived,
            priority: content[i].priority,
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
            archived: content[i].archived,
            dateArchived: content[i].dateArchived,
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
  if (itemId !== "0") {
    try {
      const item = await Project.findById(itemId);
      if (item) {
        console.log("GETTING PROJECT: ", item);
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
