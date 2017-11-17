"use strict";
const fs = require("fs");

const files = require("./files")

const lookUpFile = files.lookUpFile
const getBackUps = files.getBackUps

let check = (acct) => {
    let look = lookUpFile(acct);
    console.log("checke result for acct ", acct, ": ", look);
    return look;
};

module.exports = {
    check,
    getBackUps
};