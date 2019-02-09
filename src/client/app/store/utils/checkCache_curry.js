import { checkCache, filterRows, makeHeaders } from '../';

import { confirmIsNonEmptyArray } from '../../services/';

export const checkCache_curry = data =>
  checkCache(data)(makeHeaders)(filterRows)(confirmIsNonEmptyArray);
