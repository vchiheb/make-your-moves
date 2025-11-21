import { useContext } from "react";
import { ProjectsContext } from "../../../context/projects-context";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
export default function NewGoal({ project }) {
  const { handleAddGoal, handleSetCurrentProject } =
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
          label="New Goal"
          variant="outlined"
          fullwidth="true"
          onKeyDown={(event) => handleAddGoal(event, project._id, project)}
          onFocus={() => {
            handleSetCurrentProject(project._id);
          }}
        />
      </Box>
    </div>
  );
}
