import getHeaders from '../'
import {
    TABLE_NOT_CACHED,
    RENDER_TABLE
} from '../'

export const checkCacheForTable = data => getHeaders => {
    if (data.body.length < 1) return {type: TABLE_NOT_CACHED}
    // return table data with headers created from the first entry
    return {
        type: RENDER_TABLE,
        columns: getHeaders( data.body[0] ),
        table: data.body,
    }
}

export const renderTable = data =>
    checkCacheForTable(data)(getHeaders)
