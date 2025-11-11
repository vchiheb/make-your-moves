import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Activity from "./Activity";
import { useState } from "react";

export default function TimeSlotAccordion({
  day,
  timeSlot,
  handleActivityState,
  handleUpdateTimeSlotNote,
}) {
  const [timeSlotNote, setTimeSlotNote] = useState(timeSlot.note);

  function handleTimeSlotNoteUpdate(e) {
    handleUpdateTimeSlotNote(e.target.value, timeSlot.title, day.title);
    setTimeSlotNote(e.target.value);
  }
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{timeSlot.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {timeSlot &&
            timeSlot.activities &&
            timeSlot.activities.map((item, index) => (
              <Activity
                key={index}
                data={item}
                handleActivityState={handleActivityState}
                day={day}
                timeSlotTitle={timeSlot.title}
              />
            ))}

          <div style={{ width: "100%" }}>
            <Box
              component="div"
              sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
              noValidate
              autoComplete="off"
              fullwidth="true"
            >
              <div style={{ flex: "2" }}>
                <InputLabel>Notes</InputLabel>
                <TextareaAutosize
                  variant="outlined"
                  fullWidth
                  type="text"
                  margin="normal"
                  value={timeSlotNote}
                  onChange={handleTimeSlotNoteUpdate}
                />
              </div>
            </Box>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
