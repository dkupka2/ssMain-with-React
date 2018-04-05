import { combineReducers } from 'redux'

import {
    accts,
    acctInput,
    dataTable,
    tableOptions,
} from './reducers'

export const reducer = combineReducers({
    accts,
    acctInput,
    dataTable,
    tableOptions,
})
