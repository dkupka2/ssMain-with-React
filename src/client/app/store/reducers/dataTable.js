import { filterTable } from '../../services'
import { tables } from '../actions'
// event keys
import {
    // redux actions
    LOAD_TABLE,
    RENDER_TABLE,
    TABLE_NOT_CACHED,
} from '../actions/'
//services
import {
    getLast
} from '../../services'
// state
const initialState = {
    tableData: [],
    columns: []
}
let getHeaders = ( obj, headers = [] ) => {
    Object.keys(obj).map( (header) => headers.push( {Header: header, accessor: header} ) )
    return headers
}
// action creators
export const renderTable = data => {
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
        arr.concat( filterTable(targetTable, getLast( accts[acct][targetTable] ), table) )
    })
    data.body = arr
    data.cached = true
    if (arr.length < 1) return {type: TABLE_NOT_CACHED}
    return renderTable(data)
}

export const loadCache = data => {
    let { type, acct, table, accts } = data
    if (type === "compound") return loadCompoundFromCache(data)
    if (accts[acct][table].length > 0) {
        data.body = getLast( accts[acct][table] )
        data.cached = true
        return renderTable(data)
    } else {
        return {type: TABLE_NOT_CACHED}
    }
}
// reducer
export const dataTable = (state = initialState, action) => {
    let warning
    switch (action.type) {
        case RENDER_TABLE:
            warning = action.cached ? 'table loaded from cache, load table for current account state' : ''
            return { ...state, tableData: action.table, columns: action.columns, visible: true, message: warning }
        case TABLE_NOT_CACHED:
            return { ...state, visible: false}
        default:
            return state
    }
    return state
}
