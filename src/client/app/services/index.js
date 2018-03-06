export { getKeys } from './getKeys'
export { checkArgs } from './checkArgs'
export { selectOptions } from './selectOptions'
export { validateInput } from './validateInput'

import filterPiTable from './filterPiTable'
export const filterTable = (table, data, type) => data.map( row => filterPiTable[table].getFiltered(row, type) )
