import {
    loadCache,
    renderTable
} from '../'

export const renderFromCache = data => {
    return compose(loadCache, renderTable, data)
}
