import { socket } from '../socket';
import { tables } from '../';

export const callAPI_piRest = acct => type => view => tables => socket => {
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
  callAPI_piRest(acct)(type)(view)(tables)(socket);
