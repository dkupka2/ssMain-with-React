import {
    SUBMIT_REQUEST,
    callAPI,
} from '../'

export const restRequest = data => {
    let { acct, type, optTable } = data
    callAPI(acct, type, optTable)
    return {
        type: SUBMIT_REQUEST,
        acct, optTable,
    }
}
