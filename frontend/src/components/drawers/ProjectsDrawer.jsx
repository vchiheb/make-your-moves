import Drawer from "@mui/material/Drawer";
import ProjectsDrawerToolbar from "../toolbars/ProjectsDrawerToolbar";
import ProjectEditForm from "../forms/ProjectEditForm";
import ProjectAddForm from "../forms/ProjectAddForm";
import { useGetProjectQuery } from "../../slices/projectApiSlice";

export default function ProjectsDraw({
  open,
  handleCloseDrawer,
  projectId,
  data,
  saveProjectDetails,
}) {
  return (
    <>
      <div>
        <Drawer anchor="top" open={open} transitionDuration={800}>
          <div className="projects-drawer">
            <div className="container">
              <ProjectsDrawerToolbar handleCloseDrawer={handleCloseDrawer} />
              {data && projectId !== -1 && (
                <ProjectEditForm
                  projectId={projectId}
                  data={data}
                  saveProjectDetails={saveProjectDetails}
                />
              )}
              {projectId === -1 && <ProjectAddForm />}
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}
