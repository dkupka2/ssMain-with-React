"use strict"; 
// create IO server instance
let ioServer = app => {
    const server = require("http").Server(app)
    const io = require("socket.io")(server)
    require("./socket")(io, app)
    console.log("io going live")
    return server
};

module.exports = {
    ioServer
}