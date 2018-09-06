"use strict";
let fs = require("fs");
// namespace for caching mock tables
let mockTables = {};
// create IO server instance
let ioServer = app => {
  const server = require("http").Server(app);
  const io = require("socket.io")(server);
  require("./socket")(io, app);
  console.log("io going live");
  return server;
};
// check command for option
const option = process.argv[2] ? process.argv[2] : null;
// config settings, credentials should come from environmental variable
const configs = {
  paths: {
    root: process.env.SSMAIN_ROOT | "e:",
    script: process.env.PIATA_SCRIPT | "\\scripts\\eriknowledgence",
    app: null
  },
  apis: {
    rest: process.env.RESTAPI_URL | "https://rest-api.bpeinc.com",
    devPort: process.env.RESTAPI_PORT | "443",
    request: process.env.RESTAPI_REQUEST | "/v1/ORDENTRY/"
  },
  creds: {
    username: process.env.USERNAME | null,
    password: process.env.RESTAPI_PW | null
  }
};

const config = request => {
  // if not dev mode get settings from configs object
  return option === "dev" ? {} : configs[request];
};

const mockTable = table => {
  if (!mockTable[table]) {
    let file = fs.readFileSync(`${process.cwd()}/tests/mocks/${table}.json`);
    // cache mock table as string for first request
    mockTable[table] = JSON.stringify(JSON.parse(file));
  } // else return cached string
  return mockTable[table];
};

module.exports = {
  ioServer,
  config,
  option,
  mockTable
};
