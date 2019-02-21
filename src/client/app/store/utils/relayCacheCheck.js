import { checkCache, filterRows, makeHeaders } from '..';

import { confirmIsNonEmptyArray } from '../../services';

const relayCacheCheckDeps = {
  predicate: confirmIsNonEmptyArray,
  filter: filterRows,
  format: makeHeaders
};

export const relayCacheCheck = data => checkCache(data)(relayCacheCheckDeps);
