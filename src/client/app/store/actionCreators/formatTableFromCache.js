import { TABLE_NOT_CACHED, RENDER_TABLE } from '../';

import { confirmIsNonEmptyArray } from '../../services';

// filters table data in table data componen
export const filterRows = (filter, row, column) => {
  const colValue = row._original[column]
  if (colValue) {
    if (filter.value.includes("[")) {
      if (filter.value.includes("[AND]")) {
        return filter.value.split("[AND]")[0].toUpperCase().trim() === '' || filter.value.split("[AND]")[1].toUpperCase().trim() === '' ? false :
        colValue.toUpperCase().includes(filter.value.split("[AND]")[0].toUpperCase().trim())
          &&   colValue.toUpperCase().includes(filter.value.split("[AND]")[1].toUpperCase().trim())
      }  else if (filter.value.includes("[OR]")) {
        return colValue.toUpperCase().includes(filter.value.split("[OR]")[0].toUpperCase().trim()) 
          ||   colValue.toUpperCase().includes(filter.value.split("[OR]")[1].toUpperCase().trim()) 
      } else {
        return undefined
      }
    } else {
      return colValue
      .toUpperCase()
      .includes(filter.value.toUpperCase());
    }
  } else {
    return colValue === undefined ? undefined : false
  
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
