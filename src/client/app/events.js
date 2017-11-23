import Pubsub from 'pubsub-js'
import io from 'socket.io-client'

// let os = require('os')
// console.log(os.networkInterfaces())
// let ipv4 = os.networkInterfaces()['Local Area Connection'][1]['address']

const socket = io.connect("http://localhost:8000/restapi")

socket.on("connect", () => {
    console.log("connected to socket server")
})

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
        Picklists: "OE_PKLST",
        On_Call: "PTONCALL",
        Skiplists: "OE_SKIP",
        Contacts: "PT_CONTC",
        Abend: "OE_ABEND",
        Help_Topics: "OE_HELP",
        Dispatch_Procedure: "PT_PROC",
        Dispatch_Delivery_Table: "PT_PROCDET",
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

let callAPI = (event, data) => {
    let request
    let type = data.type
    let acct = data.acct
    let table = events[type === "table" ? "loadTable" : "filterTable"][data.table]
    switch (type) {
        case "conflicts":
            getConflicts(acct)
        return
        case "table":
            socket.emit(events.req.table, `${acct}/${table}?&out=json`)
        return
        case "filtered":
            socket.emit(events.req.filtered, {acct, table} )
        return
        default:
            alert("error in callAPI switch")
        return
    }
}

let revertTableName = (val) => { // convert table name back from prop value
    let tables = Object.assign({}, events.loadTable, events.filterTable)
    for (let table in tables) {
        if (tables[table] === val) return table
    }
}

let getConflicts = (acct) => {
    Promise.all([
        Object.keys(events.loadTable).map((table) => callAPI("",{acct, table, type: "table"})),
        Object.keys(events.filterTable).map((table) => callAPI("",{acct, table, type: "filtered"}))
    ])
    .catch(err => alert(err) )
}

Pubsub.subscribe(events.actions.loadTable, callAPI)

socket.on(events.res.restApi, (data) => {
    Pubsub.publish(events.res.restApi, Object.assign({}, data, {
        table: revertTableName(data.table)
    }))
})

let validation = (event, acct) => {
    socket.emit(events.req.validation, acct)
}

Pubsub.subscribe(events.req.validation, validation)

socket.on(events.res.validation, (data) => {
    Pubsub.publish(events.res.validation, data)
})

socket.on(events.res.backups, (data) => {
    Pubsub.publish(events.res.backups, data)
})

let backupAccts = (event, acct) => {
    socket.emit(events.req.backup, acct)
}

Pubsub.subscribe(events.req.backup, backupAccts)

socket.on(events.res.error, (error) => {
    Pubsub.publish(events.res.error, error)
})

export default events