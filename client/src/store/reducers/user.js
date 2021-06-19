import cookie from "js-cookie";
import jwtDecore from "jwt-decode";
import {
  RESTORE_USER,
  LOGIN_ATTEMPTED,
  LOGIN_ATTEMPTED_SUCCESSED,
  LOGIN_ATTEMPTED_FAILED,
  LOGOUT_USER,
  UPDATE_USER,
  UPDATE_USER_AVATAR,
  UPDATE_PROFILE_DATA_ATTEMPTED,
  CHANGE_PASSWORD_ATTEMPTED,
} from "../constants/auth";

const initial = {
  error: false,
  loading: false,
  user: null,
  errorMessage: null,
};

function authReducer(state = initial, action) {
  switch (action.type) {
    case RESTORE_USER:
      let user;
      const token = cookie.get("session_id");
      if (!token || typeof token !== "string") user = null;
      else user = jwtDecore(token).user;
      return { ...state, user, error: false };
    case LOGOUT_USER:
      cookie.remove("session_id");
      return { ...state, user: null, error: false };
    case LOGIN_ATTEMPTED:
      return { ...state, loading: true };
    case LOGIN_ATTEMPTED_SUCCESSED:
      return {
        error: false,
        loading: false,
        errorMessage: null,
        user: jwtDecore(cookie.get("session_id")).user,
      };
    case LOGIN_ATTEMPTED_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    case UPDATE_USER:
      return { ...state, user: action.payload, loading: false, error: false };
    case UPDATE_USER_AVATAR:
      return { ...state, loading: true };
    case UPDATE_PROFILE_DATA_ATTEMPTED:
      return { ...state, loading: true };
    case CHANGE_PASSWORD_ATTEMPTED:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default authReducer;
