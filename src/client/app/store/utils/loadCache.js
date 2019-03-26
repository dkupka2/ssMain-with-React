import {
  removeNilFromArray,
  getLastElFrom2DArray,
  applyFormatting
} from '../../services/';
import { tables } from '../';

export const loadCache = data => dependencies => {
  const { tables, format, filter } = dependencies;
  let targetArray,
    body = [],
    { acct, view, accts } = data;
  // if selected view is a constructed table
  if (tables.lists.constructed.includes(view)) {
    // iterate over tables list
    tables.constructedLists[view].forEach(targetTable => {
      // revert each table name to human readable
      targetTable = tables.revertKeys[targetTable];
      targetArray = accts[acct][targetTable];
      // if cache has data
      if (targetArray.length > 0) {
        // format and aggregate data
        body = format(body)(targetTable)(targetArray)(view);
      }
    });
  } else {
    // if table data exists in accts.acct[table]
    targetArray = accts[acct][view];
    if (targetArray.length > 0) {
      // format table
      body = format(body)(view)(targetArray)();
    }
  }
  // remove non-formatted data
  delete data.data;
  // return data without undefined / null entries
  return {
    ...data,
    body: filter(body)
  };
};

export const makeBody = body => target => array => (view = target) => [
  ...body,
  ...applyFormatting(target)(getLastElFrom2DArray(array))(view)
];

// namespacing for pipeDataToLoadCache dependences
const pipeDataToLoadCacheDeps = {
  filter: removeNilFromArray,
  format: makeBody,
  tables
};

export const pipeDataToLoadCache = data =>
  loadCache(data)(pipeDataToLoadCacheDeps);
