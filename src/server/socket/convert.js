tables = {
    global: {
        Timed_Actions: "PT_TACTION",
        Scheduled_Reminders: "PTREMIND",
        Scheduled_Deliveries: "PT_SCHED",
    },
    local: {
        Form: "OE_FORM",
        // Admin: "OE_ADMIN",
        Abend: "OE_ABEND",
        Orders: "ORDERS",
        History: "PT_HIST",
        On_Call: "PTONCALL",
        Contacts: "PT_CONTC",
        Picklists: "OE_PKLST",
        Skiplists: "OE_SKIP",
        Help_Topics: "OE_HELP",
        Autos_on_Save: "PT_AUTOA",
        Autos_on_Deliver: "PT_AUTOB",
        Batch_Conditions: "PT_BATCH",
        Customer_Database: "CUSTOMER",
        Dispatch_Procedures: "PT_PROC",
        Dispatch_Conditions: "PT_CONDLIB",
        Dispatch_Contact_Locator: "PT_DCL",
        Message_View_Conditions: "PT_MDTPL",
        // Dispatch_Delivery_Table: "PT_PROCDET",
    },
    revertKeys: {}
}

Object.keys(tables.global).map( (key) => tables.revertKeys[ tables.global[key] ] = key )
Object.keys(tables.local).map( (key) => tables.revertKeys[ tables.local[key] ] = key )

tables.restKeys = Object.keys( tables.revertKeys )


module.exports = {
    convert(key) {
        return Object.keys(tables.revertKeys).includes(key) ? tables.revertKeys[key] :
            Object.keys(tables.global).includes(key) ?
                tables.global[key] :
                tables.local[key]
    }
}