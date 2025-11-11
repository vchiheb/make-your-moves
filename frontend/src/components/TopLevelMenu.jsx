import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";

export default function TopLevelMenu() {
  function handleClick() {
    alert("Hello world!");
  }

  return (
    <>
      <Box
        className="my-box"
        display="flex"
        flexDirection="column" // This sets the main axis to vertical
        alignItems="center" // Centers items horizontally along the cross-axis
        justifyContent="center"
        sx={{ "& > :not(style)": { m: 1 } }}
        style={{ position: "fixed" }}
      >
        <Fab size="small" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <Fab size="small" color="primary" aria-label="edit">
          <EditIcon />
        </Fab>

        <Fab size="small" color="primary" variant="extended">
          <NavigationIcon sx={{ mr: 1 }} />
          Navigate
        </Fab>
        <Fab size="small" color="primary" disabled aria-label="like">
          <FavoriteIcon />
        </Fab>
      </Box>
    </>
  );
}
