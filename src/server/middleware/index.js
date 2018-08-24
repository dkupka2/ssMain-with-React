"use strict";

const fs = require("fs");
const files = require("./files");

const lookUpFile = files.lookUpFile;
const getBackUps = files.getBackUps;

let check = acct => {
  let look = lookUpFile(acct);
  return look;
};

module.exports = {
  check,
  getBackUps
};
