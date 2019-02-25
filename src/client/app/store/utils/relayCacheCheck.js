import { checkCache } from '../';

import { confirmIsNonEmptyArray } from '../../services';

export const filterRows = (filter, row, column) => {
  if (row._original[column]) {
    return row._original[column]
      .toUpperCase()
      .includes(filter.value.toUpperCase());
  }
};

export const makeHeaders = table => filter =>
  Object.keys(table).map(column => {
    return {
      Header: column,
      accessor: column,
      id: column,
      filterAll: false,
      filterMethod: (fValue, row) => filter(fValue, row, column)
    };
  });

const relayCacheCheckDeps = {
  predicate: confirmIsNonEmptyArray,
  filter: filterRows,
  format: makeHeaders
};

export const relayCacheCheck = data => checkCache(data)(relayCacheCheckDeps);
