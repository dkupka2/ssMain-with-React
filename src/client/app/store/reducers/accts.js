import React from 'react'

const initialState = {
    accts: {},
    selectedAcct: ""
}

import {
    ACCT_VALID,
    CHANGE_ACCT
} from '../actions/'

export const addAcct = (accts, newAcct) => {
    let add = {}
    add[newAcct] = []
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
            return {...state, accts: action.accts, selectedAcct: action.selectedAcct}
        case CHANGE_ACCT:
            return { ...state, selectValue: action.selectedAcct }
        default:
            return state
    }
    return state
}