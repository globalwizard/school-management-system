import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  ONLINE_CLASSES_FETCH_ATTEMPTED,
  ONLINE_CLASSES_FETCH_ATTEMPTED_FAILED,
  ONLINE_CLASSES_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/online-classes";

function* onlineClassesWorker(action) {
  try {
    const response = yield call(axios.get, "/api/online-classes");

    if (
      response.data.error ||
      !response.data.classes ||
      !response.data.classes.length
    ) {
      yield put({ type: ONLINE_CLASSES_FETCH_ATTEMPTED_FAILED });
    } else {
      yield put({
        type: ONLINE_CLASSES_FETCH_ATTEMPTED_SUCCESSED,
        payload: response.data.classes,
      });
    }
  } catch (err) {
    yield put({ type: ONLINE_CLASSES_FETCH_ATTEMPTED_FAILED });
  }
}

function* onlineClassesSaga() {
  yield takeEvery(ONLINE_CLASSES_FETCH_ATTEMPTED, onlineClassesWorker);
}

export default onlineClassesSaga;
