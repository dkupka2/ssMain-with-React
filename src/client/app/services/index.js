export { selectOptions } from './selectOptions'
export { validateInput } from './validateInput'
export { checkArgs } from './checkArgs'

import filterPiTable from './filterPiTable'
export const filterTable = (table, data, type) => data.map( (row) => filterPiTable[table].getFiltered(row, type))
