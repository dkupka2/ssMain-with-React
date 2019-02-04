// action keys
import {
  // redux actions
  ACCT_VALID,
  ACCT_INVALID,
} from "../";
// initial state
const initialState = {
  message: ""
};
// reducer
export const socket = (state = initialState, action) => {
  switch (action.type) {
    case ACCT_VALID:
      return { ...state, message: `Acct # ${action.acct} found` };
    case ACCT_INVALID:
      return {
        ...state,
        message: `Acct # ${action.acct} not found in E:/ORDENTRY`
      };
    default:
      return state;
  }
};
