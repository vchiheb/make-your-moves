import path from "path";

import express from "express";
//import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import projectRoutes from "./routes/projectRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import timeRoutes from "./routes/timeLogRoutes.js";

import uploadRoutes from "./routes/uploadRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import connectDB from "./config/db.js";

const app = express();
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// cookie parser middlewware

app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend's origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

//app.use(cors(corsOptions));
// Custom logging middleware
app.use("/", (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log("body: ", req.body);
  console.log("params: ", req.params);
  console.log("user: ", req.user);
  console.log("Cookies:", req.cookies);
  //console.log("id: ", req.body);
  next(); // Pass control to the next middleware or route handler
});
const PORT = process.env.PORT || 4000;
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/time", timeRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/upload", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
