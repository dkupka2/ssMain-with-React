export { selectOptions } from './selectOptions'
export { validateInput } from './validateInput'
export { checkArgs } from './checkArgs'
export { getKeys } from './getKeys'

import filterPiTable from './filterPiTable'
export const filterTable = (table, data, type) => data.map( (row) => filterPiTable[table].getFiltered(row, type))
