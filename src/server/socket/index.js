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
    auth = "Basic " + new Buffer(`${user}:${pass}`).toString("base64"),
    query ='out=json&limit=500',
    eq = `&eq_CLIENT_ID=`

const events = require("../../client/app/store/events/socketEvents")
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
            switch(type) {
                case 'list':
                    URI = `${url}${acct}/${list}/${table}?${query}`
                    break
                case 'local':
                    URI = `${url}${acct}/${table}?${query}`
                    break
                case 'global':
                    URI = `${url}/${table}?${query}${eq}${acct}`
                    break
                default:
                    console.log("error constructing request URI")
            }
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
                    relay( RESPONSE_RESTAPI, {
                        acct,
                        body,
                        table: gTables.convert(table)
                    })
                }
            )
        }
        socket.on(REQUEST_LIST, data => sendRequest("list", data))
        socket.on(REQUEST_LOCAL, data => sendRequest("local", data))
        socket.on(REQUEST_GLOBAL, data => sendRequest("global", data))
    })
}
