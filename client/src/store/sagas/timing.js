import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  TIMING_FETCH_ATTEMPTED,
  TIMING_FETCH_ATTEMPTED_FAILED,
  TIMING_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/timing";

function* timingWorker(action) {
  try {
    const response = yield call(axios.get, "/api/school-timing");

    if (
      response.data.error ||
      !response.data.timing ||
      !response.data.timing.length
    ) {
      yield put({ type: TIMING_FETCH_ATTEMPTED_FAILED });
    } else {
      yield put({
        type: TIMING_FETCH_ATTEMPTED_SUCCESSED,
        payload: response.data.timing[0],
      });
    }
  } catch (err) {
    yield put({ type: TIMING_FETCH_ATTEMPTED_FAILED });
  }
}

function* timingSaga() {
  yield takeEvery(TIMING_FETCH_ATTEMPTED, timingWorker);
}

export default timingSaga;
