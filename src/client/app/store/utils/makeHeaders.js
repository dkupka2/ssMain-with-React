import filterRows from "../";

export const makeHeaders = tableStructure => filterRows => {
  let headers = [];
  Object.keys(tableStructure).map(column =>
    headers.push({
      Header: column,
      accessor: column,
      id: column,
      filterAll: false,
      filterMethod: (fValue, row) => filterRows(fValue, row, column)
    })
  );
  return headers;
};
