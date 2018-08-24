import { CACHE_TABLE } from "../";

export const cacheTable = payload => {
  let { accts, acct, resTable, data, from } = payload,
    viewTable;
  accts = { ...accts };
  accts[acct][resTable] = accts[acct][resTable].concat([data]);
  return { type: CACHE_TABLE, accts: accts };
};
