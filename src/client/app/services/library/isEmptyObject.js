import { isObj } from './isObj'

export const isEmptyObject = obj => {
    if ( isObj(obj) && Object.keys(obj) > 0 ) return false
    return true
}
