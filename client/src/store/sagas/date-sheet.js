import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  DATE_SHEET_FETCH_ATTEMPTED,
  DATE_SHEET_FETCH_ATTEMPTED_FAILED,
  DATE_SHEET_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/date-sheet";

function* dateSheetWorker(action) {
  try {
    const response = yield call(axios.get, `/api/date-sheet`);

    if (
      response.data.error ||
      !response.data.dateSheet ||
      !response.data.dateSheet.length
    ) {
      yield put({ type: DATE_SHEET_FETCH_ATTEMPTED_FAILED });
    } else {
      yield put({
        type: DATE_SHEET_FETCH_ATTEMPTED_SUCCESSED,
        payload: response.data.dateSheet,
      });
    }
  } catch (err) {
    yield put({ type: DATE_SHEET_FETCH_ATTEMPTED_FAILED });
  }
}

function* dateSheetSaga() {
  yield takeEvery(DATE_SHEET_FETCH_ATTEMPTED, dateSheetWorker);
}

export default dateSheetSaga;
