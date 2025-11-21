import { useContext } from "react";
import { ProjectsContext } from "../../../context/projects-context";

import Drawer from "@mui/material/Drawer";
import ScheduleDrawerToolbar from "../toolbars/ScheduleDrawerToolbar";
import ScheduleAccordions from "../../features/activities/ScheduleAccordions";

export default function ScheduleDrawer({ open, schedule }) {
  const {
    handleCloseScheduleDrawer,
    handleActivityState,
    handleUpdateDayNote,
    handleUpdateDayDate,
    handleUpdateTimeSlotNote,
    handleLogActivity,
  } = useContext(ProjectsContext);
  let data = schedule;
  console.log("drawer data: ", data);
  return (
    <>
      {data && (
        <div>
          <Drawer anchor="top" open={open} transitionDuration={800}>
            <div className="container">
              <ScheduleDrawerToolbar
                handleCloseDrawer={handleCloseScheduleDrawer}
              />
              <div className="projects-drawer schedule-drawer">
                <ScheduleAccordions
                  monday={data.monday}
                  tuesday={data.tuesday}
                  wednesday={data.wednesday}
                  thursday={data.thursday}
                  friday={data.friday}
                  saturday={data.saturday}
                  sunday={data.sunday}
                  handleActivityState={handleActivityState}
                  handleUpdateDayNote={handleUpdateDayNote}
                  handleUpdateDayDate={handleUpdateDayDate}
                  handleUpdateTimeSlotNote={handleUpdateTimeSlotNote}
                  handleLogActivity={handleLogActivity}
                />
              </div>
            </div>
          </Drawer>
        </div>
      )}
    </>
  );
}
