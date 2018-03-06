import { combineReducers } from 'redux'

import { accts } from './reducers/accts.js'
import { acctInput } from './reducers/acctInput.js'
import { dataTable } from './reducers/dataTable.js'
import { tableOptions } from './reducers/tableOptions.js'

export const reducer = combineReducers({
    accts,
    acctInput,
    dataTable,
    tableOptions,
})