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
        final = val // return string
    } else {
        // final = val.slice(0, val.length-1).join("") // return string without invalid char
        final = arr.pop()
    }
    return final
}

const uiReducer = (state = {}, action) => {
    console.log('uiReducer was called with state ', state, ' and action ', action)
    switch(action.type) {
        case events.ui.updateAcctInput :
            return {
                //...state,
                acctInput: checkAcctInputValue(action.payload)
            }
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