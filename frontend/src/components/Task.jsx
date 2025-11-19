import { useState } from "react";

import ToolbarButton from "./UI/ToolbarButton";

import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Task({
  handleOpenTaskDrawer,
  handleDeleteTask,
  handleArchiveTask,
  handleToggleTaskPriority,
  data,
  projectId,
}) {
  const [displayMenu, setDisplayMenu] = useState(false);
  return (
    <>
      {!data.archived && (
        <div className="row">
          <div className="col s10 m11" title={data.title}>
            <div
              className={`task ${data.priority}`}
              onClick={() => handleToggleTaskPriority(data, projectId)}
              style={{ cursor: "pointer" }}
            >
              {data.title}
            </div>
          </div>
          <div className="col s1 m1">
            <div
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "16px",
                display: "flex",
                flexDirection: "row",
                width: "50px",
                padding: "10px",
              }}
              title="Options"
              onMouseEnter={() => setDisplayMenu(true)}
              onMouseLeave={() => setDisplayMenu(false)}
            >
              {displayMenu && (
                <div>
                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "row",
                      position: "relative",
                      right: "80px",
                      top: "-10px",
                      backgroundColor: "white",
                      borderRadius: "3px",
                      paddingTop: "10px",
                      paddingBottom: "3px",
                    }}
                  >
                    <div className="">
                      <div
                        style={{ cursor: "pointer" }}
                        title="Delete Task"
                        onClick={() => {
                          setDisplayMenu(!displayMenu);
                          handleDeleteTask(data, projectId);
                        }}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                    <div className="">
                      <div
                        style={{ cursor: "pointer" }}
                        title="Archive Task"
                        onClick={() => {
                          setDisplayMenu(!displayMenu);
                          handleArchiveTask(data._id, projectId);
                        }}
                      >
                        <CheckBoxIcon />
                      </div>
                    </div>
                    <div className="">
                      <div
                        style={{ cursor: "pointer" }}
                        title="Configure"
                        onClick={() => {
                          setDisplayMenu(!displayMenu);
                          handleOpenTaskDrawer(data._id, projectId, data);
                        }}
                      >
                        <SettingsIcon />
                      </div>
                    </div>
                    <div
                      style={{ position: "relative", right: "1px" }}
                      onClick={() => setDisplayMenu(false)}
                    >
                      <MoreVertIcon />
                    </div>
                  </div>
                </div>
              )}
              {!displayMenu && <MoreVertIcon />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
