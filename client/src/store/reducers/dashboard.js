import {
  DASHBOARD_DATA_FETCH_ATTEMPTED,
  DASHBOARD_DATA_FETCH_ATTEMPTED_FAILED,
  DASHBOARD_DATA_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/dashboard";

const initial = {
  error: false,
  loading: false,
  data: null,
};

function dashboardReducer(state = initial, action) {
  switch (action.type) {
    case DASHBOARD_DATA_FETCH_ATTEMPTED_SUCCESSED:
      return { loading: false, error: false, data: action.payload };
    case DASHBOARD_DATA_FETCH_ATTEMPTED_FAILED:
      return { ...state, error: true, loading: false };
    case DASHBOARD_DATA_FETCH_ATTEMPTED:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default dashboardReducer;
