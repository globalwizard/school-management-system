import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  RESULTS_FETCH_ATTEMPTED,
  RESULTS_FETCH_ATTEMPTED_FAILED,
  RESULTS_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/results";

function* resultsWorker(action) {
  try {
    const response = yield call(axios.get, "/api/results");

    if (response.data.error || !response.data.result) {
      yield put({ type: RESULTS_FETCH_ATTEMPTED_FAILED });
    } else {
      yield put({
        type: RESULTS_FETCH_ATTEMPTED_SUCCESSED,
        payload: response.data.result,
      });
    }
  } catch (err) {
    yield put({ type: RESULTS_FETCH_ATTEMPTED_FAILED });
  }
}

function* resultsSaga() {
  yield takeEvery(RESULTS_FETCH_ATTEMPTED, resultsWorker);
}

export default resultsSaga;
