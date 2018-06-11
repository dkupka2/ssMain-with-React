import { socket } from '../socket'
// action keys
import {
    // redux actions
    SUBMIT_ACCT_INPUT,
    ACCT_VALID,
    ACCT_INVALID,
    // socket events
    REQUEST_VALIDATE_CLIENT,
} from '../'
// initial state
const initialState = {
    message: '',
    messageClass: 'hidden'
}
// reducer
export const acctInput = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_ACCT_INPUT:
            return {
                ...state,
                message: `checking for Acct ${action.value}...`,
                messageClass: 'acctInput_p acctInput_p_looking'
            }
        case ACCT_VALID:
            return {
                ...state,
                message: `Acct ${action.acct} found`,
                messageClass: 'acctInput_p acctInput_p_valid'
            }
        case ACCT_INVALID:
            return {
                ...state,
                message: `Acct ${action.acct} not found`,
                messageClass: 'acctInput_p acctInput_p_invalid'
            }
        default:
            return state
    }
    return state
}
