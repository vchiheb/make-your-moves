import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";

export default function TrackTimeToolbar({ handleCloseDrawer }) {
  return (
    <div className="projects-drawer-toolbar">
      <Box
        sx={{
          "& > :not(style)": {
            m: 1,
            display: "flex",
            alignItems: "center",
            width: "175px",
          },
        }}
      >
        <Fab
          variant="extended"
          size="small"
          color="primary"
          onClick={handleCloseDrawer}
        >
          <CloseIcon sx={{ mr: 1 }} />
          Close
        </Fab>
      </Box>
    </div>
  );
}
