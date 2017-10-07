import { createStore } from 'redux'

import reducer from '../reducer/index'

const initialState = {
    acctInput: "",
    acctSelected: "",
    tableSelected: "",
    accts: {},
    bannerType: "",
    bannerPrompt: "",
    pending: false,
}

const store = createStore(reducer, initialState)
store.actions = {
  updateAccountInput: "uAI"
}
 
export default store