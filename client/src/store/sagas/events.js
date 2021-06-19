import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  EVENTS_FETCH_ATTEMPTED,
  EVENTS_FETCH_ATTEMPTED_FAILED,
  EVENTS_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/events";

function* eventsWorker(action) {
  try {
    const response = yield call(axios.get, `/api/events`);

    if (
      response.data.error ||
      !response.data.events ||
      !response.data.events.length
    ) {
      yield put({ type: EVENTS_FETCH_ATTEMPTED_FAILED });
    } else {
      yield put({
        type: EVENTS_FETCH_ATTEMPTED_SUCCESSED,
        payload: response.data.events,
      });
    }
  } catch (err) {
    yield put({ type: EVENTS_FETCH_ATTEMPTED_FAILED });
  }
}

function* eventsSaga() {
  yield takeEvery(EVENTS_FETCH_ATTEMPTED, eventsWorker);
}

export default eventsSaga;
