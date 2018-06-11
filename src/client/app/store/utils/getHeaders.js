import filterRows from '../'

export const makeHeaders = tableStructure => (filterRows) => {
    let headers = []
    Object.keys(tableStructure).map( (header) =>
        headers.push( {
            Header: header,
            accessor: header,
            id: header,
            filterAll: false,
            filterMethod: (filter, row) =>
                filterRows(filter, row, header)
        })
    )
    return headers
}

export const getHeaders = (tableStructure) =>
    makeHeaders(tableStructure)(filterRows)
