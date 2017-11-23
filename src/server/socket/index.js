"use strict";

const request = require("request")

const middleware = require("../middleware"),
    validateAcct = middleware.check,
    getBackUps = middleware.getBackUps

const globals = require("../../../global.js"),
    apis = globals.apis,
    creds = globals.creds

const url = apis.pirest,
    user = creds.username,
    pass = creds.password,
    auth = "Basic " + new Buffer(`${user}:${pass}`).toString("base64")

module.exports = (io, app) => {
    // socket transactions for restapi
    io.of("/restapi").on("connection", socket => {
        console.log("connection found")
        let relay = (message, data) => {
            socket.emit(message, data)
        }
        socket.on("table request", restReq => {
            let first, second, acct, table
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
                    try {
                        JSON.parse(body)
                    } catch (e) {
                        return relay("rest error", e)
                    }
                    first = restReq.search("/"),
                    second = restReq.search("out=json") - 2,
                    acct = restReq.slice(0, first),
                    table = restReq.slice(`${first+1}`, second)
                    socket.emit("restapi response", {acct, table, body})
                }
            )
        })
        socket.on("filtered request", data => {
            let send,
                {acct, table } = data
            request(
                {
                    url: `${url}${table}/?limit=500&out=json`,
                    headers: {
                        "authorization": auth
                    }
                }, (err, response, body) => {
                    if (err) {
                        return relay("rest error", err)
                    }
                    try {
                        JSON.parse(body)
                    } catch (e) {
                        return relay("rest error", body)
                    }
                    socket.emit("restapi response", {acct, table, body})
                }
            )
        })
        socket.on("validation request", acct => {
            console.log("requesting validation & backup directory listing")
            let validation = validateAcct(acct)
            if (validation) getBackUps(acct, relay)
            socket.emit("validation response", {
                pass: validation,
                acct: acct
            })
        })
    })
}