import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  DASHBOARD_DATA_FETCH_ATTEMPTED,
  DASHBOARD_DATA_FETCH_ATTEMPTED_FAILED,
  DASHBOARD_DATA_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/dashboard";

function* dashboardStudentDataFetchWorker(action) {
  try {
    const response = yield call(axios.get, `/api/dashboard/student`);

    if (response.data.error || !response.data.resultValues) {
      yield put({ type: DASHBOARD_DATA_FETCH_ATTEMPTED_FAILED });
    } else {
      yield put({
        type: DASHBOARD_DATA_FETCH_ATTEMPTED_SUCCESSED,
        payload: {
          coursesCount: response.data.courses,
          resultsCount: response.data.results,
          eventsCount: response.data.events,
          resultChartValues: response.data.resultValues,
          resultChartLabels: response.data.resultLabels,
          attendenceChartValues: response.data.attendenceValues,
        },
      });
    }
  } catch (err) {
    yield put({ type: DASHBOARD_DATA_FETCH_ATTEMPTED_FAILED });
  }
}

function* dashboardSaga() {
  yield takeEvery(
    DASHBOARD_DATA_FETCH_ATTEMPTED,
    dashboardStudentDataFetchWorker
  );
}

export default dashboardSaga;
