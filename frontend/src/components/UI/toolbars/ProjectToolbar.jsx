import { useContext } from "react";
import { ProjectsContext } from "../../../context/projects-context";

import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Unarchive";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

export default function ProjectToolbar({ project }) {
  const {
    handleViewProjectArchive,
    handleEditProject,
    handleDeleteProject,
    handleSaveProject,
    handleArchiveProject,
  } = useContext(ProjectsContext);

  const [displayMenu, setDisplayMenu] = useState(false);
  return (
    <>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          position: "relative",
          right: "-15px",
          backgroundColor: "white",
        }}
        title="Options"
        onMouseEnter={() => setDisplayMenu(true)}
        onMouseLeave={() => setDisplayMenu(false)}
      >
        {displayMenu && (
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              backgroundColor: "white",
            }}
            className="project-toolbar-items"
          >
            <div
              onClick={() => handleDeleteProject(project)}
              title="Delete Project"
            >
              <DeleteIcon _sx={{ mr: 1 }} />
            </div>
            <div
              onClick={() => handleArchiveProject(project)}
              title="Archive Project"
            >
              <CheckBoxIcon _sx={{ mr: 1 }} />
            </div>
            <div
              onClick={() => handleViewProjectArchive(project)}
              title="View Archive"
            >
              <ArchiveIcon _sx={{ mr: 1 }} />
            </div>
            <div
              onClick={() => handleEditProject(project)}
              title="Edit Project"
            >
              <EditIcon _sx={{ mr: 1 }} />
            </div>
            <div
              onClick={() => handleSaveProject(project)}
              title="Save Project"
            >
              <SaveIcon _sx={{ mr: 1 }} />
            </div>
            <div onClick={() => setDisplayMenu(false)}>
              <MoreVertIcon />
            </div>
          </div>
        )}
        {!displayMenu && <MoreVertIcon />}
      </div>
    </>
  );
}
