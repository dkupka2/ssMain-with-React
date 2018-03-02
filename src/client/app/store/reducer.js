import { combineReducers } from 'redux'

import { acctInput } from './reducers/acctInput.js'
import { accts } from './reducers/accts.js'
import { tableOptions } from './reducers/tableOptions.js'
import { dataTable } from './reducers/dataTable.js'

export const reducer = combineReducers({
    acctInput,
    accts,
    tableOptions,
    dataTable,
})