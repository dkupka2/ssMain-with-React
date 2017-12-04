export default fTable = {
    // Tables
    Autos_on_Save: {
        alias: "PT_AUTOA",
        columns: ["ORDER", "ACTIVE", "CONDITION", "CONTACT", "TASDSTATUS", "DESC", "COPYTOACCT"],
        getFiltered(object, type) {
            let { ORDER, DESC, ACTIVE, CONDITION, CONTACT, COPYTOACCT } = object
            return type === "conflicts" ?
            {
                document: "auto-a",
                location: `${ORDER}: ${DESC}`,
                condition: CONDITION,
                active: ACTIVE
            } : {
                ORDER,
                DESC,
                ACTIVE: ACTIVE ? "Y" : "N",
                CONDITION,
                CONTACT,
                COPYTOACCT
            }
        }
    },
    Autos_on_Deliver: {
        alias: "PT_AUTOB", 
        columns: ["ORDER", "ACTIVE", "CONDITION", "CONTACT", "TASDSTATUS", "DESC"],
        getFiltered(object, type) {
            let { ORDER, DESC, CONDITION, ACTIVE } = object
            return type === "conflicts" ?
            {
                document: "auto-b",
                location: `${ORDER}: ${DESC}`,
                condition: CONDITION,
                active: ACTIVE
            } : {
                ORDER,
                DESC,
                ACTIVE: ACTIVE ? "Y" : "N",
                CONDITION
            }
        }
    },
    Form: {
        alias: "OE_FORM", 
        columns: ["LABEL", "HIGHLIGHT", "PAGE_NUM", "L_ROW", "L_COL", "GET_FIELD", "GET_TYPE", "G_REQUIRED", "HELP_TEXT", "LIST_POP", "LIST_REQ", "FORMULA", "INIT_VAL", "PARAGRAPH", "HAS_PARA", "LIST_NAME", "LIST_FILE", "SKIP_LABEL", "SKIP_FILE", "SKIP_NAME", "SAVE_OK", "HELP_PARA", "LISTgetFiltered", "CALCULATE", "G_FILLED", "WYG_ACTION", "VALIDONLY", "URL", "G_PICTURE", "G_LENGTH"],
        getFiltered(object, type) {
            let { PAGE_NUM, L_ROW, L_COL, LABEL, HAS_PARA, PARAGRAPH, GET_FIELD, GET_TYPE, G_LENGTH, G_PICTURE, FORMULA, LIST_NAME, SKIP_NAME, SKIP_LABEL, SAVE_OK } = object
            switch (type) {
                case "conflicts":
                    return {
                        document: "oe form",
                        location: `page ${PAGE_NUM} row ${L_ROW} column ${L_COL}`,
                        condition: FORMULA,
                        active: `${FORMULA && FORMULA.toString().slice(0,1) !== "~"}`,
                    }
                    break
                default:
                    return {
                        WHERE: `page ${PAGE_NUM} row ${L_ROW} column ${L_COL}`,
                        LABEL,
                        PARAGRAPH: HAS_PARA ? PARAGRAPH : "N/A",
                        VARIABLE: `${GET_FIELD}: ${GET_TYPE} ${G_LENGTH}`,
                        FORMAT: G_PICTURE,
                        FORMULA,
                        LIST_NAME,
                        SKIP_NAME,
                        SKIP_LABEL,
                        SAVE_OK,
                    }
            }
        }
    },
    Orders: {
        getFiltered(object) {
            return object
        }
    },
    Customer_Database: {
        getFiltered(object) {
            delete object.ROWID
            return object
        }
    },
    History: {
        getFiltered(object) {
            delete object.ROWID
            return object
        }
    },
    Picklists: {
        getFiltered(object) {
            delete object.ROWID
            return object
        }
    },
    Skiplists: {
        getFiltered(object) {
            delete object.ROWID
            return object
        }
    },
    Contacts: {
        getFiltered(object) {
            let { NAME, CONTACT, ON_CALL, RECALL, MSG_TYPES, TEMPLATES, FORM_NAME, COMMANDS, VISIBLE, DEL_TO, TYPE, NUMBER, EMAIL_ADDY, SUBJECT, PIN, SM_USER } = object
            return {
                NAME,
                CONTACT: getFilteredContact("contacts", object),
                ON_CALL,
                RECALL,
                MSG_TYPES,
                TEMPLATE,
                FORM_NAME,
                COMMANDS,
                VISIBLE: VISIBLE ? "Y" : "N",
                DEL_TO: DEL_TO ? "Y" : "N"
            }
        }
    },
    Abend: {
        getFiltered(object) {
            delete object.ROWID
            return object
        }
    },
    Help_Topics: {
        getFiltered(object) {
            delete object.ROWID
            return object
        }
    },
    Dispatch_Procedures: {
      getFiltered(object)   {
            let { NAME, ACTIVE, RAWSTEPS } = object
            return {
                NAME,
                ACTIVE: ACTIVE ? "Y" : "N",
                RAWSTEPS
            }
        }
    },
    Dispatch_Conditions: {
        alias: "PT_CONDLIB", 
        columns: ["NAME", "VISIBLE", "TESTFIELD", "LRFLAG", "COMPTYPE", "DATA1", "DATA2", "DATALIST", "COMPOUND", "DESCR"],
        getFiltered(object, type) {
            let { NAME, VISIBLE, TESTFIELD, COMPTYPE, COMPARISON, DATA1, DATA2, DESC } = object
            return type === "conflicts" ? 
            {
                document: "dispatch conditions",
                location: NAME,
                condition: `compares ${TESTFIELD} to ${DATA1} or ${DATA2}`,
                active: VISIBLE,
            } : {
                NAME,
                VISIBLE,
                TESTFIELD,
                COMPTYPE,
                COMPARISON: `${DATA1} - ${DATA2} - ${DESCR}`
            }
        }
    },
    Batch_Conditions: {
        alias: "PT_BATCH", 
        columns: ["ORDER", "ACTIVE", "CONDITION", "CONTACT", "DESC"],
        getFiltered(object, type) {
            let { ORDER, CONDITION, ACTIVE, DESC, CONTACT } = object
            return type === "conflicts" ?
            {
                document: "scheduled delivery conditions",
                location: `${ORDER} ${DESC}`,
                condition: CONDITION,
                active: ACTIVE,
            } : {
                ORDER,
                DESC, 
                ACTIVE: ACTIVE ? "Y" : "N",
                CONDITION,
                CONTACT
            }
        }
    },
    Dispatch_Contact_Locator: {
        alias: "PT_DCL", 
        columns: ["ORDER", "CONDITION", "CONTACT", "SOFTSEEK", "FIELD", "DESC"],
        getFiltered(object, type) {
            let { ORDER, DESC, CONDITION, CONTACT, FIELD, SOFTSEEK } = object
            return type = "conflicts" ?
            {
                document: "dcl",
                location: `${ORDER}: ${DESC}`,
                condition: CONDITION,
                active: `${CONDITION == true}`,
            } : {
                ORDER,
                DESC,
                CONDITION,
                CONTACT,
                FIELD: FIELD.slice(9,-1),
                SOFTSEEK: SOFTSEEK ? "Y" : "N"
            }
        }
    },
    Message_View_Conditions: {
        alias: "PT_MDTPL", 
        columns: ["ORDER", "FORMULA", "TEMPLATE", "TEMPLATE_W"],
        getFiltered(object, type) {
            let { ORDER, TEMPLATE, FORMULA } = object
            return type === "conflicts" ?
            {
                document: "message view conditions",
                location: ORDER,
                condition: FORMULA,
                active: `${ORDER == true && CONDITION == true}`,
            } : {
                ORDER,
                TEMPLATE,
                FORMULA
            }
        }
    },
    // getFiltereded tables
    Timed_Actions: {
        alias: "PT_TACTION", 
        columns: ["ACTIVE", "CLIENT_ID", "ID_NUMBER", "DESC", "TYPE", "DATE", "TIME", "DOW", "LAST_DATE", "MSG_TYPES", "TASDSTATUS", "EXCLUDE", "INCLUDE", "DATA", "CONDITION", "NOTES"],
        getFiltered(object, type) {
            let { DESC, CONDITION, MSG_TYPES, TYPE, DATE, TIME, INCLUDE, EXCLUDE, ACTIVE, DATA, TASDSTATUS } = object
            TYPE = convertValue(TYPE, "timed auto type")
            return type === conflicts ?
            {
                document: "timed autos",
                location: `${TYPE}: ${DESC}`,
                condition: CONDITION,
                active: ACTIVE,
            } : {
                TYPE,
                DESC,
                CONDITION, 
                MSG_TYPES: convertValue(MSG_TYPES, "message status"),
                TASDSTATUS: convertValue(TASDSTATUS, "message status"),
                DATE,
                TIME,
                INCLUDE,
                EXCLUDE,
                ACTIVE: ACTIVE ? "Y" : "N",
                DATA
            }
        }
    },
    Scheduled_Deliveries: {
        alias: "PT_SCHED", 
        columns: ["CLIENT_ID", "TIME", "DAYS", "CONTACT", "BATCH", "SHELL_TO", "MACHINE_ID", "ACTIVE", "EXCLUDE", "NOTES", "PRIORDAYS", "INC_DELIV", "DELIV_ONLY", "COMMANDS"],
        getFiltered(object, type) {
            let { CONTACT, DAYS, EXCLUDE, TIME, ACTIVE } = object
            return type === "conflicts" ?
            {
                document: "scheduled deliveries",
                location: "N/A",
                condition: "SEE CONDITIONS",
                active: ACTIVE ? " Y" : "N",
            } : {
                CONTACT,
                DAYS: convertValue(DAYS, "days of the week"),
                EXCLUDE: convertValue(EXCLUDE, "holidays"),
                TIME,
                ACTIVE: ACTIVE ? "Y" : "N",
            }
        }
    },
    Scheduled_Reminders: {
        alias: "PTREMIND", 
        columns: ["ACTIVE", "CLIENT_ID", "ID_NUMBER", "DESC", "DATE", "TIME", "DOW", "LAST_DATE", "LAST_TIME", "EXCLUDE", "INCLUDE", "INSTRUCT", "OPER_ID", "CONDITION", "MSG_TYPES"],
        getFiltered(object, type) {
            let { DESC, CONDITION, ACTIVE, TIME, EXCLUDE, INCLUDE, MSG_TYPES } = object
            return type === "conflicts" ?
            {
                document: "scheduled reminders",
                location: DESC,
                condition: CONDITION,
                active: ACTIVE ? "Y" : "N",
            } : {
                DESC,
                CONDITION,
                ACTIVE: ACTIVE ? "Y" : "N",
                DOW: convertValue(DOW, "days of the week"),
                TIME,
                INCLUDE: convertValue(INCLUDE, "system holidays"),
                EXCLUDE: convertValue(EXCLUDE,"system holidays"),
                MSG_TYPES,
            }
        }
    }
}