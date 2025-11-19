import { useDispatch } from "react-redux";
import { useState } from "react";
import { useContext } from "react";

import { ProjectsContext } from "../../context/projects-context";
import { saveTaskConfig } from "../../slices/projectSlice";

import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";

import ProjectDrawerToolbar from "../toolbars/ProjectDrawerToolbar";
import SubmitButton from "../UI/SubmitButton";

export default function TaskDrawer({ open, projectId, currentTask }) {
  const { handleCloseTaskDrawer, handleSaveTaskList } =
    useContext(ProjectsContext);

  const dispatch = useDispatch();

  const [title, setTitle] = useState(currentTask.title);
  const [duration, setDuration] = useState(currentTask.duration);
  const [actualDuration, setActualDuration] = useState(
    currentTask.actualDuration
  );
  const [notes, setNotes] = useState(currentTask.notes);

  function handleSaveTaskConfig() {
    const updatedTask = {
      _id: currentTask._id,
      title,
      duration,
      notes,
      actualDuration,
      priority: currentTask.priority,
    };

    const payload = { projectId, updatedTask };

    dispatch(saveTaskConfig(payload));
    handleSaveTaskList(projectId, updatedTask);
    handleCloseTaskDrawer();
  }
  return (
    <>
      {currentTask && (
        <div>
          <Drawer anchor="top" open={open} transitionDuration={800}>
            <ProjectDrawerToolbar handleCloseDrawer={handleCloseTaskDrawer} />
            <div className="projects-drawer">
              <div className="container">
                Configure Task
                <div style={{ width: "100%" }}>
                  <Box
                    component="div"
                    sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
                    noValidate
                    autoComplete="off"
                    fullwidth="true"
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ flex: "2" }}>
                        <TextField
                          label="Task Title"
                          variant="outlined"
                          fullwidth="true"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          sx={{ width: "100%" }}
                        />
                      </div>

                      <div style={{ flex: "1" }}>
                        <TextField
                          label="Expected Duration in Minutes"
                          variant="outlined"
                          fullwidth="true"
                          type="number"
                          sx={{ width: "100%" }}
                          inputProps={{ min: 1 }}
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        />
                      </div>

                      <div style={{ flex: "1" }}>
                        <TextField
                          label="Actual Duration in Minutes"
                          variant="outlined"
                          fullwidth="true"
                          type="number"
                          sx={{ width: "100%" }}
                          inputProps={{ min: 1 }}
                          value={actualDuration}
                          onChange={(e) => setActualDuration(e.target.value)}
                        />
                      </div>
                      <div style={{ flex: "2" }}>
                        <InputLabel>Notes</InputLabel>
                        <TextareaAutosize
                          minRows={3}
                          variant="outlined"
                          fullWidth
                          type="text"
                          margin="normal"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          style={{ borderRadius: "3px" }}
                        />
                      </div>
                      <SubmitButton onClick={handleSaveTaskConfig}>
                        Save
                      </SubmitButton>
                    </div>
                  </Box>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      )}
    </>
  );
}
