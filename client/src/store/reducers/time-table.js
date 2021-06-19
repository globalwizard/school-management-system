import {
  TIME_TABLE_FETCH_ATTEMPTED,
  TIME_TABLE_FETCH_ATTEMPTED_FAILED,
  TIME_TABLE_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/time-table";

const initial = {
  error: false,
  loading: false,
  data: null,
};

function timeTableReducer(state = initial, action) {
  switch (action.type) {
    case TIME_TABLE_FETCH_ATTEMPTED_SUCCESSED:
      return { loading: false, error: false, data: action.payload };
    case TIME_TABLE_FETCH_ATTEMPTED_FAILED:
      return { ...state, error: true, loading: false };
    case TIME_TABLE_FETCH_ATTEMPTED:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default timeTableReducer;
