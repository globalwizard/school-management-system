import { combineReducers } from "redux";
import userReducer from "./user";
import timingReducer from "./timing";
import timeTableReducer from "./time-table";
import resultsReducer from "./results";
import onlineClassesReducer from "./online-classes";
import subjectsReducer from "./subjects";
import lessonsReducer from "./lessons";
import attendenceReducer from "./attendence";
import feeReducer from "./fee";
import eventsReducer from "./events";
import dateSheetReducer from "./date-sheet";
import leaveApplicationReducer from "./leave-application";
import dashboardReducer from "./dashboard";

const reducers = combineReducers({
  auth: userReducer,
  timing: timingReducer,
  timeTable: timeTableReducer,
  results: resultsReducer,
  onlineClasses: onlineClassesReducer,
  subjects: subjectsReducer,
  lessons: lessonsReducer,
  attendence: attendenceReducer,
  fee: feeReducer,
  events: eventsReducer,
  dateSheet: dateSheetReducer,
  leaveApplication: leaveApplicationReducer,
  dashboard: dashboardReducer,
});

export default reducers;
