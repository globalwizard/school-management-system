import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  TIME_TABLE_FETCH_ATTEMPTED,
  TIME_TABLE_FETCH_ATTEMPTED_FAILED,
  TIME_TABLE_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/time-table";

function* timeTableWorker(action) {
  try {
    const response = yield call(axios.get, "/api/time-table");

    if (
      response.data.error ||
      !response.data.timeTable ||
      !response.data.timeTable.length
    ) {
      yield put({ type: TIME_TABLE_FETCH_ATTEMPTED_FAILED });
    } else {
      yield put({
        type: TIME_TABLE_FETCH_ATTEMPTED_SUCCESSED,
        payload: response.data.timeTable,
      });
    }
  } catch (err) {
    yield put({ type: TIME_TABLE_FETCH_ATTEMPTED_FAILED });
  }
}

function* timeTableSaga() {
  yield takeEvery(TIME_TABLE_FETCH_ATTEMPTED, timeTableWorker);
}

export default timeTableSaga;
