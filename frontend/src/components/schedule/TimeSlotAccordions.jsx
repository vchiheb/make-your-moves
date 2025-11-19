import TimeSlotAccordion from "./TimeSlotAccordion";

export default function TimeSlotAccordions({
  day,
  handleActivityState,
  handleUpdateTimeSlotNote,
}) {
  return (
    <>
      {day && (
        <>
          <TimeSlotAccordion
            day={day}
            timeSlotTitle="On Waking"
            timeSlot={day.onWaking}
            timeText="7.30am - 8am"
            timeAvailable="30"
            handleActivityState={handleActivityState}
            handleUpdateTimeSlotNote={handleUpdateTimeSlotNote}
          />
          <TimeSlotAccordion
            day={day}
            timeSlotTitle="Morning"
            timeSlot={day.morning}
            timeText="8am - 12pm"
            timeAvailable="240"
            handleActivityState={handleActivityState}
            handleUpdateTimeSlotNote={handleUpdateTimeSlotNote}
          />
          <TimeSlotAccordion
            day={day}
            timeSlotTitle="Midday"
            timeSlot={day.midday}
            timeText="12pm - 1pm"
            timeAvailable="60"
            handleActivityState={handleActivityState}
            handleUpdateTimeSlotNote={handleUpdateTimeSlotNote}
          />
          <TimeSlotAccordion
            day={day}
            timeSlotTitle="Afternoon"
            timeSlot={day.afternoon}
            timeText="1pm - 5pm"
            timeAvailable="240"
            handleActivityState={handleActivityState}
            handleUpdateTimeSlotNote={handleUpdateTimeSlotNote}
          />
          <TimeSlotAccordion
            day={day}
            timeSlotTitle="Evening"
            timeSlot={day.evening}
            timeText="5pm - 9pm"
            timeAvailable="240"
            handleActivityState={handleActivityState}
            handleUpdateTimeSlotNote={handleUpdateTimeSlotNote}
          />
          <TimeSlotAccordion
            day={day}
            timeSlot={day.bedtime}
            handleActivityState={handleActivityState}
            handleUpdateTimeSlotNote={handleUpdateTimeSlotNote}
          />
        </>
      )}
    </>
  );
}
