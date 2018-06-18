// socket server
import { socket } from '../socket'
// library
import { compose } from '../../services'
import {
    // redux actions
    SUBMIT_REQUEST,
    SELECT_TYPE,
    SELECT_TABLE,
    LOAD_TABLE,
    TABLE_NOT_CACHED,
    RENDER_TABLE,
    // socket events
    REQUEST_LIST,
    REQUEST_LOCAL,
    REQUEST_GLOBAL,
    LOAD_FAILURE,
    // action creators
    changeType,
    changeTable,
    restRequest,
    loadCache,
    checkCache_curry,
    // keys
    tables,
} from '../'
// state
const initialState = {
    type: 'compound',
    table: 'Conflicts',
    which: 'latest',
    message: '',
    messageClass: 'hidden'
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
                message: `requesting ${table} from ${acct}...`,
                messageClass: 'tableOptions_p tableOptions_p_loading'
            }
        case LOAD_TABLE:
            return {
                ...state,
                message: `Received RestAPI response, loading...`,
                messageClass: 'tableOptions_p tableOptions_p_loading'
            }
        case RENDER_TABLE:
            return {
                ...state,
                message: 'table loaded',
                messageClass: 'tableOptions_p tableOptions_p_render'
            }
        case LOAD_FAILURE:
            return { ...state,
                message: 'No table to load!',
                messageClass: 'tableOptions_p tableOptions_p_fail'
            }
        case TABLE_NOT_CACHED:
            return {
                ...state,
                message: 'Please load table to view',
                messageClass: 'tableOptions_p tableOptions_p_fail'
            }
        default:
            return state
    }
    return state
}
