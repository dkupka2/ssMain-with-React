import Pubsub from 'pubsub-js'
import io from 'socket.io-client'
// socket io server instance
const socket = io.connect("http://localhost:8000/restapi")
socket.on("connect", () => {
    console.log("connected to socket server")
})
// event keys passed to App for consistency 
import { keys } from './keys'
// handles RestAPI request / response
let callAPI = (event, data) => {
    let request, table
    let type = data.tableType
    let acct = data.acctSelected
    console.log("table request: ", type, acct, data.tableSelected)
    if (type !== "compound") table = keys.tables[type][data.tableSelected]
    switch (type) {
        case "compound":
                let cLocal = Object.keys(keys.tables.compound.conflicts.local)
                let cGlobal = Object.keys(keys.tables.compound.conflicts.global)
                cLocal.map((table) => {
                    socket.emit(keys.req.local, {
                        acct, table: keys.tables.local[table]
                    })
                })
                cGlobal.map((table) => {
                    socket.emit(keys.req.global, {
                        acct, table: keys.tables.global[table]
                    })
                })
        return
        case "local":
            alert("emit local: " + table)
            socket.emit(keys.req.local, {acct, table} )
        return
        case "global":
        alert("emit global: " + table)
            socket.emit(keys.req.global, {acct, table} )
        return
        default:
            alert("error in callAPI switch, case: ", type)
        return
    }
}
Pubsub.subscribe(keys.actions.loadTable, callAPI)
// convert table name back from prop value
let revertTableName = (val) => { 
    let tables = Object.assign({}, keys.tables.local, keys.tables.global)
    for (let table in tables) {
        if (tables[table] === val) { 
            return table
        }
    }
}
socket.on(keys.res.restApi, (data) => {
    Pubsub.publish(keys.res.restApi, Object.assign({}, data, {
        table: revertTableName(data.table)
    }))
})
// relays acct validation request / response
let validation = (event, acct) => {
    socket.emit(keys.req.validation, acct)
}
Pubsub.subscribe(keys.req.validation, validation)
socket.on(keys.res.validation, (data) => {
    Pubsub.publish(keys.res.validation, data)
})
// relays acct back up request / response
let backupAccts = (event, acct) => {
    socket.emit(keys.req.backup, acct)
}
Pubsub.subscribe(keys.req.backup, backupAccts)
socket.on(keys.res.backups, (data) => {
    Pubsub.publish(keys.res.backups, data)
})
// handles error from RestAPI
socket.on(keys.res.error, (error) => {
    Pubsub.publish(keys.res.error, error)
})