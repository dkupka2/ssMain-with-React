import { SELECT_TABLE } from '../'

export const changeTable = data => {
    return dispatch => {
        dispatch( renderFromCache(data) )
        dispatch({
            type: SELECT_TABLE,
            value: data.optTable
        })
    }
}
