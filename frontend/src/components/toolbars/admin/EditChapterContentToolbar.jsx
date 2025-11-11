import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

import ToolbarButton from "../../UI/ToolbarButton";

import LinkAsButton from "../../UI/LinkAsButton";

export default function EditChapterContentToolbar({
  handleAddParagraph,
  handleAddHeading,
  handleAddOrderedList,
  handleStartEdit,
  handleSaveAll,
}) {
  const [type, setType] = useState("");
  function handleAddContent(contentType) {
    console.log("ctype: ", contentType);
    if (contentType === "paragraph") {
      handleAddParagraph();
    }
    if (contentType === "heading") {
      handleAddHeading();
    }
    if (contentType === "ordered-list") {
      handleAddOrderedList();
    }
  }

  return (
    <>
      <div className="container">
        <div onClick={handleStartEdit}>Edit Content</div>
        <LinkAsButton title="Home" to="/admin">
          <HomeIcon />
        </LinkAsButton>
        <ToolbarButton title="Edit" onClick={handleStartEdit}>
          <EditIcon />
        </ToolbarButton>
        <button onClick={() => handleAddContent("paragraph")}>
          add paragraph
        </button>
        <button onClick={() => handleAddContent("heading")}>add heading</button>
        <button onClick={() => handleAddContent("ordered-list")}>
          add list
        </button>
        <ToolbarButton title="Save" onClick={handleSaveAll}>
          <SaveIcon />
        </ToolbarButton>
      </div>
    </>
  );
}
