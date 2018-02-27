// event keys
import {
    ACCT_VALID,
    CHANGE_ACCT
} from '../actions/'
// table lists
import { lists } from '../actions/tables'
// state
const initialState = {
    accts: {},
    selectedAcct: ""
}
// acct factory
const initAcct = (list) => {
    let obj = {}
    for (let table of list) {
        obj[table] = []
    }
    return obj
}
// action creators
export const changeSelect = (target) => {
    return {
        type: CHANGE_ACCT,
        selectedAcct: target
    }
}
// reducer
export const accts = (state = initialState, action) => {
    switch (action.type) {
        case ACCT_VALID:
            let accts, add = {}
            add[action.acct] = initAcct(lists.global.concat(lists.local))
            accts = Object.assign({}, state.accts, add)
            return { ...state, accts: accts, selectedAcct: action.acct}
        case CHANGE_ACCT:
            return { ...state, selectedAcct: action.selectedAcct }
        default:
            return state
    }
    return state
}