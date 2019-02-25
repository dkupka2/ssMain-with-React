'use strict';

const request = require('request');
const middleware = require('../middleware');
const events = require('../../client/app/store/events/socketEvents');
const configs = require('../').configs;
const option = require('../').option;
const mockTable = require('../').mockTable;

const {
  PARSE_ERROR,
  REST_ERROR,
  RESPONSE_BACKUPS,
  RESPONSE_RESTAPI,
  RESPONSE_VALIDATION,
  RESPONSE_VALIDATE_CLIENT,
  REQUEST_LIST,
  REQUEST_LOCAL,
  REQUEST_GLOBAL,
  REQUEST_BACKUP,
  REQUEST_CONLFLICTS,
  REQUEST_VALIDATION,
  REQUEST_VALIDATE_CLIENT,
  RELAY_TABLES,
  DEV_MODE
} = events;

let dev = option === 'dev',
  validateAcct = middleware.check,
  getBackUps = middleware.getBackUps,
  apis = configs.apis,
  creds = configs.creds,
  url = `${apis.rest}:${apis.devPort}${apis.request}`,
  user = creds.username,
  pass = creds.password,
  auth = 'Basic ' + new Buffer(`${user}:${pass}`).toString('base64'),
  query = 'out=json&limit=500',
  eq = `&eq_CLIENT_ID=`,
  gTables = {};

const relay = (message, data, socket) => {
  console.log('relaying: ', message);
  socket.emit(message, data);
};

const initTables = tables => {
  gTables = tables;
  gTables.convert = key => {
    return Object.keys(tables.revertKeys).includes(key)
      ? tables.revertKeys[key]
      : Object.keys(tables.global).includes(key)
      ? tables.global[key]
      : tables.local[key];
  };
};

module.exports = (io, app) => {
  if (!dev) {
    console.log('server is running normally');
    // socket transactions for restapi
    io.of('/restapi').on('connection', socket => {
      console.log('connection found');
      // initialize tables and value conversion method
      socket.on(RELAY_TABLES, tables => initTables(tables));
      socket.on(REQUEST_VALIDATE_CLIENT, data => {
        relay(
          RESPONSE_VALIDATE_CLIENT,
          {
            acct: data.acct,
            valid: validateAcct(data.acct)
          },
          socket
        );
      });

      let sendRequest = (type, data) => {
        let URI,
          { acct, table, list } = data;
        switch (type) {
          case 'list':
            URI = `${url}${acct}/${list}/${table}?${query}`;
            break;
          case 'local':
            URI = `${url}${acct}/${table}?${query}`;
            break;
          case 'global':
            URI = `${url}/${table}?${query}${eq}${acct}`;
            break;
          default:
            console.log('error constructing request URI');
        }
        request(
          {
            url: URI,
            headers: { authorization: auth }
          },
          (err, response, body) => {
            if (err) {
              console.log(err);
              return relay(REST_ERROR, {}, socket);
            }
            try {
              JSON.parse(body);
            } catch (e) {
              console.log(e);
              return relay(PARSE_ERROR, {}, socket);
            }
            relay(
              RESPONSE_RESTAPI,
              {
                acct,
                body,
                table: gTables.convert(table)
              },
              socket
            );
          }
        );
      };
      socket.on(REQUEST_LIST, data => sendRequest('list', data));
      socket.on(REQUEST_LOCAL, data => sendRequest('local', data));
      socket.on(REQUEST_GLOBAL, data => sendRequest('global', data));
    });
  } else {
    io.of('/restapi').on('connection', socket => {
      console.log(`server running in dev mode`);
      // initialize tables and value conversion method
      socket.on(RELAY_TABLES, tables => initTables(tables));
      socket.emit(DEV_MODE);

      const returnMockTable = data => {
        let { acct, table } = data;
        relay(
          RESPONSE_RESTAPI,
          {
            acct,
            table: gTables.convert(table),
            body: mockTable(table)
          },
          socket
        );
      };

      socket.on(REQUEST_VALIDATE_CLIENT, data => {
        relay(
          RESPONSE_VALIDATE_CLIENT,
          {
            acct: data.acct,
            valid: true
          },
          socket
        );
      });
      socket.on(REQUEST_LOCAL, data => returnMockTable(data));
      socket.on(REQUEST_GLOBAL, data => returnMockTable(data));
    });
  }
};
