import cacheTable from '../'
import renderFromCache from '../'

export const restResponse = payload => {
    return dispatch => {
        dispatch( cacheTable(payload) )
        dispatch( renderFromCache(payload) )
    }
}
