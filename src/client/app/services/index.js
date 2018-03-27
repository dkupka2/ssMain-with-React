export { getKeys } from './getKeys'
export { checkArgs } from './checkArgs'
export { selectOptions } from './selectOptions'
export { validateInput } from './validateInput'
export { getLast } from './getLast'
export { compose } from './compose'

export { isTrue } from './isTrue'
import { isTrue } from './isTrue'
export const isVisible = (x, sel) => isTrue(x, sel, 'hidden')

import filterPiTable from './filterPiTable'
export const filterTable = (table, data, type) => {
    return data.map( row => filterPiTable[table].getFiltered(row, type) )
}
