// action keys
import {
  tables,
  // utils
  initAcct,
  // redux events
  ACCT_VALID,
  CHANGE_ACCT,
  CACHE_TABLE
} from '../';
const lists = tables.lists;
// state
const initialState = {
  accts: {},
  selectedAcct: ''
};
// reducer
export const accts = (state = initialState, action) => {
  switch (action.type) {
    case ACCT_VALID:
      let accts,
        add = {};
      add[action.acct] = initAcct(lists.global.concat(lists.local));
      accts = { ...state.accts, ...add };
      return {
        ...state,
        accts: accts,
        selectedAcct: action.acct
      };
    case CHANGE_ACCT:
      return {
        ...state,
        selectedAcct: action.selectedAcct
      };
    case CACHE_TABLE:
      return { ...state, accts: action.accts };
    default:
      return state;
  }
  return state;
};
