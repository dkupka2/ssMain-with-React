import {
    ACCT_VALID,
    OPEN_FILE_OPTIONS,
    CLOSE_FILE_OPTIONS,
    BACKUP_ACCT,
    RESTORE_ACCT
} from '../actions/'

const initialState = {
    selector: 'hidden',
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
    return { type: BACKUP_ACCT, backups: ['2','3'] }
}

export const fileManagement = (state = initialState, action) => {
    switch (action.type) {
        case ACCT_VALID:
            return {
                ...state,
                selector: 'fileManagement'
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
                backupOptions: action.backups
            }
        default:
            return state
    }
    return state
}
