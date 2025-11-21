import { useContext } from "react";
import { ProjectsContext } from "../../../context/projects-context";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function NewTask({ project }) {
  const { handleSetCurrentProject, handleAddTask } =
    useContext(ProjectsContext);

  return (
    <div>
      <Box
        component="div"
        sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
        noValidate
        autoComplete="off"
        fullwidth="true"
      >
        <TextField
          label="New Task"
          variant="outlined"
          fullwidth="true"
          onFocus={() => handleSetCurrentProject(project._id)}
          onKeyDown={(event) => handleAddTask(event, project._id, project)}
        />
      </Box>
    </div>
  );
}
