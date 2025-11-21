import Box from "@mui/material/Box";

import TextareaAutosize from "@mui/material/TextareaAutosize";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import SubmitButton from "../../UI/elements/SubmitButton";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TimeSlotAccordions from "./TimeSlotAccordions";
import { useState } from "react";

export default function ScheduleAccordion({
  day,
  dayText,
  handleActivityState,
  handleUpdateDayNote,
  handleUpdateDayDate,
  handleUpdateTimeSlotNote,
  handleLogActivity,
}) {
  const [dayNote, setDayNote] = useState(day ? (day.note ? day.note : "") : "");
  const [dayDate, setDayDate] = useState(day ? (day.date ? day.date : "") : "");
  const [dayDateError, setDayDateError] = useState(false);

  function handleDayNoteUpdate(e) {
    handleUpdateDayNote(e.target.value, day.title);
    setDayNote(e.target.value);
  }

  function handleDateUpdate(e) {
    handleUpdateDayDate(e.target.value, day.title);
    setDayDate(e.target.value);
  }

  function onSubmitLog(day) {
    let valid = true;

    if (dayDate.trim() === "") {
      setDayDateError(true);
      valid = false;
    } else {
      setDayDateError(false);
    }

    if (valid) handleLogActivity(day);
  }
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{day ? day.title : ""}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TimeSlotAccordions
            day={day}
            handleActivityState={handleActivityState}
            handleUpdateTimeSlotNote={handleUpdateTimeSlotNote}
          />{" "}
          <div style={{ width: "100%" }}>
            <Box
              component="div"
              sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
              noValidate
              autoComplete="off"
            >
              <div style={{ flex: "2" }}>
                <InputLabel>Notes</InputLabel>
                <TextareaAutosize
                  variant="outlined"
                  type="text"
                  margin="normal"
                  value={dayNote}
                  onChange={handleDayNoteUpdate}
                />
              </div>
              <div style={{ flex: "2" }}>
                <InputLabel>Date Completed</InputLabel>
                <TextField
                  variant="outlined"
                  type="date"
                  sx={{ width: "100%" }}
                  value={dayDate}
                  onChange={handleDateUpdate}
                  error={dayDateError}
                  helperText={dayDateError ? "Date is required" : ""}
                />
              </div>
              <div>
                <SubmitButton onClick={() => onSubmitLog(day)}>
                  Log Day's Activity
                </SubmitButton>
              </div>
            </Box>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
