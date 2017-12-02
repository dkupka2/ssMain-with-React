let convertValue = (value, type) => {
    let final
    switch (type) {
        case "message status":
            final = []
            if ( value.includes(1) ) rstring.push("delivered")
            if ( value.includes(2) ) rstring.push("hold")
            if ( value.includes(3) ) rstring.push("un-delivered")
            if ( value.includes(4) ) rstring.push("priority")
            return final.join(" ")
            break
        case "timed auto type":
            if ( value.includes(1) ) final = "add message"
            if ( value.includes(2) ) final = "change status"
            if ( value.includes(3) ) final = "timed action"
            return final
            break
        case "days of the week":
            final = []
            if ( value.includes(1) ) final.push("sunday")
            if ( value.includes(2) ) final.push("monday")
            if ( value.includes(3) ) final.push("tuesday")
            if ( value.includes(4) ) final.push("wednesday")
            if ( value.includes(5) ) final.push("thursday")
            if ( value.includes(6) ) final.push("friday")
            if ( value.includes(7) ) final.push("saturday")
            return final.join(" ")
            break
        case "holidays":
            final = []
            if ( value.includes(H01) ) final.push("NEW YEARS DAY")
            if ( value.includes(H02) ) final.push("MARTIN LUTHER KING DAY")
            if ( value.includes(H03) ) final.push("PRESIDENTS DAY")
            if ( value.includes(H04) ) final.push("PATRIOTS DAY")
            if ( value.includes(H05) ) final.push("MEMORIAL DAY")
            if ( value.includes(H06) ) final.push("INDEPENDENCE DAY")
            if ( value.includes(H07) ) final.push("LABOR DAY")
            if ( value.includes(H08) ) final.push("COLUMBUS DAY")
            if ( value.includes(H09) ) final.push("VETERANS DAY")
            if ( value.includes(H10) ) final.push("THANKSGIVING DAY")
            if ( value.includes(H11) ) final.push("BLACK FRIDAY")
            if ( value.includes(H12) ) final.push("CHRISTMAS DAY")
            if ( value.includes(S1) ) final.push("BOXING DAY")
            if ( value.includes(S2) ) final.push("SPECIAL DAY 2")
            if ( value.includes(S3) ) final.push("SPECIAL DAY 3")
            return final.join(" ")
        case "contacts":
            let { NUMBER, OVERDIAL, PIN, EMAIL_ADDY, SUBJECT, SM_USER } = value
            final = []
            if (NUMBER && NUMBER !== " ") final.push(NUMBER)
            if (OVERDIAL && OVERDIAL !== " ") final.push(OVERDIAL)
            if (PIN && PIN !== " ") final.push(`$:{PIN}`)
            if (EMAIL_ADDY && EMAIL_ADDY !== " ") final.push(EMAIL_ADDY)
            if (SUBJECT && SUBJECT !== " ") final.push(`$:{SUBJECT}`)
            if (SM_USER && SM_USER !== " ") final.push(SM_USER)
            return final.join(" ")
        default:
            alert("unexpected type passed to convertValue switch")
    }
}

let filter = {
    // Tables
    Autos_on_Save: {
        alias: "PT_AUTOA",
        columns: ["ORDER", "ACTIVE", "CONDITION", "CONTACT", "TASDSTATUS", "DESC", "COPYTOACCT"],
        getTableData(object, type) {
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
        getTableData(object, type) {
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
        columns: ["LABEL", "HIGHLIGHT", "PAGE_NUM", "L_ROW", "L_COL", "GET_FIELD", "GET_TYPE", "G_REQUIRED", "HELP_TEXT", "LIST_POP", "LIST_REQ", "FORMULA", "INIT_VAL", "PARAGRAPH", "HAS_PARA", "LIST_NAME", "LIST_FILE", "SKIP_LABEL", "SKIP_FILE", "SKIP_NAME", "SAVE_OK", "HELP_PARA", "LISTFILTER", "CALCULATE", "G_FILLED", "WYG_ACTION", "VALIDONLY", "URL", "G_PICTURE", "G_LENGTH"],
        getTableData(object, type) {
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
        getTableData(object) {
            return object
        }
    },
    Customer_Database: {
        getTableData(object) {
            delete object.ROWID
            return object
        }
    },
    History: {
        getTableData(object) {
            delete object.ROWID
            return object
        }
    },
    Picklists: {
        getTableData(object) {
            delete object.ROWID
            return object
        }
    },
    Skiplists: {
        getTableData(object) {
            delete object.ROWID
            return object
        }
    },
    Contacts: {
        getTableData(object) {
            let { NAME, CONTACT, ON_CALL, RECALL, MSG_TYPES, TEMPLATES, FORM_NAME, COMMANDS, VISIBLE, DEL_TO, TYPE, NUMBER, EMAIL_ADDY, SUBJECT, PIN, SM_USER } = object
            return {
                NAME,
                CONTACT: filterContact("contacts", object),
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
        getTableData(object) {
            delete object.ROWID
            return object
        }
    },
    Help_Topics: {
        getTableData(object) {
            delete object.ROWID
            return object
        }
    },
    Dispatch_Procedures: {
      getTableData(object)   {
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
        getTableData(object, type) {
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
        getTableData(object, type) {
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
        getTableData(object, type) {
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
        getTableData(object, type) {
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
    // filtered tables
    Timed_Actions: {
        alias: "PT_TACTION", 
        columns: ["ACTIVE", "CLIENT_ID", "ID_NUMBER", "DESC", "TYPE", "DATE", "TIME", "DOW", "LAST_DATE", "MSG_TYPES", "TASDSTATUS", "EXCLUDE", "INCLUDE", "DATA", "CONDITION", "NOTES"],
        getTableData(object, type) {
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
        getTableData(object, type) {
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
        getTableData(object, type) {
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

export default filter