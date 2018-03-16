// event keys
import {
    tables,
    // redux events
    ACCT_VALID,
    CHANGE_ACCT,
    LOAD_TABLE
} from '../actions/'
const lists = tables.lists
// services
import { checkArgs } from '../../services'
// state
const initialState = {
    accts: {},
    selectedAcct: ""
}
// acct factory
const initAcct = list => {
    let obj = {}
    list.map( (table) => obj[table] = [] )
    return obj
}
// action creators
export const changeSelect = target => {
    return {
        type: CHANGE_ACCT,
        selectedAcct: target
    }
}
// local services
const cacheTable = (accts, table, acct, data) => {
    accts = Object.assign( {}, accts )
    accts[acct][table] = accts[acct][table].concat( [data] )
    return accts
}
// reducer
export const accts = (state = initialState, action) => {
    switch (action.type) {
        case ACCT_VALID:
            let accts, add = {}
            add[action.acct] = initAcct( lists.global.concat(lists.local) )
            accts = Object.assign( {}, state.accts, add )
            return { ...state, accts: accts, selectedAcct: action.acct}
        case CHANGE_ACCT:
            return { ...state, selectedAcct: action.selectedAcct }
        case LOAD_TABLE:
            return { ...state, accts: cacheTable(action.data.accts, action.data.tableName, action.data.acct, JSON.parse(action.data.table) ) }
        default:
            return state
    }
    return state
}
