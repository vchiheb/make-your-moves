class Activity {
  timeCompleted = null;
  constructor(id, title, goalId, duration) {
    this.complete = false;
    this.id = id;
    this.goal = goalId;
    this.title = title;
    this.duration = duration;
  }
}

class TimeSlot {
  timeAvailable = 30;
  totalTaskTime = 0;
  timeLeftOver = 0;
  activities = [];
  note = "";

  constructor(timeSlotTitle, timeAvailable) {
    this.title = timeSlotTitle;
    this.timeAvailable = timeAvailable;
  }
  addActivity(activity, timeSlotTitle) {
    const newActivity = new Activity(
      timeSlotTitle + "_" + activity._id,
      activity.title,
      activity._id,
      activity.duration
    );
    if (Number(activity.duration)) {
      this.totalTaskTime += Number(activity.duration);
    }
    this.timeLeftOver = Number(this.timeAvailable) - Number(this.totalTaskTime);
    this.activities.push(newActivity);
  }
  getActivities() {
    return this.activities;
  }
  completeActivity(activityId, timestamp, complete) {
    this.activities = [
      ...this.activities.map((activity) => {
        if (activity.id === activityId) {
          if (complete) {
            activity.complete = true;
            activity.timeCompleted = timestamp;
          } else {
            activity.complete = false;
            activity.timeCompleted = null;
          }
          return activity;
        }
        return activity;
      }),
    ];
  }
  addNote(note) {
    this.note = note;
  }
}

class Day {
  title = "";
  note = "";
  date = "";
  full = false;
  constructor(dayTitle) {
    this.title = dayTitle;
    this.onWaking = new TimeSlot("On Waking", 30);
    this.morning = new TimeSlot("Morning", 240);
    this.midday = new TimeSlot("Midday", 60);
    this.afternoon = new TimeSlot("Afternoon", 240);
    this.evening = new TimeSlot("Evening", 240);
    this.bedtime = new TimeSlot("Bedtime", 30);
  }

  assignWeeklyActivityToTimeSlot(activity, timeSlot) {
    switch (timeSlot) {
      case "onWaking":
        this.onWaking.addActivity(activity, timeSlot);
        break;
      case "morning":
        this.morning.addActivity(activity, timeSlot);
        break;
      case "midday":
        this.midday.addActivity(activity, timeSlot);
        break;
      case "afternoon":
        this.afternoon.addActivity(activity, timeSlot);
        break;
      case "evening":
        this.evening.addActivity(activity, timeSlot);
        break;
      case "bedtime":
        this.bedtime.addActivity(activity, timeSlot);
        break;
      default:
        break;
    }
  }

  assignWeeklyActivity(activity, timeSlots) {
    if (timeSlots.onWaking) {
      this.assignWeeklyActivityToTimeSlot(activity, "onWaking");
    }
    if (timeSlots.morning) {
      this.assignWeeklyActivityToTimeSlot(activity, "morning");
    }
    if (timeSlots.midday) {
      this.assignWeeklyActivityToTimeSlot(activity, "midday");
    }
    if (timeSlots.afternoon) {
      this.assignWeeklyActivityToTimeSlot(activity, "afternoon");
    }
    if (timeSlots.evening) {
      this.assignWeeklyActivityToTimeSlot(activity, "evening");
    }
    if (timeSlots.bedtime) {
      this.assignWeeklyActivityToTimeSlot(activity, "bedtime");
    }
  }

  getTimeSlotsTimeLeftOver(timeSlots) {
    return [
      this.onwWaking.timeLeftOver,
      this.morning.timeLeftOver,
      this.midday.timeLeftOver,
      this.afternoon.timeLeftOver,
      this.evening.timeLeftOver,
      this.bedtime.timeLeftOver,
    ];
  }
  addActivity(activity, timeSlot) {
    switch (timeSlot) {
      case "onWaking":
        this.onWaking.addActivity(activity, timeSlot);
        break;
      case "morning":
        this.morning.addActivity(activity, timeSlot);
        break;
      case "midday":
        this.midday.addActivity(activity, timeSlot);
        break;
      case "afternoon":
        this.afternoon.addActivity(activity, timeSlot);
        break;
      case "evening":
        this.evening.addActivity(activity, timeSlot);
        break;
      case "bedtime":
        this.bedtime.addActivity(activity, timeSlot);
        break;
      default:
        break;
    }
  }

