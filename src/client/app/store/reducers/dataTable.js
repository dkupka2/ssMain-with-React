import { filterTable } from '../../services'
import { tables } from '../actions'
// event keys
import {
    // redux actions
    LOAD_TABLE,
    RENDER_TABLE,
} from '../actions/'
// state
const initialState = {
    tableData: [],
    columns: []
}
// action creators
export const initialTableRender = data => {
    let tableName =  tables.revert( [data.table] ),
        tableData = filterTable( tableName, JSON.parse(data.body) )
    let getHeaders = (obj) => {
        let final = []
        Object.keys(obj).map( (header) => final.push( {Header: header, accessor: header} ) )
        return final
    }
    return {
        type: RENDER_TABLE,
        columns: getHeaders( tableData[0] ),
        table: tableData,
        acct: data.acct,
        tableName: data.tableName
    }
}
// reducer
export const dataTable = (state = initialState, action) => {
    switch (action.type) {
        case RENDER_TABLE:
            return { ...state, tableData: action.table, columns: action.columns }
        default:
            return state
    }
    return state
}