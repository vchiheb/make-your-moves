import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState } from "react";

export default function Activity({
  data,
  handleActivityState,
  day,
  timeSlotTitle,
}) {
  const activityComplete = data.complete;
  const [isDone, setIsDone] = useState(activityComplete);

  function handleCheckDone() {
    const now = new Date();
    handleActivityState(data, !isDone, day.title, timeSlotTitle, now);
    setIsDone(!isDone);
  }

  return (
    <>
      <div className="row">
        <div className="col s8" onClick={handleCheckDone}>
          {data.title}
        </div>
        <div className="col s3">
          {data.duration} minute{data.duration > 1 ? "s" : ""}
        </div>
        <div className="col s1">
          {isDone && <CheckBoxIcon onClick={handleCheckDone} />}
          {!isDone && <CheckBoxOutlineBlankIcon onClick={handleCheckDone} />}
        </div>
      </div>
    </>
  );
}
