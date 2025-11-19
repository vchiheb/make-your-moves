import { useContext } from "react";
import { ProjectsContext } from "../../context/projects-context";

import Drawer from "@mui/material/Drawer";
import ProjectDrawerToolbar from "../toolbars/ProjectDrawerToolbar";
import ProjectEditForm from "../forms/ProjectEditForm";

export default function ProjectDraw({ open, projectId, data }) {
  const { handleCloseProjectDrawer, handleSaveProjectDetails } =
    useContext(ProjectsContext);
  return (
    <>
      <div>
        <Drawer anchor="top" open={open} transitionDuration={800}>
          <div className="projects-drawer">
            <div className="container">
              <ProjectDrawerToolbar
                handleCloseDrawer={handleCloseProjectDrawer}
              />
              {
                <ProjectEditForm
                  projectId={projectId}
                  data={data}
                  saveProjectDetails={handleSaveProjectDetails}
                />
              }
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}
