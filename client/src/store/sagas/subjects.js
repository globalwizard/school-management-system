import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  SUBJECTS_FETCH_ATTEMPTED,
  SUBJECTS_FETCH_ATTEMPTED_FAILED,
  SUBJECTS_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/subjects";

function* onlineClassesWorker(action) {
  try {
    const response = yield call(axios.get, "/api/course");

    if (
      response.data.error ||
      !response.data.courses ||
      !response.data.courses.length
    ) {
      yield put({ type: SUBJECTS_FETCH_ATTEMPTED_FAILED });
    } else {
      yield put({
        type: SUBJECTS_FETCH_ATTEMPTED_SUCCESSED,
        payload: response.data.courses,
      });
    }
  } catch (err) {
    yield put({ type: SUBJECTS_FETCH_ATTEMPTED_FAILED });
  }
}

function* subjectsSaga() {
  yield takeEvery(SUBJECTS_FETCH_ATTEMPTED, onlineClassesWorker);
}

export default subjectsSaga;
