let tables = {
    Autos_on_Save: { alias: "PT_AUTOA",
        columns: ["ORDER","ACTIVE","CONDITION","CONTACT","TASDSTATUS","DESC","COPYTOACCT"],
        getTableData(object, type) {
            let { ORDER, DESC, ACTIVE, CONDITION, CONTACT, COPYTOACCT } = object
            let getConflictFields = (ORDER, DESC, CONDITION, ACTIVE) => {
                return {
                    document: "auto-a",
                    location: `${ORDER}: ${DESC}`,
                    condition: CONDITION,
                    active: ACTIVE,
                }
            }
            let getAllFields = (ORDER, DESC, ACTIVE, CONDITION, CONTACT, COPYTOACCT) => {
                return {
                    ORDER,
                    DESC,
                    ACTIVE: ACTIVE ? "Y" : "N",
                    CONDITION,
                    CONTACT,
                    COPYTOACCT
                }
            }
            return type === "conflicts" ? 
                getConflictFields(ORDER, DESC, CONDITION, ACTIVE) : 
                getAllFields(ORDER, DESC, ACTIVE, CONDITION, CONTACT, COPYTOACCT)
        }
    },
    Autos_on_Deliver: { alias: "PT_AUTOB", 
        columns: ["ORDER","ACTIVE","CONDITION","CONTACT","TASDSTATUS","DESC"],
        getTableData(type, object) {
            let getConflictFields = (ORDER, DESC, CONDITION, ACTIVE) => {
                return {
                    document: "auto-b",
                    location: `${ORDER}: ${DESC}`,
                    condition: CONDITION,
                    active: ACTIVE,
                }
            }
            let getAllFields = (ORDER, DESC, CONDITION, ACTIVE) => {
                return {

                }
            }
            return type === "conflicts" ? 
                getConflictFields() : 
                getAllFields()
        }
    },
    Dispatch_Contact_Locator: { alias: "PT_DCL", 
        columns: ["ORDER","CONDITION","CONTACT","SOFTSEEK","FIELD","DESC"],
        getTableData(type, object) {
            let getConflictFields = (ORDER, DESC, CONDITION) => {
                return {
                    document: "dcl",
                    location: `${ORDER}: ${DESC}`,
                    condition: CONDITION,
                    active: `${CONDITION == true}`,
                }
            }
            let getAllFields = () => {
                return {

                }
            }
            return type === "conflicts" ? 
                getConflictFields() : 
                getAllFields()
        }
    },
    Timed_Actions: { alias: "PT_TACTION", 
        columns: ["ACTIVE","CLIENT_ID","ID_NUMBER","DESC","TYPE","DATE","TIME","DOW","LAST_DATE","MSG_TYPES","TASDSTATUS",
            "EXCLUDE","INCLUDE","DATA","CONDITION","NOTES"],
            getTableData(type, object) {
            getClet onflictFields = (ACTIVE, DESC, CONDITION) => {
                return {
                    document: "timed autos",
                    location: DESC,
                    condition: CONDITION,
                    active: ACTIVE,
                }
                }
                let getAllFields = () => {
                    return {

                    }
                }
                return type === "conflicts" ? 
                    getConflictFields() : 
                    getAllFields()
        }
    },
    Scheduled_Deliveries: { alias: "PT_SCHED", 
        columns: ["CLIENT_ID","TIME","DAYS","CONTACT","BATCH","SHELL_TO","MACHINE_ID","ACTIVE","EXCLUDE","NOTES", "PRIORDAYS",
            "INC_DELIV","DELIV_ONLY","COMMANDS"],
            getTableData(type, object) {
            getClet onflictFields = (BATCH) => {
                return {
                    document: "scheduled deliveries",
                    location: "N/A",
                    condition: "SEE CONDITIONS",
                    active: BATCH,
                }
                }
                let getAllFields = () => {
                    return {

                    }
                }
                return type === "conflicts" ? 
                    getConflictFields() : 
                    getAllFields()
        }
    },
    Scheduled_Reminders: { alias: "PTREMIND", 
        columns: ["ACTIVE","CLIENT_ID","ID_NUMBER","DESC","DATE","TIME","DOW","LAST_DATE","LAST_TIME","EXCLUDE","INCLUDE",
            "INSTRUCT","OPER_ID","CONDITION","MSG_TYPES"],
            getTableData(type, object) {
            getClet onflictFields = (CONDITION, ACTIVE) => {
                return {
                    document: "scheduled reminders",
                    location: "N/A",
                    condition: CONDITION,
                    active: ACTIVE,
                }
                }
                let getAllFields = () => {
                    return {

                    }
                }
                return type === "conflicts" ? 
                    getConflictFields() : 
                    getAllFields()
        }
    },
    Form: { alias: "OE_FORM", 
        columns: ["LABEL","HIGHLIGHT","PAGE_NUM","L_ROW","L_COL","GET_FIELD","GET_TYPE","G_REQUIRED","HELP_TEXT","LIST_POP",
            "LIST_REQ","FORMULA", "INIT_VAL","PARAGRAPH","HAS_PARA","LIST_NAME","LIST_FILE","SKIP_LABEL","SKIP_FILE","SKIP_NAME",
            "SAVE_OK","HELP_PARA","LISTFILTER","CALCULATE","G_FILLED","WYG_ACTION","VALIDONLY","URL"],
            getTableData(type, object) {
            getClet onflictFields = (PAGE_NUM, L_ROW, L_COL, FORMULA) => {
                return {
                    document: "oe form",
                    location: `page ${PAGE_NUM} row ${L_ROW} column ${L_COL}`,
                    condition: FORMULA,
                    active: `${FORMULA && FORMULA.toString().slice(0,1) !== "~"}`,
                }
                }
                let getAllFields = () => {
                    return {

                    }
                }
                return type === "conflicts" ? 
                    getConflictFields() : 
                    getAllFields()
        }
    },
    Message_View_Conditions: { alias: "PT_MDTPL", 
        columns: ["ORDER","FORMULA","TEMPLATE","TEMPLATE_W"],
        getTableData(type, object) {
            let getConflictFields = (ORDER, FORMULA) => {
                return {
                    document: "message view conditions",
                    location: ORDER,
                    condition: FORMULA,
                    active: `${ORDER == true && CONDITION == true}`,
                }
            }
            let getAllFields = () => {
                return {

                }
            }
            return type === "conflicts" ? 
                getConflictFields() : 
                getAllFields()
        }
    },
    Batch_Conditions: { alias: "PT_BATCH", 
        columns: ["ORDER","ACTIVE","CONDITION","CONTACT","DESC"],
        getTableData(type, object) {
            let getConflictFields = (ORDER, CONDITION, ACTIVE) => {
                return {
                    document: "scheduled delivery conditions",
                    location: ORDER,
                    condition: CONDITION,
                    active: ACTIVE,
                }
            }
            let getAllFields = () => {
                return {

                }
            }
            return type === "conflicts" ? 
                getConflictFields() : 
                getAllFields()
        }
    },
    Dispatch_Conditions: { alias: "PT_CONDLIB", 
        columns: ["NAME","VISIBLE","TESTFIELD","LRFLAG","COMPTYPE","DATA1","DATA2","DATALIST","COMPOUND","DESCR"],
        getTableData(type, object) {
            let getConflictFields = (NAME, DATA1, VISIBLE, DATA2) => {
                return {
                    document: "dispatch conditions",
                    location: NAME,
                    condition: `compares ${TESTFIELD} to ${DATA1} or ${DATA2}`,
                    active: VISIBLE,
                }
            }
            let getAllFields = () => {
                return {

                }
            }
            return type === "conflicts" ? 
                getConflictFields() : 
                getAllFields()
        }
    }
}

default export tables