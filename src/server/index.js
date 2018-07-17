'use strict';
let fs = require('fs');
// namespace for caching mock tables
let mockTables = {}
// create IO server instance
let ioServer = app => {
  const server = require('http').Server(app)
  const io = require('socket.io')(server)
  require('./socket')(io, app)
  console.log('io going live');
  return server
};
// check command for option
const option = process.argv[2] ?
  process.argv[2] :
  null
// mock config settings & reference for new users
const configMock = {
  paths: {
    root: null,
    script: null,
    app: null,
  },
  apis: {
    rest: null,
    devPort: null,
    request: null,
  },
  creds: {
    username: null,
    password: null,
  },
};

const config = request => {
  // if dev mode point to mock config settings else get settings from config.js
  let configSource = option === 'dev' ?
    configMock :
    require('../../config')
  return configSource[request]
};

const mockTable = table => {
  if (! mockTable[table] ) {
    let file = fs.readFileSync(`${process.cwd()}/tests/mocks/${table}.json`)
    // cache mock table as string for first request
    mockTable[table] = JSON.stringify( JSON.parse(file) )
  } // else return cached string
  return mockTable[table]
};

module.exports = {
    ioServer,
    config,
    option,
    mockTable
};
