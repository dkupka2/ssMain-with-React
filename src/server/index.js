"use strict"; 
// create IO server instance
let ioServer = app => {
    // app.locals.tools = [];
    const server = require("http").Server(app);
    const io = require("socket.io")(server);
    require("./socket")(io, app);
    console.log("io going live")
    return server;
};

module.exports = {
    router: require("./routes"),
    ioServer
}