import { TABLE_NOT_CACHED, RENDER_TABLE } from '../';

import { confirmIsNonEmptyArray } from '../../services';

// filters table data in table data componen
export const filterRows = (filter, row, column) => {
  if (row._original[column]) {
    return row._original[column]
      .toUpperCase()
      .includes(filter.value.toUpperCase());
  }
};

// derives format for table data from first entry in table data
export const structureDataTable = table => filter =>
  Object.keys(table).map(column => {
    return {
      Header: column,
      accessor: column,
      id: column,
      filterAll: false,
      filterMethod: (fValue, row) => filter(fValue, row, column)
    };
  });

const formatTableDeps = {
  predicate: confirmIsNonEmptyArray,
  filter: filterRows,
  format: structureDataTable
};

export const formatTableFromCache = data => dependencies => {
  const { acct, accts, view } = data;
  const { predicate, filter, format } = dependencies;
  if (!predicate(data.body)) return { type: TABLE_NOT_CACHED };
  return {
    type: RENDER_TABLE,
    columns: format(data.body[0])(filter),
    table: data.body,
    acct,
    accts,
    view
  };
};

// pipes data from redux store
export const pipeDataToFormatTable = data =>
  formatTableFromCache(data)(formatTableDeps);
