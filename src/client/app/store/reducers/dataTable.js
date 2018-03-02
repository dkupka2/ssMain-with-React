// event keys
import {
    // redux actions
    LOAD_TABLE,
} from '../actions/'
// state
const initialState = {
    tableData: [{test: 1},{test: 2}],
    columns: []
}
// action creators
export const renderTable = data => {
    return {
        type: LOAD_TABLE,
        table: data.body // pass string as arr
    }
}

// reducer
export const dataTable = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TABLE:
            return { ...state, tableData: action.table}
        default:
            return state
    }
    return state
}