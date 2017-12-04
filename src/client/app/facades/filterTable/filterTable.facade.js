import convert from './convert'
import fTable from './fTable'

export default filterTable = (table, data, type) => data.map( (row) => fTable[table].getFiltered(row, type))