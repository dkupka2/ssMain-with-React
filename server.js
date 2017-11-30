"use strict";

const path = require("path"),
    express = require("express"),
    app = express(),
    ssMain = require("./src/server")

app.set("port", process.env.PORT || 8000)

app.use(express.static(__dirname));

ssMain.ioServer(app).listen(app.get("port"), () => {
    console.log("listening to port 8k")
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/src/client/views/index.html'))
});

app.get("/restapi", (req, res) => {
    res.sendFile(path.join(__dirname + '/src/client/views/restapi.html'))
});