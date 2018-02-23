import { 
    SUBMIT_ACCT_INPUT
} from '../actions/'
// initial state
const initialState = {
    submitted: "",
}
// action creator
export const submitAcct = (val) => {
    console.log(`account submitted: ${val}`)
    return {
        type: SUBMIT_ACCT_INPUT,
        value: val
    }
}
// reducer
export const acctInput = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_ACCT_INPUT:
            // return { ...state, acctInput: submitAcctInput(`submitted ${action.value}`) }
            return { ...state, submitted: action.value }
        default:
            return state
    }
    return state
}