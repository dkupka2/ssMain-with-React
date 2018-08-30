import { socket } from "../socket";
import { tables } from "../";

export const callAPI_piRest = acct => type => view => tables => socket => {
  // view is only one document requested selected view
  if (type !== "compound") {
    socket.emit(tables.requestKeys[type], {
      acct,
      table: tables[type][view]
    });
  } else {
    // else get each document for selected compound view
    for (let doc of Object.keys(tables.compound[view])) {
      tables.compound[view][doc].map(key => {
        socket.emit(tables.requestKeys[doc], {
          acct,
          table: key
        });
      });
    }
  }
};

export const callAPI = (acct, type, view) =>
  callAPI_piRest(acct)(type)(view)(tables)(socket);
