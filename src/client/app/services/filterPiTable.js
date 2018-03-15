const convert = ( value, type, final = [] ) => {
    switch (type) {
        case "message status":
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
            if ( value.includes(1) ) final.push("Sun")
            if ( value.includes(2) ) final.push("Mon")
            if ( value.includes(3) ) final.push("Tues")
            if ( value.includes(4) ) final.push("Wed")
            if ( value.includes(5) ) final.push("Thurs")
            if ( value.includes(6) ) final.push("Fri")
            if ( value.includes(7) ) final.push("Sat")
            return final.join(" ")
            break
        case "holidays":
            if ( value.includes("H01") ) final.push("NEWYEARS")
            if ( value.includes("H02") ) final.push("MLK")
            if ( value.includes("H03") ) final.push("PRESIDENTS")
            if ( value.includes("H04") ) final.push("PATRIOTS")
            if ( value.includes("H05") ) final.push("MEMORIAL")
            if ( value.includes("H06") ) final.push("INDEPENDENCE")
            if ( value.includes("H07") ) final.push("LABOR")
            if ( value.includes("H08") ) final.push("COLUMBUS")
            if ( value.includes("H09") ) final.push("VETERANS")
            if ( value.includes("H10") ) final.push("THANKSGIVING")
            if ( value.includes("H11") ) final.push("BLACKFRIDAY")
            if ( value.includes("H12") ) final.push("CHRISTMAS")
            if ( value.includes("S1") ) final.push("BOXING")
            // if ( value.includes("S2") ) final.push("SPECIAL DAY 2")
            // if ( value.includes("S3") ) final.push("SPECIAL DAY 3")
            return final.join(" ")
        case "contacts":
            let { NUMBER, OVERDIAL, PIN, EMAIL_ADDY, SUBJECT, SM_USER } = value
            if (PIN && PIN !== " ") final.push(`$:{PIN}`)
            if (NUMBER && NUMBER !== " ") final.push(NUMBER)
            if (SUBJECT && SUBJECT !== " ") final.push(`$:{SUBJECT}`)
            if (SM_USER && SM_USER !== " ") final.push(SM_USER)
            if (OVERDIAL && OVERDIAL !== " ") final.push(OVERDIAL)
            if (EMAIL_ADDY && EMAIL_ADDY !== " ") final.push(EMAIL_ADDY)
            return final.join(" ")
        default:
            alert(`unexpected type passed to convertValue switch: ${type}`)
    }
}

const removeROWID = (obj) => {
    delete obj.ROWID
    return obj
}

