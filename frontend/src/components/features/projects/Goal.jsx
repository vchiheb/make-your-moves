import { useState, useContext } from "react";
import { ProjectsContext } from "../../../context/projects-context";

import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Goal({ data, projectId }) {
  const { handleArchiveGoal, handleDeleteGoal, handleOpenGoalDrawer } =
    useContext(ProjectsContext);

  const [displayMenu, setDisplayMenu] = useState(false);
  console.log("pid 1: ", projectId);
  return (
    <>
      {!data.archived && (
        <div className="row">
          <div className="col s10 m11" title={data.title}>
            <div className="goal">{data.title}</div>
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
                      backgroundColor: "white",
                    }}
                  >
                    <div className="">
                      <div
                        style={{ cursor: "pointer" }}
                        title="Delete Goal"
                        onClick={() => {
                          setDisplayMenu(!displayMenu);
                          handleDeleteGoal(data, projectId);
                        }}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                    <div className="">
                      <div
                        style={{ cursor: "pointer" }}
                        title="Archive Goal"
                        onClick={() => {
                          setDisplayMenu(!displayMenu);
                          handleArchiveGoal(data._id, projectId);
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
                          handleOpenGoalDrawer(data._id, projectId, data);
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
