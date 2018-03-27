// library
import {
    getLast,
    filterTable
} from '../../services'
// action keys
import { tables } from '../actions'
// action keys
import {
    // redux actions
    LOAD_TABLE,
    RENDER_TABLE,
    TABLE_NOT_CACHED,
} from '../actions/'
// state
const initialState = {
    tableData: [],
    columns: []
}
let getHeaders = ( obj, headers = [] ) => {
    Object.keys(obj).map( 
        (header) => headers.push({
            Header: header,
            accessor: header
        })
    )
    return headers
}
// action creators
export const renderTable = data => {
    if (data.body.length < 1) {
        return {type: TABLE_NOT_CACHED}
    }
    return {
        type: RENDER_TABLE,
        columns: getHeaders( data.body[0] ),
        table: data.body,
    }
}
const loadCompoundFromCache = data => {
    let arr = [],
        { type, acct, table, accts } = data
    // map over tables list
    tables.compoundLists[table].map( targetTable => {
        // filter and concat most recent cache
        arr.concat(
            filterTable(
                targetTable,
                getLast( accts[acct][targetTable] ),
                table
            )
        )
    })
    data.body = arr
    return data
}
export const loadCache = data => {
    let { type, acct, table, accts } = data
    if (type === 'compound') return loadCompoundFromCache(data)
    if (accts[acct][table].length > 0) {
        data.body = getLast( accts[acct][table] )
        data.isCached = true
    } else {
        data.body = []
    }
    return data
}
// reducer
export const dataTable = (state = initialState, action) => {
    let warning
    switch (action.type) {
        case RENDER_TABLE:
            warning = action.isCached ?
                'table from cache, re-load for newest version' : ''
            return {
                ...state,
                tableData: action.table,
                columns: action.columns,
                visible: true,
                message: warning
            }
        case TABLE_NOT_CACHED:
            return { ...state, visible: false}
        default:
            return state
    }
    return state
}
