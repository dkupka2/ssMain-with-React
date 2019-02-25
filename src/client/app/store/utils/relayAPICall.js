import { socket } from '../socket';
import { tables } from '..';

let callPIRESTAPIDeps = {
  tables,
  socket
};

export const callPIRESTAPI = data => dependencies => {
  let { acct, type, view } = data;
  let { tables, socket } = dependencies;
  // request document for single document view
  if (type !== 'compound') {
    socket.emit(tables.requestKeys[type], {
      acct,
      table: tables[type][view]
    });
  } else {
    // get all docs for each type in selected compound view
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

export const relayAPICall = data => callPIRESTAPI(data)(callPIRESTAPIDeps);
