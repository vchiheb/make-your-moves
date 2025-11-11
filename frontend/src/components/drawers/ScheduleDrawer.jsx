import Drawer from "@mui/material/Drawer";

import ScheduleDrawerToolbar from "../toolbars/ScheduleDrawerToolbar";
import ScheduleAccordions from "../schedule/ScheduleAccordions";
import { useState } from "react";

export default function ScheduleDrawer({
  open,
  handleCloseDrawer,
  schedule,
  handleActivityState,
  handleUpdateDayNote,
  handleUpdateDayDate,
  handleUpdateTimeSlotNote,
  handleLogActivity,
}) {
  return (
    <>
      {schedule && (
        <div>
          <Drawer anchor="top" open={open} transitionDuration={800}>
            <div className="container">
              <ScheduleDrawerToolbar handleCloseDrawer={handleCloseDrawer} />
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
