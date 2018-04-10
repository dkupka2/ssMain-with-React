import {
    ACCT_VALID,
    OPEN_FILE_OPTIONS,
    CLOSE_FILE_OPTIONS,
} from '../actions/'

const initialState = {
    visible: false,
    open: false
}
// action creators
export const openOptions = () => {
    return { type: OPEN_FILE_OPTIONS }
}
export const closeOptions = () => {
    return { type: CLOSE_FILE_OPTIONS }
}

export const fileManagement = (state = initialState, action) => {
    switch (action.type) {
        case ACCT_VALID:
            return { 
                ...state,
                visible: true
            }
        case OPEN_FILE_OPTIONS:
            return { 
                ...state,
                open: true
            }
        case CLOSE_FILE_OPTIONS:
            return {
                ...state,
                open: false
            }
        default:
            return state
    }
    return state
}
