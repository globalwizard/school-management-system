import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  LESSONS_FETCH_ATTEMPTED,
  LESSONS_FETCH_ATTEMPTED_FAILED,
  LESSONS_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/lessons";

function* onlineClassesWorker(action) {
  try {
    const response = yield call(axios.get, `/api/lessons/${action.payload}`);

    if (
      response.data.error ||
      !response.data.lessons ||
      !response.data.lessons.length
    ) {
      yield put({ type: LESSONS_FETCH_ATTEMPTED_FAILED });
    } else {
      yield put({
        type: LESSONS_FETCH_ATTEMPTED_SUCCESSED,
        payload: response.data.lessons,
      });
    }
  } catch (err) {
    yield put({ type: LESSONS_FETCH_ATTEMPTED_FAILED });
  }
}

function* onlineClassesSaga() {
  yield takeEvery(LESSONS_FETCH_ATTEMPTED, onlineClassesWorker);
}

export default onlineClassesSaga;
