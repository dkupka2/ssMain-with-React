'use strict';

const path = require('path');
let fs = require('fs');
// namespace for caching mock tables
let fakeTables = {};
// create IO server instance
let ioServer = app => {
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  require('./socket')(io, app);
  console.log('io going live');
  return server;
};
// check command for option
const option = process.argv[2] || null;
// config settings, credentials should come from environmental variables
const configs = {
  paths: {
    root: process.env.ORDENTRY_ROOT || 'e:',
    script: process.env.PIATA_SCRIPT || '\\scripts\\eriknowledgence',
    app: path.resolve('./')
  },
  apis: {
    rest: process.env.RESTAPI_URL || 'https://rest-api.bpeinc.com',
    devPort: process.env.RESTAPI_PORT || '443',
    request: process.env.RESTAPI_REQUEST || '/v1/ORDENTRY/'
  },
  creds: {
    username: process.env.USERNAME || null,
    password: process.env.RESTAPI_PW || null
  }
};
// make fakes
const mockTable = table => {
  if (!fakeTables[table]) {
    let file = fs.readFileSync(`${process.cwd()}/tests/mocks/${table}.json`);
    // cache fake as string for first request
    fakeTables[table] = JSON.stringify(JSON.parse(file));
  } // else return cached string
  return fakeTables[table];
};

module.exports = {
  ioServer,
  configs,
  option,
  mockTable
};
