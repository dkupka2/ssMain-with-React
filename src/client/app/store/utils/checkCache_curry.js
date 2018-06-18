import {
    checkCache,
    filterRows,
    makeHeaders,
} from '../'

export const checkCache_curry = data =>
    checkCache(data)(makeHeaders)(filterRows)