  assignDailyActivity(activity) {
    if (activity.timeSlots.onWaking) {
      this.addActivity(activity, "onWaking");
    }
    if (activity.timeSlots.morning) {
      this.addActivity(activity, "morning");
    }
    if (activity.timeSlots.midday) {
      this.addActivity(activity, "midday");
    }
    if (activity.timeSlots.afternoon) {
      this.addActivity(activity, "afternoon");
    }
    if (activity.timeSlots.evening) {
      this.addActivity(activity, "evening");
    }
    if (activity.timeSlots.bedtime) {
      this.addActivity(activity, "bedtime");
    }
  }
  completeActivity(activityId, timeSlot, timestamp, complete) {
    switch (timeSlot) {
      case "On Waking":
        this.onWaking.completeActivity(activityId, timestamp, complete);
        break;
      case "Morning":
        this.morning.completeActivity(activityId, timestamp, complete);
        break;
      case "Midday":
        this.midday.completeActivity(activityId, timestamp, complete);
        break;
      case "Afternoon":
        this.afternoon.completeActivity(activityId, timestamp, complete);
        break;
      case "Evening":
        this.evening.completeActivity(activityId, timestamp, complete);
        break;
      case "Bedtime":
        this.bedtime.completeActivity(activityId, timestamp, complete);
        break;
      default:
        break;
    }
  }
  addNoteToTimeSlot(note, timeSlotTitle) {
    switch (timeSlotTitle) {
      case "On Waking":
        this.onWaking.addNote(note);
        break;
      case "Morning":
        this.morning.addNote(note);
        break;
      case "Midday":
        this.midday.addNote(note);
        break;
      case "Afternoon":
        this.afternoon.addNote(note);
        break;
      case "Evening":
        this.evening.addNote(note);
        break;
      case "Bedtime":
        this.bedtime.addNote(note);
        break;
      default:
        break;
    }
  }

  addNote(note) {
    this.note = note;
  }

  addDate(date) {
    this.date = date;
  }
}

class Schedule {
  constructor() {
    this.monday = new Day("Monday");
    this.tuesday = new Day("Tuesday");
    this.wednesday = new Day("Wednesday");
    this.thursday = new Day("Thursday");
    this.friday = new Day("Friday");
    this.saturday = new Day("Saturday");
    this.sunday = new Day("Sunday");
  }

  completeActivity(activity, day, timeSlot, timestamp, isDone) {
    switch (day) {
      case "Monday":
        this.monday.completeActivity(activity.id, timeSlot, timestamp, isDone);
        break;
      case "Tuesday":
        this.tuesday.completeActivity(activity.id, timeSlot, timestamp, isDone);
        break;
      case "Wednesday":
        this.wednesday.completeActivity(
          activity.id,
          timeSlot,
          timestamp,
          isDone
        );
        break;
      case "Thursday":
        this.thursday.completeActivity(
          activity.id,
          timeSlot,
          timestamp,
          isDone
        );
        break;
      case "Friday":
        this.friday.completeActivity(activity.id, timeSlot, timestamp, isDone);
        break;
      case "Saturday":
        this.saturday.completeActivity(
          activity.id,
          timeSlot,
          timestamp,
          isDone
        );
        break;
      case "Sunday":
        this.wednesday.completeActivity(
          activity.id,
          timeSlot,
          timestamp,
          isDone
        );
        break;
      default:
        break;
    }
  }

