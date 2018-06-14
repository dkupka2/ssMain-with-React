import { compose } from '../../services'

import {
    loadCache,
    renderTable
} from '../'

export const renderFromCache = data =>
    compose(loadCache, renderTable, data)
