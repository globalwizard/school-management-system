import {
  SUBJECTS_FETCH_ATTEMPTED,
  SUBJECTS_FETCH_ATTEMPTED_FAILED,
  SUBJECTS_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/subjects";

const initial = {
  error: false,
  loading: false,
  data: null,
};

function subjectsReducer(state = initial, action) {
  switch (action.type) {
    case SUBJECTS_FETCH_ATTEMPTED_SUCCESSED:
      return { loading: false, error: false, data: action.payload };
    case SUBJECTS_FETCH_ATTEMPTED_FAILED:
      return { ...state, error: true, loading: false };
    case SUBJECTS_FETCH_ATTEMPTED:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default subjectsReducer;
