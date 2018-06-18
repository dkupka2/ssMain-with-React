import filterRows from '../'

export const makeHeaders = tableStructure => filterRows => {
    let headers = []
    Object.keys(tableStructure).map( (column) =>
        headers.push( {
            Header: column,
            accessor: column,
            id: column,
            filterAll: false,
            filterMethod: (filter, row) =>
                filterRows(filter, row, column)
        })
    )
    return headers
}
