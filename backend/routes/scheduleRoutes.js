import express from "express";

import {
  getSchedule,
  addSchedule,
  updateSchedule,
} from "../controllers/scheduleController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").put(protect, addSchedule).get(protect, getSchedule);

router.route("/:id").post(protect, updateSchedule);

export default router;
