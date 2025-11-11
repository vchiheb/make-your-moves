import express from "express";

import { getTimeLogs, addTimeLog } from "../controllers/timeLogController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTimeLogs).put(protect, addTimeLog);

export default router;
