import { combineReducers } from 'redux'

import {
    acctInput,
    accts,
    dataTable,
    fileManagement,
    socket,
    tableOptions,
} from './'

export const reducer = combineReducers({
    acctInput,
    accts,
    dataTable,
    fileManagement,
    socket,
    tableOptions,
})
