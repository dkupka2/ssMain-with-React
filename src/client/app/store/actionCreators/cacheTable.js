import { CACHE_TABLE } from '../';

export const cacheTable = payload => {
  let { acct, resTable, data } = payload,
    accts = { ...payload.accts };
  accts[acct][resTable] = accts[acct][resTable].concat([data]);
  return { type: CACHE_TABLE, accts };
};
