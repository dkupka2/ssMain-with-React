"use strict";

const request = require("request");

const wrapper = require("../pyWrapper");
const globals = require("../../../global.js");

const apis = globals.apis;
const creds = globals.creds;

module.exports = (io, app) => {
    // socket transactions for restapi
    io.of("/restapi").on("connection", socket => {
        socket.on("restapi request", restReq => {
            console.log("api request")
            let url = apis.pirest,
                user = creds.username,
                pass = creds.password,
                auth = "Basic " + new Buffer(`${user}:${pass}`).toString("base64");
            request(
                {
                    url: url + restReq,
                    headers: {
                        "authorization" : auth
                    }
                }, (err, response, body) => {
                    if (err) {
                        console.log("error: ", err);
                    }
                    let first = restReq.search("/") + 1,
                        second = restReq.search("out=json") - 2,
                        acct = restReq.slice(0, first - 1),
                        table = restReq.slice(first, second);
                    let data = Object.assign({}, {acct, table, body})
                    socket.emit("restapi response", data);
                }
            );
        });
    });
};