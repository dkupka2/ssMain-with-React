import { socket } from '../socket';
import { tables } from '../';

export const callAPI_piRest = acct => type => view => tables => socket => {
  // if view is only one document: request selected view
  if (type !== 'compound') {
    socket.emit(tables.requestKeys[type], {
      acct,
      table: tables[type][view]
    });
  } else {
    // get each doc for each doc type in selected compound view
    Object.keys(tables.compound[view]).forEach(docType => {
      tables.compound[view][docType].forEach(doc => {
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
