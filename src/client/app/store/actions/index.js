export const TEST_CLICKY = "TEST CLICKY"
export const SUBMIT_ACCT_INPUT = "SUBMIT ACCT INPUT"
export const ACCT_VALID = "ACCT VALID"
export const ACCT_INVALID = "ACCT INVALID"
export const CHANGE_ACCT = "CHANGE ACCT"
export const SELECT_TYPE = "SELECT_TYPE"
export const SELECT_TABLE = "SELECT_TABLE"

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