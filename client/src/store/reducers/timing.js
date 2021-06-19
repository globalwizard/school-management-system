import {
  TIMING_FETCH_ATTEMPTED_SUCCESSED,
  TIMING_FETCH_ATTEMPTED,
  TIMING_FETCH_ATTEMPTED_FAILED,
} from "../constants/timing";

const initial = {
  error: false,
  loading: false,
  data: null,
};

function timingReducer(state = initial, action) {
  switch (action.type) {
    case TIMING_FETCH_ATTEMPTED_SUCCESSED:
      return { loading: false, error: false, data: action.payload };
    case TIMING_FETCH_ATTEMPTED_FAILED:
      return { ...state, error: true, loading: false };
    case TIMING_FETCH_ATTEMPTED:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default timingReducer;
