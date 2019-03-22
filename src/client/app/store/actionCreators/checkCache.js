import { TABLE_NOT_CACHED, RENDER_TABLE } from '../';

export const checkCache = data => dependencies => {
  const { acct, accts, view } = data;
  const { predicate, filter, format } = dependencies;
  if (!predicate(data.body)) return { type: TABLE_NOT_CACHED };
  // return table data with headers created from the first entry
  return {
    type: RENDER_TABLE,
    columns: format(data.body[0])(filter),
    table: data.body,
    acct,
    accts,
    view
  };
};
