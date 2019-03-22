import { socket } from '../socket';
import { tables } from '..';

let callPIRESTAPIDeps = {
  tables,
  socket
};

export const callPIRESTAPI = data => dependencies => {
  const { acct, type, view } = data;
  const { tables, socket } = dependencies;
  // request document for single document view
  if (type !== 'constructed') {
    socket.emit(tables.requestKeys[type], {
      acct,
      table: tables[type][view]
    });
  } else {
    // get all docs for each type in selected constructed view
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

export const relayAPICall = data => callPIRESTAPI(data)(callPIRESTAPIDeps);
