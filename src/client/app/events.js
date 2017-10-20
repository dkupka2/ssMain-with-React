import Pubsub from 'pubsub-js';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8000/restapi");

socket.on("connect", () => {
    console.log("connected to socket server");
});

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
        //Admin: "OE_ADMIN",
        Dispatch_Procedure: "PT_PROC",
        Dispatch_Delivery_Table: "PT_PROCDET",
        Dispatch_Conditions: "PT_CONDLIB",
        Dispatch_Conditions: "PT_BATCH",
        Dispatch_Contact_Locator: "PT_DCL",
        Message_View_Conditions: "PT_MDTPL",
    },
    multiTable: {
        Conflicts: "CONFLICTS",
    },
    req: {
        restApi: "restapi request"
    },
    res: {
        restApi: "restapi response"
    },   
    ui: {
        ADD_ACCT: "aA",
        SELECT_ACCT: "sA",
        SELECT_TABLE: "sT",
    }
}

let getPropName = (obj, val) => {
    for (let prop in obj) {
        if (obj[prop] === val) {
            return prop
        }
    }
}

let callAPI = (event, data) => {
    let acct = data.acct
    let table = events.loadTable[data.table]
    let request = `${acct}/${table}?&out=json`
    socket.emit(events.req.restApi, request);
}

Pubsub.subscribe(events.actions.loadTable, callAPI)

socket.on(events.res.restApi, (data) => {
    let rData = Object.assign({}, data)
    rData.table = getPropName(events.loadTable, data.table)
    console.log("table? ", rData.table)
    // data.table = events.loadTable[data.table]
    Pubsub.publish(events.res.restApi, rData)
})

let conflictsTable = (event, acct) => {
    Promise.all([
        callAPI(events.loadTable.Autos_on_Deliver),
        callAPI(events.loadTable.Autos_on_Save)
    ])
    .catch(err => {
        alert(err);
    })
}

Pubsub.subscribe(events.multiTable.Conflicts, conflictsTable);

export default events