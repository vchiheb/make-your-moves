import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";

export default function ToolbarButton({
  children,
  id,
  onClick,
  disabled,
  title,
}) {
  return (
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
        aria-label="bookmark"
        className="my-button"
        size="small"
        _style={{ position: "absolute" }}
        color="primary"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Fab>
    </Tooltip>
  );
}