  buildSchedule(data) {
    for (let i = 0; i < data.length; i++) {
      let project = data[i];
      if (project.goals) {
        for (let j = 0; j < project.goals.length; j++) {
          let goal = project.goals[j];
          if (Number(goal.timePeriod) && Number(goal.timePeriod) === 1) {
            // handle daily goals
            if (goal.timeSlots) {
              // on waking is       30 minutes
              // morning is 8 - 12 240 minutes
              // midday is 12 - 1   60 minutes
              // afternoon is 1 - 5 240 minutes
              // evening is 5 - 9.  240 minutes
              // bedtime is         30 minutes
              // add activities to Mondays timeslots
              this.monday.assignDailyActivity(goal);
              this.tuesday.assignDailyActivity(goal);
              this.wednesday.assignDailyActivity(goal);
              this.thursday.assignDailyActivity(goal);
              this.friday.assignDailyActivity(goal);
              this.saturday.assignDailyActivity(goal);
              this.sunday.assignDailyActivity(goal);
            }
            // add unscheduled activities to mornings first across the week
          }
          if (Number(goal.timePeriod) && Number(goal.timePeriod) === 2) {
            if (goal.timeSlots) {
              // handle weekday tasks
              this.monday.assignDailyActivity(goal);
              this.tuesday.assignDailyActivity(goal);
              this.wednesday.assignDailyActivity(goal);
              this.thursday.assignDailyActivity(goal);
              this.friday.assignDailyActivity(goal);
            }
          }
          if (Number(goal.timePeriod) && Number(goal.timePeriod) === 3) {
            if (goal.days) {
              // handle weekly tasks with predefined slots
              console.log("goal: ", goal);
              if (goal.days.monday.timeSlots) {
                this.monday.assignWeeklyActivity(
                  goal,
                  goal.days.monday.timeSlots
                );
              }
              if (goal.days.tuesday.timeSlots) {
                this.tuesday.assignWeeklyActivity(
                  goal,
                  goal.days.tuesday.timeSlots
                );
              }
              if (goal.days.wednesday.timeSlots) {
                this.wednesday.assignWeeklyActivity(
                  goal,
                  goal.days.wednesday.timeSlots
                );
              }
              if (goal.days.friday.timeSlots) {
                this.friday.assignWeeklyActivity(
                  goal,
                  goal.days.friday.timeSlots
                );
              }
              if (goal.days.saturday.timeSlots) {
                this.saturday.assignWeeklyActivity(
                  goal,
                  goal.days.saturday.timeSlots
                );
              }
              if (goal.days.sunday.timeSlots) {
                this.sunday.assignWeeklyActivity(
                  goal,
                  goal.days.sunday.timeSlots
                );
              }
            }
            // handle weekly tasks with no predefined slots
          }
          // handle monthly goals
          // handle yearly goals
        } //finished iterating through goals
      }
    }
  }

  addTimeSlotNote(note, timeSlotTitle, dayTitle) {
    switch (dayTitle) {
      case "Monday":
        this.monday.addNoteToTimeSlot(note, timeSlotTitle);
        break;
      case "Tuesday":
        this.tuesday.addNoteToTimeSlot(note, timeSlotTitle);
        break;
      case "Wednesday":
        this.wednesday.addNoteToTimeSlot(note, timeSlotTitle);
        break;
      case "Thursday":
        this.thursday.addNoteToTimeSlot(note, timeSlotTitle);
        break;
      case "Friday":
        this.friday.addNoteToTimeSlot(note, timeSlotTitle);
        break;
      case "Saturday":
        this.saturday.addNoteToTimeSlot(note, timeSlotTitle);
        break;
      case "Sunday":
        this.sunday.addNoteToTimeSlot(note, timeSlotTitle);
        break;
      default:
        break;
    }
  }

  addDayNote(note, dayTitle) {
    switch (dayTitle) {
      case "Monday":
        this.monday.addNote(note);
        break;
      case "Tuesday":
        this.tuesday.addNote(note);
        break;
      case "Wednesday":
        this.wednesday.addNote(note);
        break;
      case "Thursday":
        this.thursday.addNote(note);
        break;
      case "Friday":
        this.friday.addNote(note);
        break;
      case "Saturday":
        this.saturday.addNote(note);
        break;
      case "Sunday":
        this.sunday.addNote(note);
        break;
      default:
        break;
    }
  }
  addDayDate(date, dayTitle) {
    switch (dayTitle) {
      case "Monday":
        this.monday.addDate(date);
        break;
      case "Tuesday":
        this.tuesday.addDate(date);
        break;
      case "Wednesday":
        this.wednesday.addDate(date);
        break;
      case "Thursday":
        this.thursday.addDate(date);
        break;
      case "Friday":
        this.friday.addDate(date);
        break;
      case "Saturday":
        this.saturday.addDate(date);
        break;
      case "Sunday":
        this.sunday.addDate(date);
        break;
      default:
        break;
    }
  }
}

export default Schedule;
