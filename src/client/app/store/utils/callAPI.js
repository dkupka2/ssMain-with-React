import { socket } from "../socket";
import { tables } from "../";

export const callAPI_piRest = acct => type => view => tables => socket => {
  if (type !== "compound") {
    socket.emit(tables.requestKeys[type], {
      acct,
      table: tables[type][view]
    });
  } else {
    // get tables by compound table
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

export const callAPI = (acct, type, table) =>
  callAPI_piRest(acct)(type)(table)(tables)(socket);
