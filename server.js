"use strict";

const path = require("path"),
    express = require("express"),
    app = express()

const ssMain = require("./src/server")

app.set("port", process.env.PORT || 8000)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, '/src/client/views'))

app.use(express.static(__dirname));

ssMain.ioServer(app).listen(app.get("port"), () => {
    console.log("listening to port 8k")
});

app.use("/", (req, res) => {
    ssMain.router(req, res);
});