import fTable from './fTable'

const filterTable = (table, data, type) => data.map( (row) => fTable[table].getFiltered(row, type))

export default filterTable