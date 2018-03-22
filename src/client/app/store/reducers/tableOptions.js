import { socket } from '../socket'
// event keys
import {
    tables,
    // redux actions
    SUBMIT_REQUEST,
    SELECT_TYPE,
    SELECT_TABLE,
    LOAD_TABLE,
    TABLE_NOT_CACHED,
    // socket events
    REQUEST_LIST,
    REQUEST_LOCAL,
    REQUEST_GLOBAL,
    LOAD_FAILURE,
} from '../actions/'
import {
    compose
} from '../../services'
import {
    loadCache,
    renderTable
} from './dataTable'
export const renderFromCache = data => {
    return compose(loadCache, renderTable, data)
}
// state
const initialState = {
    type: "compound",
    table: "Conflicts",
    which: "latest"
}
// services
const callAPI = (acct, type, table) => {
    if (type !== "compound") {
        table = tables[type][table]
        socket.emit( tables.requestKeys[type], {acct, table} )
    } else { // get tables by compound table
        for ( let type of Object.keys( tables.compound[table] ) ) {
            tables.compound[table][type].map((key) => {
                socket.emit(
                    tables.requestKeys[type], { 
                        acct,
                        table: key
                    }
                )
            })
        }
    }
}
// action creators
export const changeType = data => {
    return dispatch => {
        dispatch( renderFromCache(data) )
        dispatch({
            type: SELECT_TYPE,
            tableType: data.type,
            table: data.table
        })
    }
}
export const changeTable = data => {
    return dispatch => {
        dispatch( renderFromCache(data) )
        dispatch({
            type: SELECT_TABLE,
            value: data.table
        })
    }
}
export const restRequest = data => {
    let { acct, type, table } = data
    callAPI(acct, type, table)
    return {
        type: SUBMIT_REQUEST,
        acct, table,
    }
}
export const restResponse = data => {
    let {
        acct,
        accts,
        isCompound,
        table: tableName,
        body: table,
    } = data
    return { 
        type: LOAD_TABLE,
        data: { accts, acct, tableName, table, isCompound }
    }
}
// reducer
export const tableOptions = (state = initialState, action) => {
    let { type, value, table, acct, tableType } = action
    switch (type) {
        case SELECT_TYPE:
            return {  ...state, type: tableType, table: table }
        case SELECT_TABLE:
            return { ...state, table: value }
        case SUBMIT_REQUEST:
            return { 
                ...state,
                message: `requesting ${table} from ${acct}, please wait...`
            }
        case LOAD_TABLE:
            return {
                ...state,
                message: `Received response from RestAPI, loading table...`
            }
        case LOAD_FAILURE:
            return { ...state,
                message: 'No table to load!'}
        case TABLE_NOT_CACHED:
            return { ...state, message: 'Please load table to view'}
        default:
            return state
    }
    return state
}
