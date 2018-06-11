// library
import {
    getLastArray,
    filterTable,
    cleanArr,
} from '../../services'
// action keys
import {
    tables,
    // redux actions
    LOAD_TABLE,
    RENDER_TABLE,
    TABLE_NOT_CACHED,
    // action creators
    renderTable
} from '../'
// state
const initialState = {
    tableData: [],
    columns: []
}
// reducer
export const dataTable = (state = initialState, action) => {
    let warning
    switch (action.type) {
        case RENDER_TABLE:
            warning = action.isCached ?
                'table from cache, re-load for newest version' : ''
            return {
                ...state,
                tableData: action.table,
                columns: action.columns,
                visible: true,
                message: warning
            }
        case TABLE_NOT_CACHED:
            return { ...state, visible: false}
        default:
            return state
    }
    return state
}
