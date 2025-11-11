import express from "express";

import {
  getActivityLogs,
  addActivityLog,
} from "../controllers/activityLogController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getActivityLogs).put(protect, addActivityLog);

export default router;
