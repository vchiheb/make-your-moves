import { useContext } from "react";
import { ProjectsContext } from "../../context/projects-context";

import Drawer from "@mui/material/Drawer";

import ScheduleDrawerToolbar from "../toolbars/ScheduleDrawerToolbar";
import ScheduleAccordions from "../schedule/ScheduleAccordions";

export default function ScheduleDrawer({ open, schedule }) {
  const {
    handleCloseScheduleDrawer,
    handleActivityState,
    handleUpdateDayNote,
    handleUpdateDayDate,
    handleUpdateTimeSlotNote,
    handleLogActivity,
  } = useContext(ProjectsContext);
  console.log("SCHEDULE: ", schedule);
  return (
    <>
      {schedule && (
        <div>
          <Drawer anchor="top" open={open} transitionDuration={800}>
            <div className="container">
              <ScheduleDrawerToolbar
                handleCloseDrawer={handleCloseScheduleDrawer}
              />
              <div className="projects-drawer schedule-drawer">
                <ScheduleAccordions
                  monday={schedule.monday}
                  tuesday={schedule.tuesday}
                  wednesday={schedule.wednesday}
                  thursday={schedule.thursday}
                  friday={schedule.friday}
                  saturday={schedule.saturday}
                  sunday={schedule.sunday}
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
