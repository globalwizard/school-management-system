import {
  ATTENDENCE_FETCH_ATTEMPTED,
  ATTENDENCE_FETCH_ATTEMPTED_FAILED,
  ATTENDENCE_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/attendence";

const initial = {
  error: false,
  loading: false,
  data: null,
};

function attendenceReducer(state = initial, action) {
  switch (action.type) {
    case ATTENDENCE_FETCH_ATTEMPTED_SUCCESSED:
      return { loading: false, error: false, data: action.payload };
    case ATTENDENCE_FETCH_ATTEMPTED_FAILED:
      return { ...state, error: true, loading: false };
    case ATTENDENCE_FETCH_ATTEMPTED:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default attendenceReducer;
