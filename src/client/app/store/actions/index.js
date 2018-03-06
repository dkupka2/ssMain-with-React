export const SUBMIT_ACCT_INPUT = "SUBMIT_ACCT_INPUT"
export const ACCT_VALID = "ACCT_VALID"
export const ACCT_INVALID = "ACCT_INVALID"
export const CHANGE_ACCT = "CHANGE_ACCT"
export const SELECT_TYPE = "SELECT_TYPE"
export const SELECT_TABLE = "SELECT_TABLE"
export const SUBMIT_REQUEST = "SUBMIT_REQUEST"
export const LOAD_TABLE = "LOAD_TABLE"
export const LOAD_FAILURE = "LOAD_FAILURE"
export const RENDER_TABLE = "RENDER_TABLE"

import events from './socketEvents'

export const {
    ERROR,
    RESPONSE_BACKUP,
    RESPONSE_RESTAPI,
    RESPONSE_VALIDATE_CLIENT,
    REQUEST_LIST,
    REQUEST_LOCAL,
    REQUEST_BACKUP,
    REQUEST_GLOBAL,
    REQUEST_CONLFLICTS,
    REQUEST_VALIDATE_CLIENT,
} = events

export { tables } from './tables'