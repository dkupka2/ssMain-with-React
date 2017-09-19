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
    },
    multiTable: {
        Conflicts: "CONFLICTS",
    },
    req: {
        restApi: "restapi request"
    },
    res: {
        restApi: "restapi response"
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
