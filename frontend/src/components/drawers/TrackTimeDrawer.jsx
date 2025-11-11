import Drawer from "@mui/material/Drawer";

import ProjectsDrawerToolbar from "../toolbars/ProjectsDrawerToolbar";

export default function TrackTimeDrawer({ open, handleCloseDrawer }) {
  return (
    <>
      <div>
        <Drawer anchor="top" open={open} transitionDuration={800}>
          <div className="projects-drawer">
            <div className="container">
              Track Time
              <ProjectsDrawerToolbar handleCloseDrawer={handleCloseDrawer} />
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}
