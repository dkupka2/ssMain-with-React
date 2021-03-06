import {
  // redux actions
  SUBMIT_REQUEST,
  SELECT_TYPE,
  SELECT_TABLE,
  LOAD_TABLE,
  TABLE_NOT_CACHED,
  RENDER_TABLE,
  // socket events
  LOAD_FAILURE,
  REST_ERROR
} from '../';
// state
const initialState = {
  type: 'constructed',
  table: 'Conflicts',
  which: 'latest',
  message: '',
  status: 'hidden'
};
// reducer
export const tableOptions = (state = initialState, action) => {
  const { type, value, table, acct, tableType } = action;
  switch (type) {
    case SELECT_TYPE:
      return { ...state, type: tableType, table: table };
    case SELECT_TABLE:
      return { ...state, table: value };
    case SUBMIT_REQUEST:
      return {
        ...state,
        message: `requesting ${table} from ${acct}...`,
        status: 'loading'
      };
    case LOAD_TABLE:
      return {
        ...state,
        message: `Received RestAPI response, loading...`,
        status: 'loading'
      };
    case RENDER_TABLE:
      return {
        ...state,
        message: 'table loaded',
        status: 'success'
      };
    case LOAD_FAILURE:
      return {
        ...state,
        message: 'No table to load!',
        status: 'fail'
      };
    case TABLE_NOT_CACHED:
      return {
        ...state,
        message: 'Please load table to view',
        status: 'fail'
      };
    case REST_ERROR:
      return {
        ...state,
        message: `${value} - see console for info`,
        status: 'fail'
      };
    default:
      return state;
  }
};
