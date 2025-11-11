import { Link as RouterLink } from "react-router-dom"; // Alias Link

import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";

export default function LinkAsButton({ children, id, title, to }) {
  return (
    <>
      {" "}
      <Tooltip
        title={title}
        placement="top"
        slotProps={{
          tooltip: {
            sx: {
              fontSize: "1.25em", // Adjust as needed, e.g., '1.2em' or '16px'
            },
          },
        }}
      >
        <Fab
          aria-label={title}
          className="my-button"
          size="small"
          _style={{ position: "absolute" }}
          color="primary"
          component={RouterLink}
          to={to}
          id={id}
        >
          {children}
        </Fab>
      </Tooltip>
    </>
  );
}
