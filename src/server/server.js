"use strict"

const path = require("path"),
    express = require("express"),
    app = express(),
    ssMain = require("./index.js")

const appPath = require("../../global.js").paths.app

app.set("port", process.env.PORT || 8000)

app.use(express.static(appPath))

ssMain.ioServer(app).listen(app.get("port"), () => {
    console.log("listening to port 8k")
})

app.get("/", (req, res) => {
    res.redirect('/restapi')
})

app.get("/restapi", (req, res) => {
    res.sendFile(path.join(appPath + '/src/client/views/restapi.html'))
})
