// event keys
import {
    ACCT_VALID,
    CHANGE_ACCT,
    LOAD_TABLE
} from '../actions/'
// services
import { checkArgs } from '../../services'
// table lists
import { tables } from '../actions/tables'
const lists = tables.lists
// state
const initialState = {
    accts: {},
    selectedAcct: ""
}
// acct factory
const initAcct = (list) => {
    let obj = {}
    list.map( (table) => obj[table] = [] )
    return obj
}
// action creators
export const changeSelect = (target) => {
    return {
        type: CHANGE_ACCT,
        selectedAcct: target
    }
}
const cacheTable = (accts, table, acct, data) => {
    if ( ! checkArgs(accts, table, acct, data) ) return
    let newObj = {}
    newObj[acct][table] = []
    newObj[acct][table].concat( [data] )
    return Object.assign( {}, accts, newObj )
}

// reducer
export const accts = (state = initialState, action) => {
    switch (action.type) {
        case ACCT_VALID:
            let accts, add = {}
            add[action.acct] = initAcct( lists.global.concat(lists.local) )
            accts = Object.assign({}, state.accts, add)
            return { ...state, accts: accts, selectedAcct: action.acct}
        case CHANGE_ACCT:
            return { ...state, selectedAcct: action.selectedAcct }
        case LOAD_TABLE:
            return { ...state, accts: cacheTable(action.accts, action.tableName, action.acct, action.table) }
        default:
            return state
    }
    return state
}