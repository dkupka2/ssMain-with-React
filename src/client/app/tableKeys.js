let tables = {
    Autos_on_Save: { alias: "PT_AUTOA",
        columns: ["ORDER","ACTIVE","CONDITION","CONTACT","TASDSTATUS","DESC","COPYTOACCT"],
        getConflictFields(ORDER, DESC, CONDITION, ACTIVE) {
            return {
                document: "auto-a",
                location: `${ORDER}: ${DESC}`,
                condition: `${CONDITION}`,
                active: `${ACTIVE}`
            }
        }
    },
    Autos_on_Deliver: { alias: "PT_AUTOB", 
        columns: ["ORDER","ACTIVE","CONDITION","CONTACT","TASDSTATUS","DESC"],
        getConflictFields(ORDER, DESC, CONDITION, ACTIVE) {
            return {
                document: "auto-b",
                location: `${ORDER}: ${DESC}`,
                condition: `${CONDITION}`,
                active: `${ACTIVE}`
            }
        }
    },
    Dispatch_Contact_Locator: { alias: "PT_DCL", 
        columns: ["ORDER","CONDITION","CONTACT","SOFTSEEK","FIELD","DESC"],
        getConflictFields(ORDER, DESC, CONDITION) {
            return {
                document: "dcl",
                location: `${ORDER}: ${DESC}`,
                condition: `${CONDITION}`,
                active: `${CONDITION ? TRUE : FALSE}`
            }
        }
    },
    Timed_Actions: { alias: "PT_TACTION", 
        columns: ["ACTIVE","CLIENT_ID","ID_NUMBER","DESC","TYPE","DATE","TIME","DOW","LAST_DATE","MSG_TYPES","TASDSTATUS",
            "EXCLUDE","INCLUDE","DATA","CONDITION","NOTES"],
        getConflictFields(ACTIVE, DESC, CONDITION) {
            return {
                document: "timed autos",
                location: "",
                condition: "",
                active: ""
            }
        }
    },
    Scheduled_Deliveries: { alias: "PT_SCHED", 
        columns: ["CLIENT_ID","TIME","DAYS","CONTACT","BATCH","SHELL_TO","MACHINE_ID","ACTIVE","EXCLUDE","NOTES", "PRIORDAYS",
            "INC_DELIV","DELIV_ONLY","COMMANDS"],
        conflictFields: {
            document: "",
            location: "",
            condition: "",
            active: ""
        }
    },
    Scheduled_Reminders: { alias: "PTREMIND", 
        columns: ["ACTIVE","CLIENT_ID","ID_NUMBER","DESC","DATE","TIME","DOW","LAST_DATE","LAST_TIME","EXCLUDE","INCLUDE",
            "INSTRUCT","OPER_ID","CONDITION","MSG_TYPES"],
        conflictFields: {
            document: "",
            location: "",
            condition: "",
            active: ""
        }
    },
    Form: { alias: "OE_FORM", 
        columns: ["LABEL","HIGHLIGHT","PAGE_NUM","L_ROW","L_COL","GET_FIELD","GET_TYPE","G_REQUIRED","HELP_TEXT","LIST_POP",
            "LIST_REQ","FORMULA", "INIT_VAL","PARAGRAPH","HAS_PARA","LIST_NAME","LIST_FILE","SKIP_LABEL","SKIP_FILE","SKIP_NAME",
            "SAVE_OK","HELP_PARA","LISTFILTER","CALCULATE","G_FILLED","WYG_ACTION","VALIDONLY","URL"],
        conflictFields: {
            document: "",
            location: "",
            condition: "",
            active: ""
        }
    },
    Message_View_Conditions: { alias: "PT_MDTPL", 
        columns: ["ORDER","FORMULA","TEMPLATE","TEMPLATE_W"],
        conflictFields: {
            document: "",
            location: "",
            condition: "",
            active: ""
        }
    },
    Batch_Conditions: { alias: "PT_BATCH", 
        columns: ["ORDER","ACTIVE","CONDITION","CONTACT","DESC"],
        conflictFields: {
            document: "",
            location: "",
            condition: "",
            active: ""
        }
    },
    Dispatch_Conditions: { alias: "PT_CONDLIB", 
        columns: ["NAME","VISIBLE","TESTFIELD","LRFLAG","COMPTYPE","DATA1","DATA2","DATALIST","COMPOUND","DESCR"],
        conflictFields: {
            document: "",
            location: "",
            condition: "",
            active: ""
        }
    }
}

default export tables