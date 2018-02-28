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
// action creators
export const changeType = type => {
    return {
        type: SELECT_TYPE,
        value: type
    }
}
export const changeTable = table => {
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