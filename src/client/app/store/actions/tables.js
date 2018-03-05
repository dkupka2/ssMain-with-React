export const tables = {
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
    compound: {
        Conflicts: {
            local: [
                "OE_FORM",
                "PT_AUTOA",
                "PT_AUTOB",
                "PT_BATCH",
                "PT_CONDLIB",
                "PT_DCL",
                "PT_MDTPL",
            ],
            global: [
                "PT_TACTION",
                "PT_SCHED",
                "PTREMIND",
            ]
        }
    },
    revertKeys: {}
}

tables.lists = {
    global: Object.keys(tables.global),
    local: Object.keys(tables.local),
    compound: Object.keys(tables.compound)
}

for (let key of tables.lists.global) {
    tables.revertKeys[ tables.global[key] ] = key
}

for (let key of tables.lists.local) {
    tables.revertKeys[ tables.local[key] ] = key
}