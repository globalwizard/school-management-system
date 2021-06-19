import {
  LESSONS_FETCH_ATTEMPTED,
  LESSONS_FETCH_ATTEMPTED_FAILED,
  LESSONS_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/lessons";

const initial = {
  error: false,
  loading: false,
  data: null,
};

function lessonsReducer(state = initial, action) {
  switch (action.type) {
    case LESSONS_FETCH_ATTEMPTED_SUCCESSED:
      return { loading: false, error: false, data: action.payload };
    case LESSONS_FETCH_ATTEMPTED_FAILED:
      return { ...state, error: true, loading: false };
    case LESSONS_FETCH_ATTEMPTED:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default lessonsReducer;
