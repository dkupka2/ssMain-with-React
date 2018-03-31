"use strict";

const request = require("request")
const middleware = require("../middleware")
const globals = require("../../../global")

const validateAcct = middleware.check,
    getBackUps = middleware.getBackUps,
    apis = globals.apis,
    creds = globals.creds,
    url = apis.pirest,
    user = creds.username,
    pass = creds.password,
    auth = "Basic " + new Buffer(`${user}:${pass}`).toString("base64")

const events = require("../../client/app/store/actions/socketEvents")
let {
    ERROR,
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
    RELAY_TABLES
} = events

let gTables = {}

module.exports = (io, app) => {
    // socket transactions for restapi
    io.of("/restapi").on("connection", socket => {
        console.log("connection found")
        let relay = (message, data) => {
            console.log("relaying: ", message)
            socket.emit(message, data)
        }
        // get tables from client, add method
        socket.on(RELAY_TABLES, tables => {
            gTables = tables
            tables.convert = key => {
                return Object.keys(tables.revertKeys).includes(key) ?
                        tables.revertKeys[key] :
                        Object.keys(tables.global).includes(key) ?
                            tables.global[key] :
                            tables.local[key]
            }
        })
        socket.on(REQUEST_VALIDATE_CLIENT, data => {
            relay(RESPONSE_VALIDATE_CLIENT, {
                acct: data.acct,
                valid: validateAcct(data.acct)
            })
        })

        let sendRequest = (type, data) => {
            let URI,
                { acct, table, list } = data
            if (type === "list") URI = `${url}${acct}/${list}/${table}?out=json`
            if (type === "local") URI = `${url}${acct}/${table}?out=json&limit=500`
            if (type === "global") URI = `${url}/${table}?out=json&limit=500&eq_CLIENT_ID=${acct}`
            request(
                {
                    url: URI,
                    headers: { "authorization": auth }
                }, (err, response, body) => {
                    if (err) {
                        console.log("error: ", err)
                    }
                    try {
                        JSON.parse(body)
                    } catch (e) {
                        console.log("error from rest server: ", body)
                        return relay("rest error", e)
                    }
                    relay( RESPONSE_RESTAPI, { acct, body, table: gTables.convert(table) } )
                }
            )
        }
        socket.on(REQUEST_LIST, data => sendRequest("list", data))
        socket.on(REQUEST_LOCAL, data => sendRequest("local", data))
        socket.on(REQUEST_GLOBAL, data => sendRequest("global", data))
    })
}
