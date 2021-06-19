import { fork, all } from "redux-saga/effects";
import userSaga from "./user";
import timingSaga from "./timing";
import timeTableSaga from "./time-table";
import resultsSaga from "./results";
import onlineClassesSaga from "./online-classes";
import subjectsSaga from "./subjects";
import lessonsSaga from "./lessons";
import attendenceSaga from "./attendence";
import feeSaga from "./fee";
import eventsSaga from "./events";
import dateSheetSaga from "./date-sheet";
import leaveApplicationSaga from "./leave-application";
import dashboardSaga from "./dashboard";

function* sagas() {
  yield all([
    fork(userSaga),
    fork(timingSaga),
    fork(timeTableSaga),
    fork(resultsSaga),
    fork(onlineClassesSaga),
    fork(subjectsSaga),
    fork(lessonsSaga),
    fork(attendenceSaga),
    fork(feeSaga),
    fork(eventsSaga),
    fork(dateSheetSaga),
    fork(leaveApplicationSaga),
    fork(dashboardSaga),
  ]);
}

export default sagas;
