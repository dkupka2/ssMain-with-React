import { combineReducers } from 'redux'
import store from '../store/index'
import events from '../events'
import { initialState } from '../state/index'

/*const checkAcctInputValue = (val) => {
    alert(val)
    let arr, args = []
    if (val) {
        arr = Array.from(val)
        // if length is valid and last char is a number
        if ( arr.length < 5 && ! isNaN( parseInt( arr[arr.length-1], 10 ) ) ) {
            console.log("Valid! ", val.slice())
            args.push({acctInput: val.slice()}) // return string
        } else {
            console.log("invalid: ", "val ", val, " sliced ", val.slice(0,4))
            args.push({acctInput: val.slice(0,4)}) // return string without invalid char
        }
    } else {
        return null
    }
    return returnThis(args)
}

const acctInputReducer = (state = initialState, action) => {
    console.log('uiReducer was called with state ', state, ' and action ', action)
    switch(action.type) {
        case events.updateAcctInput :
            return [
                checkAcctInputValue(action.payload),
                ...state
            ]
            break
        default:
            return state
    }
}*/

const acctsReducer = (state = initialState, action) => {
    console.log('acctsReducer was called with state ', state, ' and action ', action)
    switch(action.type) {
        case false :
            break
        default:
            return initialState
    }
}

const reducer = combineReducers({
    acctInput: acctInputReducer,
    accts: acctsReducer
})

export default reducer