import { combineReducers } from 'redux'

import {
    accts,
    acctInput,
    dataTable,
    tableOptions,
    socket,
} from './reducers'

export const reducer = combineReducers({
    accts,
    acctInput,
    dataTable,
    tableOptions,
    socket
})
