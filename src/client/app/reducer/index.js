import { combineReducers } from 'redux'
import store from '../store/index'
import events from '../events'

const checkAcctInputValue = (val) => {
    let arr, final = ""
    if (val) {
        arr = Array.from(val)
    } else {
        return final
    }
    // if length is valid and last char is a number
    if ( arr.length < 5 && ! isNaN( parseInt( arr[arr.length-1], 10 ) ) ) {
        console.log("Valid!")
        return val.slice() // return string
    } else {
        console.log("invalid: ", "val ", val, " sliced ", val.slice(0,4))
        return val.slice(0,4) // return string without invalid char
    }
}

const uiReducer = (state = {}, action) => {
    console.log('uiReducer was called with state ', state, ' and action ', action)
    switch(action.type) {
        case events.ui.updateAcctInput :
            return [
                checkAcctInputValue(action.payload),
                ...state
            ]
            break
        default:
            return state
    }
}

const acctsReducer = (state = {}, action) => {
    console.log('acctsReducer was called with state ', state, ' and action ', action)
    switch(action.type) {
        case false :
            break
        default:
            return state
    }
}

const reducer = combineReducers({
    ui: uiReducer,
    // accts: acctsReducer
})

export default reducer