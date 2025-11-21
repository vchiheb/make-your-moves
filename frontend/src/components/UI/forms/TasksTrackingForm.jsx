import { useState, useContext } from "react";
import { ProjectsContext } from "../../../context/projects-context";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { InputLabel } from "@mui/material";

import SubmitButton from "../elements/SubmitButton";

export default function TasksTrackingForm({
  task,
  timerIsRunning,
  startTime,
  timeSpent,
}) {
  const { startTimeTrackingTimer, stopTimeTrackingTimer, handleLogTime } =
    useContext(ProjectsContext);

  const [timeSpentDescription, setTimeSpentDescription] = useState("");
  const [timeSpentInMinutes, setTimeSpentInMinutes] = useState("");
  const [timeSpentInMinutesError, setTimeSpentInMinutesError] = useState(false);

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Add 1 as month is 0-indexed
  const day = today.getDate().toString().padStart(2, "0");

  const todayFormatted = `${year}-${month}-${day}`;
  const [timeSpentDate, setTimeSpentDate] = useState(todayFormatted);
  const [timeSpentDateError, setTimeSpentDateError] = useState(false);

  const formatterAU = new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  function onSubmit() {
    let valid = true;

    if (timeSpentInMinutes.trim() === "" || Number(timeSpentInMinutes) <= 0) {
      valid = false;
      setTimeSpentInMinutesError(true);
    } else {
      setTimeSpentInMinutesError(false);
    }

    if (timeSpentDate.trim() === "") {
      valid = false;
      setTimeSpentDateError(true);
    } else {
      setTimeSpentDateError(false);
    }

    if (valid) {
      handleLogTime(timeSpentDescription, timeSpentInMinutes, timeSpentDate);
      setTimeSpentDescription("");
      setTimeSpentInMinutes("");
      setTimeSpentDate(todayFormatted);
    }
  }

  return (
    <>
      {!task._id && <p>Select a task to start tracking time against it.</p>}
      {task._id && (
        <div style={{ width: "100%" }}>
          <Box
            component="div"
            sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
            noValidate
            autoComplete="off"
            fullwidth="true"
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>{task.title}</div>
              <div style={{ flex: "2" }}>
                <TextField
                  label="Task Detail"
                  variant="outlined"
                  fullwidth="true"
                  value={timeSpentDescription}
                  onChange={(e) => setTimeSpentDescription(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </div>
              <div style={{ flex: "2" }}>
                <TextField
                  label="Time Spent in Minutes"
                  variant="outlined"
                  type="number"
                  fullwidth="true"
                  disabled={timerIsRunning}
                  value={timeSpentInMinutes}
                  onChange={(e) => {
                    setTimeSpentInMinutes(e.target.value);
                  }}
                  sx={{ width: "100%" }}
                  error={timeSpentInMinutesError}
                  helperText={
                    timeSpentInMinutesError ? "Time spent is required" : ""
                  }
                />
              </div>
              <div style={{ flex: "2" }}>
                <InputLabel>Date</InputLabel>
                <TextField
                  variant="outlined"
                  type="date"
                  fullwidth="true"
                  disabled={timerIsRunning}
                  value={timeSpentDate}
                  onChange={(e) => {
                    setTimeSpentDate(e.target.value);
                  }}
                  sx={{ width: "100%" }}
                  error={timeSpentDateError}
                  helperText={timeSpentDateError ? "Date is required" : ""}
                />
              </div>
              {timerIsRunning && (
                <div>Timer started at {formatterAU.format(startTime)}</div>
              )}

              {Number(timeSpent) > 0 && (
                <span>Time elapsed: {timeSpent} minutes</span>
              )}
              {!timerIsRunning && !timeSpent && (
                <div>Start the timer to track time.</div>
              )}
              {!timerIsRunning && (
                <SubmitButton
                  onClick={() => {
                    //setTimeSpentInMinutes(timeSpent);
                    startTimeTrackingTimer();
                  }}
                  disabled={timerIsRunning}
                >
                  Start Timer
                </SubmitButton>
              )}
              <>
                {timerIsRunning && (
                  <SubmitButton
                    onClick={() => {
                      stopTimeTrackingTimer();
                    }}
                  >
                    Stop Timer
                  </SubmitButton>
                )}
              </>
              <div>
                <SubmitButton
                  onClick={() => onSubmit()}
                  disabled={timerIsRunning}
                >
                  Log Time
                </SubmitButton>
              </div>
            </div>
          </Box>
        </div>
      )}
    </>
  );
}
