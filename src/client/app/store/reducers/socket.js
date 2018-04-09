// action keys
import {
    // redux actions
    ACCT_VALID,
    ACCT_INVALID,
    // socket events
    REQUEST_VALIDATE_CLIENT,
} from '../actions/'
// initial state
const initialState = {
    message: '',
}
// action creators
export const validateClient = (data) => {
    return {
        type: data.valid ? ACCT_VALID : ACCT_INVALID,
        acct: data.acct
    }
}
// reducer
export const socket = (state = initialState, action) => {
    switch (action.type) {
        case ACCT_VALID:
            return { ...state, message: `Acct # ${action.acct} found` }
        case ACCT_INVALID:
            return { ...state, message: `Acct # ${action.acct} not found in E:/ORDENTRY` }
        default:
            return state
    }
    return state
}
