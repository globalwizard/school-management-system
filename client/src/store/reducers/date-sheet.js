import {
  DATE_SHEET_FETCH_ATTEMPTED,
  DATE_SHEET_FETCH_ATTEMPTED_FAILED,
  DATE_SHEET_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/date-sheet";

const initial = {
  error: false,
  loading: false,
  data: null,
};

function dateSheetReducer(state = initial, action) {
  switch (action.type) {
    case DATE_SHEET_FETCH_ATTEMPTED_SUCCESSED:
      return { loading: false, error: false, data: action.payload };
    case DATE_SHEET_FETCH_ATTEMPTED_FAILED:
      return { ...state, error: true, loading: false };
    case DATE_SHEET_FETCH_ATTEMPTED:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default dateSheetReducer;
