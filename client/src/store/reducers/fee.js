import {
  FEE_FETCH_ATTEMPTED,
  FEE_FETCH_ATTEMPTED_FAILED,
  FEE_FETCH_ATTEMPTED_SUCCESSED,
} from "../constants/fee";

const initial = {
  error: false,
  loading: false,
  data: null,
};

function feeReducer(state = initial, action) {
  switch (action.type) {
    case FEE_FETCH_ATTEMPTED_SUCCESSED:
      return { loading: false, error: false, data: action.payload };
    case FEE_FETCH_ATTEMPTED_FAILED:
      return { ...state, error: true, loading: false };
    case FEE_FETCH_ATTEMPTED:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default feeReducer;
