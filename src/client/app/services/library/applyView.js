import filterPiTable from '../'

export const applyView = table => data => viewTable =>
    data.map( (row) => filterPiTable(table)(viewTable)(row) )
