import { isTrue } from './isTrue'
import { isArrOrObj } from './isArrOrObj'
import filterPiTable from './filterPiTable'

export { getKeys } from './getKeys'
export { checkArgs } from './checkArgs'
export { selectOptions } from './selectOptions'
export { validateInput } from './validateInput'
export { getLast } from './getLast'
export { compose } from './compose'
export { isTrue } from './isTrue'

export const isVisible = (x, sel) => isTrue(x, sel, 'hidden')

export const isObj = obj => isTrue(isArrOrObj(obj) === 'object')

export const isArr = obj => isTrue(isArrOrObj(obj) === 'array')

export const isEmptyObject = obj => {
    if ( isObj(obj) && Object.keys(obj) > 0 ) return false
    return true
}

export const filterTable = (table, data, type) => {
    return data.map( row => {
        let result = filterPiTable[table].getFiltered(row, type)
        if ( isEmptyObject(result) ) return result
    })
}
