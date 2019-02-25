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
