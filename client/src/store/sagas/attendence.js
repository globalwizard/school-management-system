import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  ATTENDENCE_FETCH_ATTEMPTED,
  ATTENDENCE_FETCH_ATTEMPTED_FAILED,
  ATTENDENCE_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/attendence";

function* attendenceWorker(action) {
  try {
    const response = yield call(axios.get, `/api/attendence`);

    if (
      response.data.error ||
      !response.data.attendence ||
      !response.data.attendence.length
    ) {
      yield put({ type: ATTENDENCE_FETCH_ATTEMPTED_FAILED });
    } else {
      yield put({
        type: ATTENDENCE_FETCH_ATTEMPTED_SUCCESSED,
        payload: response.data.attendence,
      });
    }
  } catch (err) {
    yield put({ type: ATTENDENCE_FETCH_ATTEMPTED_FAILED });
  }
}

function* attendenceSaga() {
  yield takeEvery(ATTENDENCE_FETCH_ATTEMPTED, attendenceWorker);
}

export default attendenceSaga;
