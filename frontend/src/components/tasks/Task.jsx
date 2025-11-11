import { useState } from "react";
import { useSelector } from "react-redux";

import TimerRunningIcon from "@mui/icons-material/AccessTimeFilled";
import TimerNotRunningIcon from "@mui/icons-material/AccessTime";

export default function Task({
  project,
  data,
  handleSelectTaskForTimetracking,
  timerIsRunning,
}) {
  function onStartTimeTracking(project, task) {
    if (!timerIsRunning) {
      handleSelectTaskForTimetracking(project, task);
    }
  }
  return (
    <div className="row">
      <div
        className="col s11"
        onClick={() => onStartTimeTracking(project, data)}
      >
        {data.title}
      </div>
    </div>
  );
}
