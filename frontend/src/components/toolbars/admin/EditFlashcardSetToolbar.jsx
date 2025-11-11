import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

import LinkAsButton from "../../UI/LinkAsButton";
import ToolbarButton from "../../UI/ToolbarButton";

export default function EditFlashcardSetToolbar({
  handleStartEdit,
  handleSave,
  handleAddFlashcardSetSection,
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
        <LinkAsButton title="Home" to="/admin">
          <HomeIcon />
        </LinkAsButton>
        <ToolbarButton
          title="Add New Section"
          onClick={handleAddFlashcardSetSection}
        >
          <AddIcon />
        </ToolbarButton>
        <ToolbarButton title="Edit" onClick={handleStartEdit}>
          <EditIcon />
        </ToolbarButton>
        <ToolbarButton title="Save" onClick={handleSave}>
          <SaveIcon />
        </ToolbarButton>
      </Box>
    </div>
  );
}
