import { compose } from '../../services'

import {
    loadCache,
    checkCache_curry
} from '../'

export const renderFromCache = data =>
    compose(loadCache, checkCache_curry, data)
