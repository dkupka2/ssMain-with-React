import filterPiTable from './filterPiTable'

export const filterTable = (table, data, type) => {
    return data.map( (row) => {
        let result = filterPiTable[table].getFiltered(row, type)
        return result
    })
}
