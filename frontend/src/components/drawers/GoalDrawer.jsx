import { useDispatch, useSelector } from "react-redux";
import { useUpdateProjectGoalListMutation } from "../../slices/projectApiSlice";
import Drawer from "@mui/material/Drawer";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ProjectsDrawerToolbar from "../toolbars/ProjectsDrawerToolbar";
import SubmitButton from "../UI/SubmitButton";
import { useEffect, useState } from "react";
import { saveGoalConfig } from "../../slices/projectSlice";
import { current } from "@reduxjs/toolkit";

import { useGetProjectQuery } from "../../slices/projectApiSlice";

export default function GoalDrawer({
  open,
  handleCloseDrawer,
  projectId,
  goalId,
  currentGoal,
  saveGoalList,
}) {
  const dispatch = useDispatch();

  const [saveProjectGoalList, { isLoading2, error2 }] =
    useUpdateProjectGoalListMutation();

  const [title, setTitle] = useState(currentGoal.title);

  const [duration, setDuration] = useState(currentGoal.duration);
  const [frequency, setFrequency] = useState(
    currentGoal && currentGoal.frequency ? currentGoal.frequency : ""
  );
  const [monday, setMonday] = useState(
    currentGoal && currentGoal.days ? currentGoal.days.monday : false
  );
  const [mondayTimeSlots, setMondayTimeSlots] = useState(
    currentGoal &&
      currentGoal.days &&
      currentGoal.days.monday &&
      currentGoal.days.monday.timeSlots
      ? currentGoal.days.monday.timeSlots
      : {
          onWaking: false,
          morning: false,
          midday: false,
          afternoon: false,
          evening: false,
          bedtime: false,
        }
  );

  const [tuesdayTimeSlots, setTuesdayTimeSlots] = useState(
    currentGoal &&
      currentGoal.days &&
      currentGoal.days.tuesday &&
      currentGoal.days.tuesday.timeSlots
      ? currentGoal.days.tuesday.timeSlots
      : {
          onWaking: false,
          morning: false,
          midday: false,
          afternoon: false,
          evening: false,
          bedtime: false,
        }
  );

  const [wednesdayTimeSlots, setWednesdayTimeSlots] = useState(
    currentGoal &&
      currentGoal.days &&
      currentGoal.days.wednesday &&
      currentGoal.days.wednesday.timeSlots
      ? currentGoal.days.wednesday.timeSlots
      : {
          onWaking: false,
          morning: false,
          midday: false,
          afternoon: false,
          evening: false,
          bedtime: false,
        }
  );

  const [thursdayTimeSlots, setThursdayTimeSlots] = useState(
    currentGoal &&
      currentGoal.days &&
      currentGoal.days.thursday &&
      currentGoal.days.thursday.timeSlots
      ? currentGoal.days.thursday.timeSlots
      : {
          onWaking: false,
          morning: false,
          midday: false,
          afternoon: false,
          evening: false,
          bedtime: false,
        }
  );

  const [fridayTimeSlots, setFridayTimeSlots] = useState(
    currentGoal &&
      currentGoal.days &&
      currentGoal.days.friday &&
      currentGoal.days.friday.timeSlots
      ? currentGoal.days.friday.timeSlots
      : {
          onWaking: false,
          morning: false,
          midday: false,
          afternoon: false,
          evening: false,
          bedtime: false,
        }
  );

  const [saturdayTimeSlots, setSaturdayTimeSlots] = useState(
    currentGoal &&
      currentGoal.days &&
      currentGoal.days.saturday &&
      currentGoal.days.saturday.timeSlots
      ? currentGoal.days.saturday.timeSlots
      : {
          onWaking: false,
          morning: false,
          midday: false,
          afternoon: false,
          evening: false,
          bedtime: false,
        }
  );

  const [sundayTimeSlots, setSundayTimeSlots] = useState(
    currentGoal &&
      currentGoal.days &&
      currentGoal.days.sunday &&
      currentGoal.days.sunday.timeSlots
      ? currentGoal.days.sunday.timeSlots
      : {
          onWaking: false,
          morning: false,
          midday: false,
          afternoon: false,
          evening: false,
          bedtime: false,
        }
  );

  const [tuesday, setTuesday] = useState(
    currentGoal && currentGoal.days ? currentGoal.days.tuesday : false
  );
  const [wednesday, setWednesday] = useState(
    currentGoal && currentGoal.days ? currentGoal.days.wednesday : false
  );
  const [thursday, setThursday] = useState(
    currentGoal && currentGoal.days ? currentGoal.days.thursday : false
  );
  const [friday, setFriday] = useState(
    currentGoal && currentGoal.days ? currentGoal.days.friday : false
  );
  const [saturday, setSaturday] = useState(
    currentGoal && currentGoal.days ? currentGoal.days.saturday : false
  );
  const [sunday, setSunday] = useState(
    currentGoal && currentGoal.days ? currentGoal.days.sunday : false
  );

  // possible values for timePeriod:
  // 1: daily
  // 2: every weekday
  // 3: every week
  // 4: every month
  const [timePeriod, setTimePeriod] = useState(
    currentGoal.timePeriod ? currentGoal.timePeriod : ""
  );

  const [onWaking, setOnWaking] = useState(
    currentGoal.timeSlots && currentGoal.timeSlots.onWaking
      ? currentGoal.timeSlots.onWaking
      : false
  );
  const [morning, setMorning] = useState(
    currentGoal.timeSlots && currentGoal.timeSlots.morning
      ? currentGoal.timeSlots.morning
      : false
  );
  const [midday, setMidday] = useState(
    currentGoal.timeSlots && currentGoal.timeSlots.midday
      ? currentGoal.timeSlots.midday
      : false
  );
  const [afternoon, setAfternoon] = useState(
    currentGoal.timeSlots && currentGoal.timeSlots.afternoon
      ? currentGoal.timeSlots.afternoon
      : false
  );

  const [evening, setEvening] = useState(
    currentGoal.timeSlots && currentGoal.timeSlots.evening
      ? currentGoal.timeSlots.evening
      : false
  );

  const [bedtime, setBedtime] = useState(
    currentGoal.timeSlots && currentGoal.timeSlots.bedtime
      ? currentGoal.timeSlots.bedtime
      : false
  );

  function handleSaveGoalConfig() {
    const updatedGoal = {
      _id: goalId,
      title,
      duration,
      frequency,
      timePeriod,
      timeSlots: {
        onWaking,
        morning,
        midday,
        afternoon,
        evening,
        bedtime,
      },
      days: {
        monday: monday ? { timeSlots: mondayTimeSlots } : "",
        tuesday: tuesday ? { timeSlots: tuesdayTimeSlots } : "",
        wednesday: wednesday ? { timeSlots: wednesdayTimeSlots } : "",
        thursday: thursday ? { timeSlots: thursdayTimeSlots } : "",
        friday: friday ? { timeSlots: fridayTimeSlots } : "",
        saturday: saturday ? { timeSlots: saturdayTimeSlots } : "",
        sunday: sunday ? { timeSlots: sundayTimeSlots } : "",
      },
    };

    const payload = { projectId, updatedGoal };
    console.log("saving goal config: ", updatedGoal);

    dispatch(saveGoalConfig(payload));
    saveGoalList(projectId, updatedGoal);
    handleCloseDrawer();
  }
  return (
    <>
      {currentGoal && (
        <div>
          <Drawer anchor="top" open={open} transitionDuration={800}>
            <ProjectsDrawerToolbar handleCloseDrawer={handleCloseDrawer} />
            <div className="projects-drawer">
              <div className="container">
                Configure Goal
                <div style={{ width: "100%" }}>
                  <Box
                    component="div"
                    sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
                    noValidate
                    autoComplete="off"
                    fullwidth="true"
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ flex: "2" }}>
                        <TextField
                          label="Goal Title"
                          variant="outlined"
                          fullwidth="true"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          sx={{ width: "100%" }}
                        />
                      </div>
                      <div style={{ flex: "1" }}>
                        <TextField
                          label="Duration in Minutes"
                          variant="outlined"
                          fullwidth="true"
                          type="number"
                          sx={{ width: "100%" }}
                          inputProps={{ min: 1 }}
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        />
                      </div>
                      <div style={{ flex: "1" }}>
                        <InputLabel
                          id="demo-simple-select"
                          sx={{ fontSize: "10pt" }}
                        >
                          Time Period
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          sx={{ width: "100%" }}
                          value={timePeriod}
                          onChange={(e) => {
                            setTimePeriod(e.target.value);
                          }}
                        >
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value="1">Every Day</MenuItem>
                          <MenuItem value="2">Every Weekday</MenuItem>
                          <MenuItem value="3">Every Week</MenuItem>
                          <MenuItem value="4">Every Month</MenuItem>
                        </Select>
                      </div>
                      <div style={{ flex: "1" }}>
                        <InputLabel
                          id="demo-simple-select"
                          sx={{ fontSize: "10pt" }}
                        >
                          Frequency
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          sx={{ width: "100%" }}
                          value={frequency}
                          onChange={(e) => {
                            setFrequency(e.target.value);
                          }}
                        >
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value="1">Once</MenuItem>
                          <MenuItem value="2">Twice</MenuItem>
                          <MenuItem value="3">Three times</MenuItem>s
                        </Select>
                      </div>
                      {(Number(timePeriod) === 1 ||
                        Number(timePeriod) === 2) && (
                        <>
                          <div style={{ flex: "1" }}>
                            <InputLabel
                              id="demo-simple-select"
                              sx={{ fontSize: "10pt" }}
                            >
                              Time Slots
                            </InputLabel>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="On Waking"
                              checked={onWaking}
                              onChange={(e) => setOnWaking(!onWaking)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Morning"
                              checked={morning}
                              onChange={(e) => setMorning(!morning)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Midday"
                              checked={midday}
                              onChange={(e) => setMidday(!midday)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Afternoon"
                              checked={afternoon}
                              onChange={(e) => setAfternoon(!afternoon)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Evening"
                              checked={evening}
                              onChange={(e) => setEvening(!evening)}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Bedtime"
                              checked={bedtime}
                              onChange={(e) => setBedtime(!bedtime)}
                            />
                          </div>
                        </>
                      )}
                      {Number(timePeriod) === 3 && (
                        <div style={{ flex: "1" }}>
                          <InputLabel
                            id="demo-simple-select"
                            sx={{ fontSize: "10pt" }}
                          >
                            Day
                          </InputLabel>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Monday"
                            checked={monday}
                            onChange={(e) => setMonday(!monday)}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Tuesday"
                            checked={tuesday}
                            onChange={(e) => setTuesday(!tuesday)}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Wednesday"
                            checked={wednesday}
                            onChange={(e) => setWednesday(!wednesday)}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Thursday"
                            checked={thursday}
                            onChange={(e) => setThursday(!thursday)}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Friday"
                            checked={friday}
                            onChange={(e) => setFriday(!friday)}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Saturday"
                            checked={saturday}
                            onChange={(e) => setSaturday(!saturday)}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Sunday"
                            checked={sunday}
                            onChange={(e) => setSunday(!sunday)}
                          />
                        </div>
                      )}
                      {monday && (
                        <>
                          <div style={{ flex: "1" }}>
                            <InputLabel
                              id="demo-simple-select"
                              sx={{ fontSize: "10pt" }}
                            >
                              Monday Timeslots
                            </InputLabel>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="On Waking"
                              checked={mondayTimeSlots.onWaking}
                              onChange={(e) => {
                                setMondayTimeSlots((prev) => {
                                  return { ...prev, onWaking: !prev.onWaking };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Morning"
                              checked={mondayTimeSlots.morning}
                              onChange={(e) => {
                                setMondayTimeSlots((prev) => {
                                  return { ...prev, morning: !prev.morning };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Midday"
                              checked={mondayTimeSlots.midday}
                              onChange={(e) => {
                                setMondayTimeSlots((prev) => {
                                  return { ...prev, midday: !prev.midday };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Afternoon"
                              checked={mondayTimeSlots.afternoon}
                              onChange={(e) => {
                                setMondayTimeSlots((prev) => {
                                  return {
                                    ...prev,
                                    afternoon: !prev.afternoon,
                                  };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Evening"
                              checked={mondayTimeSlots.evening}
                              onChange={(e) => {
                                setMondayTimeSlots((prev) => {
                                  return { ...prev, evening: !prev.evening };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Bedtime"
                              checked={mondayTimeSlots.bedtime}
                              onChange={(e) => {
                                setMondayTimeSlots((prev) => {
                                  return { ...prev, bedtime: !prev.bedtime };
                                });
                              }}
                            />
                          </div>
                        </>
                      )}
                      {tuesday && (
                        <>
                          <div style={{ flex: "1" }}>
                            <InputLabel
                              id="demo-simple-select"
                              sx={{ fontSize: "10pt" }}
                            >
                              Tuesday Timeslots
                            </InputLabel>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="On Waking"
                              checked={tuesdayTimeSlots.onWaking}
                              onChange={(e) => {
                                setTuesdayTimeSlots((prev) => {
                                  return { ...prev, onWaking: !prev.onWaking };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Morning"
                              checked={tuesdayTimeSlots.morning}
                              onChange={(e) => {
                                setTuesdayTimeSlots((prev) => {
                                  return { ...prev, morning: !prev.morning };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Midday"
                              checked={tuesdayTimeSlots.midday}
                              onChange={(e) => {
                                setTuesdayTimeSlots((prev) => {
                                  return { ...prev, midday: !prev.midday };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Afternoon"
                              checked={tuesdayTimeSlots.afternoon}
                              onChange={(e) => {
                                setTuesdayTimeSlots((prev) => {
                                  return {
                                    ...prev,
                                    afternoon: !prev.afternoon,
                                  };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Evening"
                              checked={tuesdayTimeSlots.evening}
                              onChange={(e) => {
                                setTuesdayTimeSlots((prev) => {
                                  return { ...prev, evening: !prev.evening };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Bedtime"
                              checked={tuesdayTimeSlots.bedtime}
                              onChange={(e) => {
                                setTuesdayTimeSlots((prev) => {
                                  return { ...prev, bedtime: !prev.bedtime };
                                });
                              }}
                            />
                          </div>
                        </>
                      )}
                      {wednesday && (
                        <>
                          <div style={{ flex: "1" }}>
                            <InputLabel
                              id="demo-simple-select"
                              sx={{ fontSize: "10pt" }}
                            >
                              Wednesday Timeslots
                            </InputLabel>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="On Waking"
                              checked={wednesdayTimeSlots.onWaking}
                              onChange={(e) => {
                                setWednesdayTimeSlots((prev) => {
                                  return { ...prev, onWaking: !prev.onWaking };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Morning"
                              checked={wednesdayTimeSlots.morning}
                              onChange={(e) => {
                                setWednesdayTimeSlots((prev) => {
                                  return { ...prev, morning: !prev.morning };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Midday"
                              checked={wednesdayTimeSlots.midday}
                              onChange={(e) => {
                                setWednesdayTimeSlots((prev) => {
                                  return { ...prev, midday: !prev.midday };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Afternoon"
                              checked={wednesdayTimeSlots.afternoon}
                              onChange={(e) => {
                                setWednesdayTimeSlots((prev) => {
                                  return {
                                    ...prev,
                                    afternoon: !prev.afternoon,
                                  };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Evening"
                              checked={wednesdayTimeSlots.evening}
                              onChange={(e) => {
                                setWednesdayTimeSlots((prev) => {
                                  return { ...prev, evening: !prev.evening };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Bedtime"
                              checked={wednesdayTimeSlots.bedtime}
                              onChange={(e) => {
                                setWednesdayTimeSlots((prev) => {
                                  return { ...prev, bedtime: !prev.bedtime };
                                });
                              }}
                            />
                          </div>
                        </>
                      )}
                      {thursday && (
                        <>
                          <div style={{ flex: "1" }}>
                            <InputLabel
                              id="demo-simple-select"
                              sx={{ fontSize: "10pt" }}
                            >
                              Thursday Timeslots
                            </InputLabel>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="On Waking"
                              checked={thursdayTimeSlots.onWaking}
                              onChange={(e) => {
                                setThursdayTimeSlots((prev) => {
                                  return { ...prev, onWaking: !prev.onWaking };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Morning"
                              checked={thursdayTimeSlots.monday}
                              onChange={(e) => {
                                setThursdayTimeSlots((prev) => {
                                  return { ...prev, morning: !prev.morning };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Midday"
                              checked={thursdayTimeSlots.midday}
                              onChange={(e) => {
                                setThursdayTimeSlots((prev) => {
                                  return { ...prev, midday: !prev.midday };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Afternoon"
                              checked={thursdayTimeSlots.afternoon}
                              onChange={(e) => {
                                setThursdayTimeSlots((prev) => {
                                  return {
                                    ...prev,
                                    afternoon: !prev.afternoon,
                                  };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Evening"
                              checked={thursdayTimeSlots.evening}
                              onChange={(e) => {
                                setThursdayTimeSlots((prev) => {
                                  return { ...prev, evening: !prev.evening };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Bedtime"
                              checked={thursdayTimeSlots.bedtime}
                              onChange={(e) => {
                                setThursdayTimeSlots((prev) => {
                                  return { ...prev, bedtime: !prev.bedtime };
                                });
                              }}
                            />
                          </div>
                        </>
                      )}
                      {friday && (
                        <>
                          <div style={{ flex: "1" }}>
                            <InputLabel
                              id="demo-simple-select"
                              sx={{ fontSize: "10pt" }}
                            >
                              Friday Timeslots
                            </InputLabel>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="On Waking"
                              checked={fridayTimeSlots.onWaking}
                              onChange={(e) => {
                                setFridayTimeSlots((prev) => {
                                  return { ...prev, onWaking: !prev.onWaking };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Morning"
                              checked={fridayTimeSlots.morning}
                              onChange={(e) => {
                                setFridayTimeSlots((prev) => {
                                  return { ...prev, morning: !prev.morning };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Midday"
                              checked={fridayTimeSlots.midday}
                              onChange={(e) => {
                                setFridayTimeSlots((prev) => {
                                  return { ...prev, midday: !prev.midday };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Afternoon"
                              checked={fridayTimeSlots.afternoon}
                              onChange={(e) => {
                                setFridayTimeSlots((prev) => {
                                  return {
                                    ...prev,
                                    afternoon: !prev.afternoon,
                                  };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Evening"
                              checked={fridayTimeSlots.evening}
                              onChange={(e) => {
                                setFridayTimeSlots((prev) => {
                                  return { ...prev, evening: !prev.evening };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Bedtime"
                              checked={fridayTimeSlots.bedtime}
                              onChange={(e) => {
                                setFridayTimeSlots((prev) => {
                                  return { ...prev, bedtime: !prev.bedtime };
                                });
                              }}
                            />
                          </div>
                        </>
                      )}
                      {saturday && (
                        <>
                          <div style={{ flex: "1" }}>
                            <InputLabel
                              id="demo-simple-select"
                              sx={{ fontSize: "10pt" }}
                            >
                              Saturday Timeslots
                            </InputLabel>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="On Waking"
                              checked={saturdayTimeSlots.onWaking}
                              onChange={(e) => {
                                setSaturdayTimeSlots((prev) => {
                                  return { ...prev, onWaking: !prev.onWaking };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Morning"
                              checked={saturdayTimeSlots.morning}
                              onChange={(e) => {
                                setSaturdayTimeSlots((prev) => {
                                  return { ...prev, morning: !prev.morning };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Midday"
                              checked={saturdayTimeSlots.midday}
                              onChange={(e) => {
                                setSaturdayTimeSlots((prev) => {
                                  return { ...prev, midday: !prev.midday };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Afternoon"
                              checked={saturdayTimeSlots.afternoon}
                              onChange={(e) => {
                                setSaturdayTimeSlots((prev) => {
                                  return {
                                    ...prev,
                                    afternoon: !prev.afternoon,
                                  };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Evening"
                              checked={saturdayTimeSlots.evening}
                              onChange={(e) => {
                                setSaturdayTimeSlots((prev) => {
                                  return { ...prev, evening: !prev.evening };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Bedtime"
                              checked={saturdayTimeSlots.bedtime}
                              onChange={(e) => {
                                setSaturdayTimeSlots((prev) => {
                                  return { ...prev, bedtime: !prev.bedtime };
                                });
                              }}
                            />
                          </div>
                        </>
                      )}
                      {sunday && (
                        <>
                          <div style={{ flex: "1" }}>
                            <InputLabel
                              id="demo-simple-select"
                              sx={{ fontSize: "10pt" }}
                            >
                              Sunday Timeslots
                            </InputLabel>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="On Waking"
                              checked={sundayTimeSlots.onWaking}
                              onChange={(e) => {
                                setSundayTimeSlots((prev) => {
                                  return { ...prev, onWaking: !prev.onWaking };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Morning"
                              checked={sundayTimeSlots.morning}
                              onChange={(e) => {
                                setSundayTimeSlots((prev) => {
                                  return { ...prev, morning: !prev.morning };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Midday"
                              checked={sundayTimeSlots.midday}
                              onChange={(e) => {
                                setSundayTimeSlots((prev) => {
                                  return { ...prev, midday: !prev.midday };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Afternoon"
                              checked={sundayTimeSlots.afternoon}
                              onChange={(e) => {
                                setSundayTimeSlots((prev) => {
                                  return {
                                    ...prev,
                                    afternoon: !prev.afternoon,
                                  };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Evening"
                              checked={sundayTimeSlots.evening}
                              onChange={(e) => {
                                setSundayTimeSlots((prev) => {
                                  return { ...prev, evening: !prev.evening };
                                });
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Bedtime"
                              checked={sundayTimeSlots.bedtime}
                              onChange={(e) => {
                                setSundayTimeSlots((prev) => {
                                  return { ...prev, bedtime: !prev.bedtime };
                                });
                              }}
                            />
                          </div>
                        </>
                      )}
                      <SubmitButton onClick={handleSaveGoalConfig}>
                        Save
                      </SubmitButton>
                    </div>
                  </Box>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      )}
    </>
  );
}
