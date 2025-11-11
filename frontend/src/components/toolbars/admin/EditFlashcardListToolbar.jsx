import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import SaveIcon from "@mui/icons-material/Save";

import LinkAsButton from "../../UI/LinkAsButton";

export default function EditFlashcardListToolbar() {
  function handleAddNewSection() {}
  function fnHandleSave() {}
  return (
    <div className="container">
      <Box
        className="my-box"
        display="flex"
        style={{ position: "absolute" }}
        flexDirection="row  " // Arrange children vertically
        alignItems="center" // Vertically centers items when flexDirection is 'column'
        justifyContent="center"
      >
        <LinkAsButton title="Home" to="/admin">
          <HomeIcon />
        </LinkAsButton>
        <LinkAsButton title="Add New Flashcard Set" to="/admin/flashcards/-1">
          <AddIcon />
        </LinkAsButton>
      </Box>
    </div>
  );
}
