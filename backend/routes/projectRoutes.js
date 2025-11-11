import express from "express";

import {
  getProjects,
  addProject,
  getProject,
  updateProject,
  deleteProject,
  updateProjectTaskList,
  updateProjectGoalList,
} from "../controllers/projectController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getProjects).put(protect, addProject);
router
  .route("/:id")
  .get(protect, getProject)
  .post(protect, updateProject)
  .delete(protect, deleteProject);
router.route("/:id/tasks").post(protect, updateProjectTaskList);
router.route("/:id/goals").post(protect, updateProjectGoalList);

export default router;
