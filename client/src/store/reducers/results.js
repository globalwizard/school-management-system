import {
  RESULTS_FETCH_ATTEMPTED,
  RESULTS_FETCH_ATTEMPTED_FAILED,
  RESULTS_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/results";

const initial = {
  error: false,
  loading: false,
  data: null,
};

function resultsReducer(state = initial, action) {
  switch (action.type) {
    case RESULTS_FETCH_ATTEMPTED_SUCCESSED:
      return { loading: false, error: false, data: action.payload };
    case RESULTS_FETCH_ATTEMPTED_FAILED:
      return { ...state, error: true, loading: false };
    case RESULTS_FETCH_ATTEMPTED:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default resultsReducer;
