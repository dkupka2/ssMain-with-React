import { dispatcher, socket } from '../socket'
// action keys
import {
    SUBMIT_ACCT_INPUT,
    ACCT_VALID,
    ACCT_INVALID,
    // socket event keys
    REQUEST_VALIDATE_CLIENT,
} from '../actions/'
// initial state
const initialState = {
    message: "",
}
// action creators
export const submitAcct = (val) => {
    return {
        type: SUBMIT_ACCT_INPUT,
        value: val
    }
}
export const validateClient = (data) => {
    console.log(data)
    return {
        type: data.valid ? ACCT_VALID : ACCT_INVALID,
        acct: data.acct
    }
}
// reducer
export const acctInput = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_ACCT_INPUT:
            socket.emit(REQUEST_VALIDATE_CLIENT, {acct: action.value})
            return { ...state, message: `checking E:/ORDENTRY/ for Acct # ${action.value}...` }
        case ACCT_VALID:
            return { ...state, message: `Acct # ${action.acct} found` }
        case ACCT_INVALID:
            return { ...state, message: `Acct # ${action.acct} not found in E:/ORDENTRY` }
        default:
            return state
    }
    return state
}