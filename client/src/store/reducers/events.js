import {
  EVENTS_FETCH_ATTEMPTED,
  EVENTS_FETCH_ATTEMPTED_FAILED,
  EVENTS_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/events";

const initial = {
  error: false,
  loading: false,
  data: null,
};

function eventsReducer(state = initial, action) {
  switch (action.type) {
    case EVENTS_FETCH_ATTEMPTED_SUCCESSED:
      return { loading: false, error: false, data: action.payload };
    case EVENTS_FETCH_ATTEMPTED_FAILED:
      return { ...state, error: true, loading: false };
    case EVENTS_FETCH_ATTEMPTED:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default eventsReducer;
