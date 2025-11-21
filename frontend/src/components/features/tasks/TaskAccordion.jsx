import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Task from "./Task";

export default function TaskAccordion({
  project,
  data,
  handleSelectTaskForTimetracking,
  timerIsRunning,
}) {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{data.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {data &&
            data.tasks &&
            data.tasks.map((item, index) => (
              <Task
                key={index}
                project={project}
                data={item}
                handleSelectTaskForTimetracking={
                  handleSelectTaskForTimetracking
                }
                timerIsRunning={timerIsRunning}
              />
            ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
