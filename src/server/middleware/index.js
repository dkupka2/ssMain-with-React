'use strict';

const files = require('./files');

const lookUpFile = files.lookUpFile;
const getBackUps = files.getBackUps;

let check = acct => {
  const look = lookUpFile(acct);
  return look;
};

module.exports = {
  check,
  getBackUps
};
