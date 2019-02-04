export const makeHeaders = tableStructure => filterRows =>
  Object.keys(tableStructure).map(column => {
    return {
      Header: column,
      accessor: column,
      id: column,
      filterAll: false,
      filterMethod: (fValue, row) => filterRows(fValue, row, column)
    };
  });
