import { createStore } from 'redux'
import { initialState } from '../state/index'
import reducer from '../reducer/index'

const store = createStore(reducer, initialState)

export default store