import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  LEAVE_APPLICATION_SUBMIT_ATTEMPTED,
  LEAVE_APPLICATION_SUBMIT_ATTEMPTED_FAILED,
  LEAVE_APPLICATION_SUBMIT_ATTEMPTED_SUCCESSED,
  LEAVE_APPLICATION_FETCH_ATTEMPTED,
  LEAVE_APPLICATION_FETCH_ATTEMPTED_FAILED,
  LEAVE_APPLICATION_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/leave-application";

function* submitApplicationWorker(action) {
  try {
    const response = yield call(
      axios.post,
      `/api/leave-application`,
      action.payload
    );

    if (response.data.error || !response.data.leaveApplication) {
      yield put({
        type: LEAVE_APPLICATION_SUBMIT_ATTEMPTED_FAILED,
        payload: response.data.message,
      });
    } else {
      yield put({
        type: LEAVE_APPLICATION_SUBMIT_ATTEMPTED_SUCCESSED,
        payload: response.data.leaveApplication,
      });
    }
  } catch (err) {
    yield put({
      type: LEAVE_APPLICATION_SUBMIT_ATTEMPTED_FAILED,
      payload: err.response.data.message || err.message,
    });
  }
}
function* getLeaveApplicationsWorker(action) {
  try {
    const response = yield call(axios.get, `/api/leave-application`);

    if (
      response.data.error ||
      !response.data.leaveApplications ||
      !response.data.leaveApplications.length
    ) {
      yield put({
        type: LEAVE_APPLICATION_FETCH_ATTEMPTED_FAILED,
      });
    } else {
      yield put({
        type: LEAVE_APPLICATION_FETCH_ATTEMPTED_SUCCESSED,
        payload: response.data.leaveApplications,
      });
    }
  } catch (err) {
    yield put({
      type: LEAVE_APPLICATION_FETCH_ATTEMPTED_FAILED,
    });
  }
}

function* leaveApplicationSaga() {
  yield takeEvery(LEAVE_APPLICATION_SUBMIT_ATTEMPTED, submitApplicationWorker);
  yield takeEvery(
    LEAVE_APPLICATION_FETCH_ATTEMPTED,
    getLeaveApplicationsWorker
  );
}

export default leaveApplicationSaga;
