let keys = {
    actions: {
        loadTable: "load table"
    },
    banner: {
        close: "close banner",
        update: "update banner",
    },
    req: {
        local: "local table request",
        backup: "backup request",
        global: "global table request",
        conlflicts: "conflicts request",
        validation: "validation request",
    },
    res: {
        error: "rest error",
        backups: "backups response",
        restApi: "restapi response",
        validation: "validation response",
    }, 
    tables: {
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
            Message_View_Conditions: "PT_MDTPL",
            // Dispatch_Delivery_Table: "PT_PROCDET",
            Dispatch_Contact_Locator: "PT_DCL",
        },
        compound: {
            conflicts: {
                local: {
                    Form: "OE_FORM",
                    Autos_on_Save: "PT_AUTOA",
                    Autos_on_Deliver: "PT_AUTOB",
                    Batch_Conditions: "PT_BATCH",
                    Dispatch_Conditions: "PT_CONDLIB",
                    Message_View_Conditions: "PT_MDTPL",
                    Dispatch_Contact_Locator: "PT_DCL",
                },
                global: {
                    Timed_Actions: "PT_TACTION",
                    Scheduled_Reminders: "PTREMIND",
                    Scheduled_Deliveries: "PT_SCHED",
                }
            }
        }
    },  
    ui: {
        ADD_ACCT: "aA",
        SELECT_ACCT: "sA",
        SELECT_TABLE: "sT",
    }
}

module.exports = {
    keys
}