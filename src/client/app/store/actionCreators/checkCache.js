import {
    TABLE_NOT_CACHED,
    RENDER_TABLE
} from '../'

export const checkCache = data => makeHeaders => filterRows => {
    if (data.body.length < 1) return {type: TABLE_NOT_CACHED}
    // return table data with headers created from the first entry
    return {
        type: RENDER_TABLE,
        columns: makeHeaders( data.body[0] )(filterRows),
        table: data.body,
    }
}
