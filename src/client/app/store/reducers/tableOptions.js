// event keys
import {
    SELECT_TYPE,
    SELECT_TABLE,
    LOAD_TABLE
} from '../actions/'
// state
const initialState = {
    type: "compound",
    table: "conflicts"
}
// selectors
export const getTable = state => state.table
// action creators
export const changeType = type => {
    console.log("ac: type change: ", type)
    return {
        type: SELECT_TYPE,
        value: type
    }
}
export const changeTable = table => {
    console.log("ac: table change: ", table)
    return {
        type: SELECT_TABLE,
        value: table
    }
}
export const loadTable = () => {
    return {
        type: LOAD_TABLE,
        value: state.table
    }
}

// reducer
export const tableOptions = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_TYPE: 
            return { ...state, type: action.value  }
        case SELECT_TABLE: 
            return { ...state, table: action.value }
        case LOAD_TABLE:
            return { ...state}
        default:
            return state
    }
    return state
}