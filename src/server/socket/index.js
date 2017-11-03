"use strict";

const request = require("request")

const validateAcct = require("../middleware").check
const globals = require("../../../global.js")

const checkDirs = require("../middleware/files").checkDirs
const backupAcct = require("../middleware/files").backupAcct

const apis = globals.apis
const creds = globals.creds

module.exports = (io, app) => {
    // socket transactions for restapi
    io.of("/restapi").on("connection", socket => {
        socket.on("restapi request", restReq => {
            console.log("api request")
            let url = apis.pirest,
                user = creds.username,
                pass = creds.password,
                auth = "Basic " + new Buffer(`${user}:${pass}`).toString("base64")
            request(
                {
                    url: url + restReq,
                    headers: {
                        "authorization" : auth
                    }
                }, (err, response, body) => {
                    if (err) {
                        console.log("error: ", err)
                    }
                    let first = restReq.search("/") + 1,
                        second = restReq.search("out=json") - 2,
                        acct = restReq.slice(0, first - 1),
                        table = restReq.slice(first, second)
                    if (body.slice(body.length-14) === "does not exist") {
                        body = { error: "account does not exist in ordentry"}
                    }
                    let data = Object.assign({}, {acct, table, body})
                    socket.emit("restapi response", data)
                }
            )
        })
        socket.on("validation request", acct => {
            console.log("validation request")
            socket.emit("validation response", {
                pass: validateAcct(acct),
                acct: acct
            })
        })
        socket.on("check backup", acct => {
            console.log("checking for ",acct,"/DBFILES/BACKUP")
            checkDirs(acct)
        })
        socket.on("backup acct", acct=> {
            console.log("backing up acct: ",acct)
            backupAcct(acct)
        })
    })
}