const filterPiTable = {
    // local tables
    Autos_on_Save: {
        alias: "PT_AUTOA",
        columns: ["ORDER", "ACTIVE", "CONDITION", "CONTACT", "TASDSTATUS", "DESC", "COPYTOACCT"],
        getFiltered(object, type) {
            let { ORDER, DESC, ACTIVE, CONDITION, CONTACT, COPYTOACCT } = object
            return type === "Conflicts" ?
            {
                document: "auto-a",
                location: `${ORDER}: ${DESC}`,
                condition: CONDITION,
                active: ACTIVE ? "" : "NO"
            } : {
                ORDER,
                DESC,
                ACTIVE: ACTIVE ? "" : "NO",
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
            return type === "Conflicts" ?
            {
                document: "auto-b",
                location: `${ORDER}: ${DESC}`,
                condition: CONDITION,
                active: ACTIVE ? "" : "NO"
            } : {
                ORDER,
                DESC,
                ACTIVE: ACTIVE ? "" : "NO",
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
                case "Conflicts":
                    if (GET_FIELD && FORMULA) {
                        return {
                            document: "oe form",
                            location: `page:${PAGE_NUM} row:${L_ROW} column:${L_COL}`,
                            condition: `${GET_FIELD} : ${FORMULA}`,
                            active: `${FORMULA && FORMULA.toString().slice(0,1) !== "~" ? "" : "NO"}`,
                        }
                    } else {
                        return {}
                    }
                    break
                default:
                    return {
                        WHERE: `P:${PAGE_NUM} R:${L_ROW} C:${L_COL}`,
                        LABEL,
                        PARAGRAPH: HAS_PARA ? PARAGRAPH : "",
                        VARIABLE: G_LENGTH == 0 ? " " : `${GET_FIELD} / ${GET_TYPE} / ${G_LENGTH}`,
                        FORMAT: G_PICTURE,
                        FORMULA,
                        LIST_NAME,
                        SKIP_NAME,
                        SKIP_LABEL,
                        SAVE_OK: SAVE_OK === true ? "YES" : ""
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
            return removeROWID(object)
        }
    },
    History: {
        getFiltered(object) {
            return removeROWID(object)
        }
    },
    On_Call: {
        getFiltered(object) {
            return removeROWID(object)
        }
    },
    Picklists: {
        getFiltered(object) {
            return removeROWID(object)
        }
    },
    Skiplists: {
        getFiltered(object) {
            return removeROWID(object)
        }
    },
    Contacts: {
        getFiltered(object) {
            let { NAME, CONTACT, ON_CALL, RECALL, MSG_TYPES, TEMPLATE, FORM_NAME, COMMANDS, VISIBLE, DEL_TO, TYPE, NUMBER, EMAIL_ADDY, SUBJECT, PIN, SM_USER, } = object
            return {
                NAME,
                CONTACT: convert(object, "contacts"),
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
            return removeROWID(object)
        }
    },
    Help_Topics: {
        getFiltered(object) {
            return removeROWID(object)
        }
    },
    Dispatch_Procedures: {
      getFiltered(object) {
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
            let { NAME, VISIBLE, TESTFIELD, COMPTYPE, COMPARISON, DATA1, DATA2, DESCR } = object
            return type === "Conflicts" ?
            {
                document: "dispatch conditions",
                location: NAME,
                condition: `compares ${TESTFIELD} to ${DATA1} ${DATA2 ? `or ${DATA2}` : ``}`,
                active: "??"
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
            return type === "Conflicts" ?
            {
                document: "scheduled delivery conditions",
                location: `${ORDER} ${DESC}`,
                condition: CONDITION,
                active: ACTIVE ? "" : "NO"
            } : {
                ORDER,
                DESC,
                ACTIVE: ACTIVE ? "" : "NO",
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
            return type = "Conflicts" ?
            {
                document: "dcl",
                location: `${ORDER}: ${DESC}`,
                condition: CONDITION,
                active: CONDITION ? "" : "NO"
            } : {
                ORDER,
                DESC,
                CONDITION,
                CONTACT,
                FIELD: FIELD.slice(9, -1),
                SOFTSEEK: SOFTSEEK ? "Y" : "N"
            }
        }
    },
    Message_View_Conditions: {
        alias: "PT_MDTPL",
        columns: ["ORDER", "FORMULA", "TEMPLATE", "TEMPLATE_W"],
        getFiltered(object, type) {
            let { ORDER, TEMPLATE, FORMULA } = object
            return type === "Conflicts" ?
            {
                document: "message view conditions",
                location: ORDER,
                condition: FORMULA,
                active: ORDER ? "" : "NO"
            } : {
                ORDER,
                TEMPLATE,
                FORMULA
            }
        }
    },
    // global tables
    Timed_Actions: {
        alias: "PT_TACTION",
        columns: ["ACTIVE", "CLIENT_ID", "ID_NUMBER", "DESC", "TYPE", "DATE", "TIME", "DOW", "LAST_DATE", "MSG_TYPES", "TASDSTATUS", "EXCLUDE", "INCLUDE", "DATA", "CONDITION", "NOTES"],
        getFiltered(object, type) {
            let { DESC, CONDITION, MSG_TYPES, TYPE, DATE, TIME, INCLUDE, EXCLUDE, ACTIVE, DATA, TASDSTATUS } = object
            TYPE = convert(TYPE, "timed auto type")
            return type === "Conflicts" ?
            {
                document: "timed autos",
                location: `${TYPE}: ${DESC}`,
                condition: CONDITION,
                active: ACTIVE ? "" : "NO"
            } : {
                TYPE,
                DESC,
                CONDITION,
                MSG_TYPES: convert(MSG_TYPES, "message status"),
                TASDSTATUS: convert(TASDSTATUS, "message status"),
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
            return type === "Conflicts" ?
            {
                document: "scheduled deliveries",
                location: "N/A",
                condition: "SEE CONDITIONS",
                active: ACTIVE ? "" : "NO",
            } : {
                CONTACT,
                DAYS: convert(DAYS, "days of the week"),
                EXCLUDE: convert(EXCLUDE, "holidays"),
                TIME,
                ACTIVE: ACTIVE ? "" : "NO",
            }
        }
    },
    Scheduled_Reminders: {
        alias: "PTREMIND",
        columns: ["ACTIVE", "CLIENT_ID", "ID_NUMBER", "DESC", "DATE", "TIME", "DOW", "LAST_DATE", "LAST_TIME", "EXCLUDE", "INCLUDE", "INSTRUCT", "OPER_ID", "CONDITION", "MSG_TYPES"],
        getFiltered(object, type) {
            let { DESC, CONDITION, ACTIVE, DOW, TIME, INCLUDE, EXCLUDE, MSG_TYPES, } = object
            return type === "Conflicts" ?
            {
                document: "scheduled reminders",
                location: DESC,
                condition: CONDITION,
                active: ACTIVE ? "" : "NO",
            } : {
                DESC,
                CONDITION,
                ACTIVE: ACTIVE ? "" : "NO",
                DOW: convert(DOW, "days of the week"),
                TIME,
                INCLUDE: convert(INCLUDE, "holidays"),
                EXCLUDE: convert(EXCLUDE,"holidays"),
                MSG_TYPES,
            }
        }
    }
}

export default filterPiTable