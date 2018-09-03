export const loadCache = data => applyView => tables => makeBody => clean => {
  let targetArray,
    body = [],
    { type, acct, optTable, accts } = data;
  // if selected view is a compound table
  if (tables.lists.compound.includes(optTable)) {
    // iterate over tables list
    tables.compoundLists[optTable].forEach(targetTable => {
      // revert each table name to human readable
      targetTable = tables.revertKeys[targetTable];
      // cacheData from each target table
      targetArray = accts[acct][targetTable];
      // if cache has data
      if (targetArray.length > 0) {
        // filter and aggregate data
        body = makeBody(body)(targetTable)(targetArray)(optTable);
      }
    });
  } else {
    // cacheData from selected table
    targetArray = accts[acct][optTable];
    // if table data exists in accts.acct[table]
    if (targetArray.length > 0) {
      // filter table
      body = makeBody(body)(optTable)(targetArray)(optTable);
    }
  }
  // strip out undefined / null entries
  return { body: clean(body) };
};
