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
    let tableData = filterTable( data.table, JSON.parse(data.body) )
    return {
        type: RENDER_TABLE,
        columns: getHeaders( tableData[0] ),
        table: tableData,
    }
}
export const loadCache = data => {
    let arr,
        { type, acct, table, accts } = data
    console.log(data)
    if ( type !== "compound" && accts[acct][table].length > 0) {
        data.body = getLast( accts[acct][table] )
        return renderTable(data)
    } else {
        return {
            type: TABLE_NOT_CACHED
        }
    }
}
// reducer
export const dataTable = (state = initialState, action) => {
    switch (action.type) {
        case RENDER_TABLE:
            return { ...state, tableData: action.table, columns: action.columns, visible: true }
        case TABLE_NOT_CACHED:
            return { ...state, visible: false}
        default:
            return state
    }
    return state
}
