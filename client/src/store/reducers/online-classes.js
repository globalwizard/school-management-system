import {
  ONLINE_CLASSES_FETCH_ATTEMPTED,
  ONLINE_CLASSES_FETCH_ATTEMPTED_FAILED,
  ONLINE_CLASSES_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/online-classes";

const initial = {
  error: false,
  loading: false,
  data: null,
};

function onlineClassesReducer(state = initial, action) {
  switch (action.type) {
    case ONLINE_CLASSES_FETCH_ATTEMPTED_SUCCESSED:
      return { loading: false, error: false, data: action.payload };
    case ONLINE_CLASSES_FETCH_ATTEMPTED_FAILED:
      return { ...state, error: true, loading: false };
    case ONLINE_CLASSES_FETCH_ATTEMPTED:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default onlineClassesReducer;
