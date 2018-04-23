import { isTrue } from './isTrue'
import { isObject } from './isObject'
import filterPiTable from './filterPiTable'

export { getKeys } from './getKeys'
export { checkArgs } from './checkArgs'
export { selectOptions } from './selectOptions'
export { validateInput } from './validateInput'
export { getLast } from './getLast'
export { compose } from './compose'
export { isTrue } from './isTrue'

// if arg1 than arg2 else hidden
export const isVisible = (x, sel) => isTrue(x, sel, 'hidden')
// if arg1 than arg 2 else if arg3 than arg4 else hidden
export const blockSelector = (c1, res1, c2, res2) => {
    return isTrue( c2, res2, isVisible(c1, res1) )
}

export const isObj = obj => isTrue(isObject(obj) === 'object' )

export const isArr = obj => Array.isArray(obj)

export const isEmptyObject = obj => {
    if ( isObj(obj) && Object.keys(obj) > 0 ) return false
    return true
}

export const cleanArr = arr => {
    let final = []
    for (let el of arr) {
        if ( el !== undefined ) final.push(el)
    }
    return final
}

export const filterTable = (table, data, type) => {
    return data.map( row => {
        let result = filterPiTable[table].getFiltered(row, type)
        return result
    })
}
