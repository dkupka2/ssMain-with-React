import { socket } from '../socket'
// event keys
import {
    tables,
    // redux actions
    SELECT_TYPE,
    SELECT_TABLE,
    LOAD_TABLE,
    // socket events
    REQUEST_LIST,
    REQUEST_LOCAL,
    REQUEST_GLOBAL,
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
        // socket.emit( typeKeys[type], {acct, table} )
        alert(`acct: ${acct} table: ${table}`)
    } else { // get tables by compound table
        for ( let type of Object.keys( tables.compound[table] ) ) {
            tables.compound[table][type].map((key) => {
                // socket.emit( typeKeys[type], { acct, table: key } )
                alert(`acct: ${acct} table: ${key}`)
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
export const restRequest = (acct, type, table) => {
    callAPI(acct, type, table)
    return {}
}

// reducer
export const tableOptions = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_TYPE: 
            return { ...state, type: action.value, table: defaultTable[action.value]  }
        case SELECT_TABLE: 
            return { ...state, table: action.value }
        case LOAD_TABLE:
            return { ...state}
        default:
            return state
    }
    return state
}