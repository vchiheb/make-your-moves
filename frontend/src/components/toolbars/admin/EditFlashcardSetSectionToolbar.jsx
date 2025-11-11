import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import ToolbarButton from "../../UI/ToolbarButton";

export default function EditFlashcardSetSectionToolbar({
  handleAddFlashcard,
  handleDeleteFlashcardSection,
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
        <ToolbarButton title="Add Flashcard" onClick={handleAddFlashcard}>
          <AddIcon />
        </ToolbarButton>
        <ToolbarButton
          title="Delete Section"
          onClick={() =>
            handleDeleteFlashcardSection(flashcardSetId, flashcardSectionId)
          }
        >
          <DeleteIcon />
        </ToolbarButton>
      </Box>
    </div>
  );
}
