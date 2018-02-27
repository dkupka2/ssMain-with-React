import React from 'react'

const initialState = {
    accts: {},
    selectedAcct: ""
}

import {
    ACCT_VALID,
    ADD_ACCT,
    CHANGE_ACCT
} from '../actions/'

export const addAcct = (accts, newAcct) => {
    console.log("before add: ", accts)
    let add = {}
    add[newAcct] = []
    console.log("add: ", add)
    accts = Object.assign({}, accts, add)
    return {
        type: ADD_ACCT,
        accts: accts,
        selectedAcct: newAcct
    }
}

export const changeSelect = (target) => {
    return {
        type: CHANGE_ACCT,
        selectedAcct: target
    }
}

export const accts = (state = initialState, action) => {
    switch (action.type) {
        case ACCT_VALID:
            console.log("state: ", state.accts)
            return addAcct(state.accts, action.acct)
        case ADD_ACCT:
            return { ...state, accts: action.accts, selectedAcct: action.selectedAcct}
        case CHANGE_ACCT:
            return { ...state, selectedAcct: action.selectedAcct }
        default:
            return state
    }
    return state
}