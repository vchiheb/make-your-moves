import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import LinkAsButton from "../../UI/LinkAsButton";
import ToolbarButton from "../..//UI/ToolbarButton";

export default function EditFlashcardToolbar({
  handleDeleteFlashcard,
  flashcardId,
  flashcardSetId,
  flashcardSectionId,
}) {
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
        <ToolbarButton
          title="Delete Flashcard"
          onClick={() =>
            handleDeleteFlashcard(
              flashcardId,
              flashcardSectionId,
              flashcardSetId
            )
          }
        >
          <DeleteIcon />
        </ToolbarButton>
      </Box>
    </div>
  );
}
