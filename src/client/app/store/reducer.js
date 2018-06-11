import { combineReducers } from 'redux'

import {
    accts,
    acctInput,
    dataTable,
    tableOptions,
    socket,
    fileManagement,
} from '../store'

export const reducer = combineReducers({
    accts,
    acctInput,
    dataTable,
    tableOptions,
    socket,
    fileManagement
})
