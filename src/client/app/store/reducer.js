import { combineReducers } from 'redux';

import { acctInput, accts, dataTable, socket, tableOptions } from './';

export const reducer = combineReducers({
  acctInput,
  accts,
  dataTable,
  socket,
  tableOptions
});
