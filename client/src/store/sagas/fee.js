import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  FEE_FETCH_ATTEMPTED,
  FEE_FETCH_ATTEMPTED_FAILED,
  FEE_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/fee";

function* feeWorker(action) {
  try {
    const response = yield call(axios.get, `/api/fee`);

    if (
      response.data.error ||
      !response.data.fees ||
      !response.data.fees.length
    ) {
      yield put({ type: FEE_FETCH_ATTEMPTED_FAILED });
    } else {
      yield put({
        type: FEE_FETCH_ATTEMPTED_SUCCESSED,
        payload: response.data.fees,
      });
    }
  } catch (err) {
    yield put({ type: FEE_FETCH_ATTEMPTED_FAILED });
  }
}

function* feeSaga() {
  yield takeEvery(FEE_FETCH_ATTEMPTED, feeWorker);
}

export default feeSaga;
