export const loadCache = data => dependencies => {
  const { tables, makeBody, clean } = dependencies;
  let targetArray,
    body = [],
    { acct, view, accts } = data;
  // if selected view is a compound table
  if (tables.lists.compound.includes(view)) {
    // iterate over tables list
    tables.compoundLists[view].forEach(targetTable => {
      // revert each table name to human readable
      targetTable = tables.revertKeys[targetTable];
      targetArray = accts[acct][targetTable];
      // if cache has data
      if (targetArray.length > 0) {
        // filter and aggregate data
        body = makeBody(body)(targetTable)(targetArray)(view);
      }
    });
  } else {
    // if table data exists in accts.acct[table]
    targetArray = accts[acct][view];
    if (targetArray.length > 0) {
      // filter table
      body = makeBody(body)(view)(targetArray)(view);
    }
  }
  // remove non-formatted data
  delete data.data;
  // return data without undefined / null entries
  return {
    ...data,
    body: clean(body)
  };
};
