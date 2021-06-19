import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  LOGIN_ATTEMPTED,
  LOGIN_ATTEMPTED_FAILED,
  LOGIN_ATTEMPTED_SUCCESSED,
  UPDATE_USER_AVATAR,
  UPDATE_USER,
  UPDATE_PROFILE_DATA_ATTEMPTED,
  CHANGE_PASSWORD_ATTEMPTED,
} from "../constants/auth";
import { store } from "../../store";

function* loginWorker(action) {
  try {
    const response = yield call(
      axios.post,
      "/api/user/authorize",
      action.payload
    );

    if (!response.data.error) {
      yield put({ type: LOGIN_ATTEMPTED_SUCCESSED });
    }
  } catch (err) {
    yield put({ type: LOGIN_ATTEMPTED_FAILED });
  }
}

function* updateAvatarWorker(action) {
  try {
    const response = yield call(
      axios.post,
      "/api/user/update/avatar",
      action.payload
    );

    if (!response.data.error) {
      yield put({
        type: UPDATE_USER,
        payload: { ...store.getState().auth.user, avatar: response.data.url },
      });
    }
  } catch (err) {
    yield put({ type: LOGIN_ATTEMPTED_FAILED });
  }
}

function* updateUserDataWorker(action) {
  try {
    const response = yield call(axios.post, "/api/user/update", action.payload);

    if (!response.data.error || response.data.user) {
      yield put({
        type: UPDATE_USER,
        payload: { ...store.getState().auth.user, ...response.data.user },
      });
      yield put({ type: LOGIN_ATTEMPTED_SUCCESSED });
    }
  } catch (err) {
    yield put({
      type: LOGIN_ATTEMPTED_FAILED,
      payload: err.response.data.message || err.message,
    });
  }
}

function* changePasswordWorker(action) {
  try {
    const response = yield call(
      axios.post,
      "/api/user/update/password",
      action.payload
    );

    if (!response.data.error) {
      yield put({ type: LOGIN_ATTEMPTED_SUCCESSED });
    }
  } catch (err) {
    yield put({
      type: LOGIN_ATTEMPTED_FAILED,
      payload: err.response.data.message || err.message,
    });
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_ATTEMPTED, loginWorker);
  yield takeEvery(UPDATE_USER_AVATAR, updateAvatarWorker);
  yield takeEvery(UPDATE_PROFILE_DATA_ATTEMPTED, updateUserDataWorker);
  yield takeEvery(CHANGE_PASSWORD_ATTEMPTED, changePasswordWorker);
}

export default authSaga;
