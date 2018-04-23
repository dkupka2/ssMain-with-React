import {
    ACCT_VALID,
    OPEN_FILE_OPTIONS,
    CLOSE_FILE_OPTIONS,
    BACKUP_ACCT,
    RESTORE_ACCT
} from '../actions/'

const initialState = {
    visible: false,
    open: false,
    backupOptions: ['1','2'],
    backupValue: '',
}
// action creators
export const openOptions = () => {
    return { type: OPEN_FILE_OPTIONS }
}
export const closeOptions = () => {
    return { type: CLOSE_FILE_OPTIONS }
}
export const backupAcct = () => {
    return { type: BACKUP_ACCT }
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
        case BACKUP_ACCT:
            return {
                ...state,
                backupOptions: ['3','4']
            }
        default:
            return state
    }
    return state
}
