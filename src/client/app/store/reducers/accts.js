// library
import { checkArgs } from '../../services'
// action creators - parrallel
import {
    loadCache,
    renderFromCache
} from './index'
// action keys
import {
    tables,
    // redux events
    ACCT_VALID,
    CHANGE_ACCT,
    CACHE_TABLE
} from '../actions/'
const lists = tables.lists
// state
const initialState = {
    accts: {},
    selectedAcct: ''
}
// acct factory
const initAcct = list => {
    let obj = {}
    list.map( (table) => obj[table] = [] )
    return obj
}
// action creators - local
export const changeSelect = target => {``
    return {
        type: CHANGE_ACCT,
        selectedAcct: target
    }
}
export const cacheTable = payload => {
    let { accts, acct, table, data, from } = payload
    accts = Object.assign( {}, accts )
    accts[acct][table] = accts[acct][table].concat(
        [data]
    )
    return { type: CACHE_TABLE, accts: accts }
}
export const restRes = payload => {
    return dispatch => {
        dispatch( cacheTable(payload) )
        dispatch( renderFromCache(payload) )
    }
}
// reducer
export const accts = (state = initialState, action) => {
    switch (action.type) {
        case ACCT_VALID:
            let accts, add = {}
            add[action.acct] = initAcct(
                lists.global.concat(lists.local)
            )
            accts = Object.assign( {}, state.accts, add )
            return { 
                ...state,
                accts: accts,
                selectedAcct: action.acct
            }
        case CHANGE_ACCT:
            return {
                ...state,
                selectedAcct: action.selectedAcct
            }
        case CACHE_TABLE:
            return { ...state, accts: action.accts }
        default:
            return state
    }
    return state
}
