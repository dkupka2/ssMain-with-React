import { SUBMIT_REQUEST, tables } from '../';
import { socket } from '../socket';

const callPiRestDependancies = {
  tables,
  socket
};

export const callPiRest = acct => type => view => deps => {
  const { tables, socket } = deps;
  // if view is only one document: request selected view
  if (type !== 'constructed') {
    socket.emit(tables.requestKeys[type], {
      acct,
      table: tables[type][view]
    });
  } else {
    // get each doc for each doc type in selected constructed view
    Object.keys(tables.constructed[view]).forEach(docType => {
      tables.constructed[view][docType].forEach(doc => {
        socket.emit(tables.requestKeys[docType], {
          acct,
          table: doc
        });
      });
    });
  }
};

export const callAPI = (acct, type, view) =>
  callPiRest(acct)(type)(view)(callPiRestDependancies);

export const restRequest = data => {
  const { acct, type, view } = data;
  callAPI(acct, type, view);
  return {
    type: SUBMIT_REQUEST,
    acct,
    view
  };
};
