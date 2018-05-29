import { isObj } from '../'

export const isEmptyObject = obj => {
    if ( isObj(obj) && Object.keys(obj).length === 0 ) return true
    return false
}
