import { isArrayWithEls } from '../'

export const getLastArray = arr => isArrayWithEls(arr) ?
        arr[arr.length-1] :
        []
