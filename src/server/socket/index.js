"use strict";

const request = require("request")

const middleware = require("../middleware")
const validateAcct = middleware.check
const getBackUps = middleware.getBackUps

const globals = require("../../../global.js")


const apis = globals.apis
const creds = globals.creds

module.exports = (io, app) => {
    // socket transactions for restapi
    io.of("/restapi").on("connection", socket => {
        let relay = (message, data) => {
            console.log("socket: relay")
            socket.emit(message, data)
        }

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
            console.log("socket: validation")
            getBackUps(acct, relay)
        })
    })
}