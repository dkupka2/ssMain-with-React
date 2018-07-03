// return a function to filter each row
export const viewConflicts = table => row => {
    let {
        ACTIVE,
        CONDITION,
        DATA1,
        DATA2,
        DESC,
        FORMULA,
        GET_FIELD,
        L_ROW,
        L_COL,
        NAME,
        ORDER,
        PAGE_NUM,
        TESTFIELD,
        TYPE,
    } = row
        switch(table) {
        case 'Form' :
                prc = `P:${PAGE_NUM} R:${L_ROW} C:${L_COL}`
            if (GET_FIELD && FORMULA) {
                return {
                    document: 'oe form',
                    location: prc,
                    condition: `${GET_FIELD} : ${FORMULA}`,
                    active: `${
                        FORMULA &&
                        FORMULA.toString().slice(0,1) !== '~' ?
                            '' : 'NO'
                    }`,
                }
            // if no formula or field return null
            } return null
        case 'Autos_on_Save' :
            return {
                document: 'auto-a',
                location: `${ORDER}: ${DESC}`,
                condition: CONDITION,
                active: ACTIVE ? '' : 'NO'
            }
        case 'Timed_Actions' :
            return {
                document: 'timed autos',
                location: `${TYPE}: ${DESC}`,
                condition: CONDITION,
                active: ACTIVE ? '' : 'NO'
            }
        case 'Autos_on_Deliver' :
            return {
                document: 'auto-b',
                location: `${ORDER}: ${DESC}`,
                condition: CONDITION,
                active: ACTIVE ? '' : 'NO'
            }
        case 'Batch_Conditions' :
            return {
                document: 'scheduled deliveries',
                location: 'N/A',
                condition: 'SEE CONDITIONS',
                active: ACTIVE ? '' : 'NO',
            }
        case 'Dispatch_Conditions' :
            return {
                document: 'dispatch conditions',
                location: `${NAME} - ${DESC}`,
                condition: `${TESTFIELD}: ${DATA1} - ${DATA2}`,
                active: 'see procedures'
            }
        case 'Scheduled_Reminders' :
            return {
                document: 'scheduled reminders',
                location: DESC,
                condition: CONDITION,
                active: ACTIVE ? '' : 'NO',
            }
        case 'Scheduled_Deliveries' :
            return {
                document: 'scheduled delivery conditions',
                location: `${ORDER} ${DESC}`,
                condition: CONDITION,
                active: ACTIVE ? '' : 'NO'
            }
        case 'Message_View_Conditions' :
            return {
                document: 'message view conditions',
                location: ORDER,
                condition: FORMULA,
                active: ORDER ? '' : 'NO'
            }
        case 'Dispatch_Contact_Locator' :
            return {
                document: 'dcl',
                location: `${ORDER}: ${DESC}`,
                condition: CONDITION,
                active: CONDITION ? '' : 'NO'
            }
        default:
            return {
                document: 'n/a',
                location: 'n/a',
                condition: 'n/a',
                active: 'n/a'
            }
    }
}
