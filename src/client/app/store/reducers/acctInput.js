// action keys
import {
  // redux actions
  SUBMIT_ACCT_INPUT,
  ACCT_VALID,
  ACCT_INVALID
} from '../';
// initial state
const initialState = {
  message: '',
  status: 'hidden'
};
// reducer
export const acctInput = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_ACCT_INPUT:
      return {
        ...state,
        message: `checking for Acct ${action.value}...`,
        status: 'looking'
      };
    case ACCT_VALID:
      return {
        ...state,
        message: `Acct ${action.acct} found`,
        status: 'valid'
      };
    case ACCT_INVALID:
      return {
        ...state,
        message: `Acct ${action.acct} not found`,
        status: 'invalid'
      };
    default:
      return state;
  }
};
