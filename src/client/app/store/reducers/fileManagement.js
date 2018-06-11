import {
    // redux actions
    ACCT_VALID,
    OPEN_FILE_OPTIONS,
    CLOSE_FILE_OPTIONS,
    BACKUP_ACCT,
    RESTORE_ACCT,
    // action creators
    toggleOptions,
    backupAcct
} from '../'

const initialState = {
    selector: 'hidden',
    open: false,
    backupOptions: ['1','2'],
    backupValue: '',
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
