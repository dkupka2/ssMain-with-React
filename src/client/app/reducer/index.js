import { combineReducers } from 'redux'
import { initialState } from '../state/index'
// action keys and relay function
import actions from '../actions/index'
const {
        SELECT_ACCOUNT,
        ADD_ACCOUNT,
        relay
    } = actions

const reducer = (state = initialState, action) => {
    console.log("reducer was called with state: ", state, " and action ", action);

    let newState = Object.assign({}, state)
    let flatAccts = () => {
        if (state.accts.length>0) {
            console.log("previous state contains accts: ",Object.keys(state.accts))
            return Object.keys(state.accts)
        } else {
            console.log("no accts in prev state");
            return []
        }
    }

    switch(action.type) {
        case SELECT_ACCOUNT :
            newState.selectedAcct = action.payload
            console.log("should return new state", newState)
            return newState
            break
        case ADD_ACCOUNT :
            let newAccts = {}
            newState.acctInput = ""
            if (flatAccts().includes(action.payload)) return state
            // if accts contains accounts, copy accts' enumerable
            if (flatAccts().length > 0) Object.assign(newAccts, state.accts)
            newAccts[action.payload] = {}
            newState.accts = newAccts
            newState.acctSelected = action.payload
            console.log("should return new state", newState)
            return newState
            break
        default:
            return state
    }
}

export default reducer