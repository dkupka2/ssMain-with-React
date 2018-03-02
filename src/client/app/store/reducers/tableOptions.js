import { socket } from '../socket'
// event keys
import {
    tables,
    // redux actions
    SUBMIT_REQUEST,
    SELECT_TYPE,
    SELECT_TABLE,
    LOAD_TABLE,
    // socket events
    REQUEST_LIST,
    REQUEST_LOCAL,
    REQUEST_GLOBAL,
    LOAD_FAILURE,
} from '../actions/'
// state
const initialState = {
    type: "compound",
    table: "Conflicts"
}
// maps
const defaultTable = {
    compound: "Conflicts",
    local: "Form",
    global: "Timed_Actions"
}

let typeKeys = {
    list: REQUEST_LIST,
    local: REQUEST_LOCAL,
    global: REQUEST_GLOBAL
}
// services
const callAPI = (acct, type, table) => {
    if (type !== "compound") {
        table = tables[type][table]
        socket.emit( typeKeys[type], {acct, table} )
    } else { // get tables by compound table
        for ( let type of Object.keys( tables.compound[table] ) ) {
            tables.compound[table][type].map((key) => {
                socket.emit( typeKeys[type], { acct, table: key } )
            })
        }
    }
}
// action creators
export const changeType = type => {
    return {
        type: SELECT_TYPE,
        value: type
    }
}
export const changeTable = table => {
    return {
        type: SELECT_TABLE,
        value: table
    }
}
export const loadTable = () => {
    return {
        type: LOAD_TABLE,
        value: state.table
    }
}
export const restRequest = (data) => {
    let { acct, type, table } = data
    callAPI(acct, type, table)
    return {
        acct, table, type: SUBMIT_REQUEST,
    }
}

export const restResponse = (data) => {
    return { type: data.data ? LOAD_TABLE : LOAD_FAILURE }
}

// reducer
export const tableOptions = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_TYPE: 
            return { ...state, type: action.value, table: defaultTable[action.value]  }
        case SELECT_TABLE: 
            return { ...state, table: action.value }
        case SUBMIT_REQUEST:
            return { ...state, message: `requesting ${action.table} from ${action.acct}, please wait...` }
        case LOAD_TABLE:
            return { ...state, message: `received response from RestAPI, loading table...` }
        case LOAD_FAILURE:
            return { ...state, message: 'LOAD_TABLE action creator called without data, no table to load!'}
        default:
            return state
    }
    return state
}