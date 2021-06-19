import {
  LEAVE_APPLICATION_FETCH_ATTEMPTED,
  LEAVE_APPLICATION_FETCH_ATTEMPTED_FAILED,
  LEAVE_APPLICATION_FETCH_ATTEMPTED_SUCCESSED,
  LEAVE_APPLICATION_SUBMIT_ATTEMPTED,
  LEAVE_APPLICATION_SUBMIT_ATTEMPTED_FAILED,
  LEAVE_APPLICATION_SUBMIT_ATTEMPTED_SUCCESSED,
  SET_REDIRECT_TO_DEFAULT,
} from "../constants/leave-application";

const initial = {
  error: false,
  errorMessage: null,
  loading: false,
  data: null,
  redirect: false,
};

function leaveApplicationReducer(state = initial, action) {
  switch (action.type) {
    case LEAVE_APPLICATION_FETCH_ATTEMPTED_SUCCESSED:
      return {
        redirect: false,
        errorMessage: null,
        loading: false,
        error: false,
        data: action.payload,
      };
    case LEAVE_APPLICATION_FETCH_ATTEMPTED_FAILED:
      return { ...state, error: true, loading: false };
    case LEAVE_APPLICATION_FETCH_ATTEMPTED:
      return { ...state, loading: true };

    case LEAVE_APPLICATION_SUBMIT_ATTEMPTED:
      return { ...state, loading: true };
    case LEAVE_APPLICATION_SUBMIT_ATTEMPTED_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        error: true,
        loading: false,
      };
    case LEAVE_APPLICATION_SUBMIT_ATTEMPTED_SUCCESSED:
      return {
        redirect: true,
        loading: false,
        error: false,
        errorMessage: null,
        data:
          state.data && state.data.length
            ? [...state.data, action.payload]
            : [action.payload],
      };
    case SET_REDIRECT_TO_DEFAULT:
      return { ...state, redirect: false };
    default:
      return state;
  }
}

export default leaveApplicationReducer;
