import filterPiTable from '../'

export const filterTable = (table, data, viewTable) => {
    return data.map( (row) => {
        let result = filterPiTable(table)(viewTable)(row)
        return result
    })
}
