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
            local: {
                Form: "OE_FORM",
                Autos_on_Save: "PT_AUTOA",
                Autos_on_Deliver: "PT_AUTOB",
                Batch_Conditions: "PT_BATCH",
                Dispatch_Conditions: "PT_CONDLIB",
                Dispatch_Contact_Locator: "PT_DCL",
                Message_View_Conditions: "PT_MDTPL",
            },
            global: {
                Timed_Actions: "PT_TACTION",
                Scheduled_Deliveries: "PT_SCHED",
                Scheduled_Reminders: "PTREMIND",
            }
        }
    }
}

tables.lists = {
    global: Object.keys(tables.global),
    local: Object.keys(tables.local),
    compound: Object.keys(tables.compound)
}

for (let list of tables.lists.compound) {
    tables.lists[list] = Object.keys( tables.compound[list].local ).concat( Object.keys( tables.compound[list].global ) )
}

console.log(tables.lists.Conflicts)