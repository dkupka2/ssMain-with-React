import { filterTable } from '../../services'
import { tables } from '../actions'
// event keys
import {
    // redux actions
    LOAD_TABLE,
} from '../actions/'
// state
const initialState = {
    tableData: [],
    columns: []
}
// action creators
export const renderTable = data => {
    let tableName =  tables.revertKeys[data.table],
        tableData = filterTable( tableName, JSON.parse( data.body) )
    let getHeaders = (obj) => {
        let final = [], headers = Object.keys( obj )
        for ( let header of headers ) {
            final.push({Header: header, accessor: header})
        }
        return final
    }
    return {
        type: LOAD_TABLE,
        columns: getHeaders(tableData[0]),
        table: tableData
    }
}
// reducer
export const dataTable = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TABLE:
            return { ...state, tableData: action.table, columns: action.columns}
        default:
            return state
    }
    return state
}