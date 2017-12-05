import Pubsub from 'pubsub-js'
import io from 'socket.io-client'
// socket io server instance
const socket = io.connect("http://localhost:8000/restapi")
socket.on("connect", () => {
    console.log("connected to socket server")
})
// event keys passed to App for consistency 
let events = {
    actions: {
        loadTable: "load table"
    },
    banner: {
        update: "update banner",
        close: "close banner"
    },
    filterTable: {
        Timed_Actions: "PT_TACTION",
        Scheduled_Deliveries: "PT_SCHED",
        Scheduled_Reminders: "PTREMIND",
    },
    loadTable: {
        //Admin: "OE_ADMIN",
        Autos_on_Save: "PT_AUTOA",
        Autos_on_Deliver: "PT_AUTOB",
        Form: "OE_FORM",
        Orders: "ORDERS",
        Customer_Database: "CUSTOMER",
        History: "PT_HIST",
        On_Call: "PTONCALL",
        Picklists: "OE_PKLST",
        Skiplists: "OE_SKIP",
        Contacts: "PT_CONTC",
        Abend: "OE_ABEND",
        Help_Topics: "OE_HELP",
        Dispatch_Procedures: "PT_PROC",
        // Dispatch_Delivery_Table: "PT_PROCDET",
        Dispatch_Conditions: "PT_CONDLIB",
        Batch_Conditions: "PT_BATCH",
        Dispatch_Contact_Locator: "PT_DCL",
        Message_View_Conditions: "PT_MDTPL",
    },
    multiTable: {
        Conflicts: "CONFLICTS",
    },
    req: {
        table: "table request",
        filtered: "filtered request",
        conlflicts: "conflicts request",
        validation: "validation request",
        backup: "backup request",
    },
    res: {
        error: "rest error",
        restApi: "restapi response",
        validation: "validation response",
        backups: "backups response",
    },   
    ui: {
        ADD_ACCT: "aA",
        SELECT_ACCT: "sA",
        SELECT_TABLE: "sT",
    }
}
// handles RestAPI request / response
let callAPI = (event, data) => {
    let request, table
    let type = data.tableType
    let acct = data.acctSelected
    if (type !== "conflicts") table = events[type === "table" ? "loadTable" : "filterTable"][data.tableSelected]
    switch (type) {
        case "conflicts":
                Promise.all([
                    Object.keys(events.loadTable).map((table) => socket.emit(events.req.table, { 
                        acct,
                        table: events.loadTable[table] }
                    )),
                    Object.keys(events.filterTable).map((table) => socket.emit(events.req.filtered, {
                        acct,
                        table: events.filterTable[table] }
                    ))
                ])
        return
        case "table":
            socket.emit(events.req.table, {acct, table} )
        return
        case "filtered":
            socket.emit(events.req.filtered, {acct, table} )
        return
        default:
            alert("error in callAPI switch, case: ", type)
        return
    }
}
Pubsub.subscribe(events.actions.loadTable, callAPI)
// convert table name back from prop value
let revertTableName = (val) => { 
    let tables = Object.assign({}, events.loadTable, events.filterTable)
    for (let table in tables) {
        if (tables[table] === val) return table
    }
}
socket.on(events.res.restApi, (data) => {
    Pubsub.publish(events.res.restApi, Object.assign({}, data, {
        table: revertTableName(data.table)
    }))
})
// relays acct validation request / response
let validation = (event, acct) => {
    socket.emit(events.req.validation, acct)
}
Pubsub.subscribe(events.req.validation, validation)
socket.on(events.res.validation, (data) => {
    Pubsub.publish(events.res.validation, data)
})
// relays acct back up request / response
let backupAccts = (event, acct) => {
    socket.emit(events.req.backup, acct)
}
Pubsub.subscribe(events.req.backup, backupAccts)
socket.on(events.res.backups, (data) => {
    Pubsub.publish(events.res.backups, data)
})
// handles error from RestAPI
socket.on(events.res.error, (error) => {
    Pubsub.publish(events.res.error, error)
})
export default events