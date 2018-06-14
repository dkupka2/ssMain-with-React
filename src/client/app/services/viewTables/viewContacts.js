export const viewContacts = row => {
    let {
        NAME,
        CONTACT,
        ON_CALL,
        RECALL,
        MSG_TYPES,
        TEMPLATE,
        FORM_NAME,
        COMMANDS,
        VISIBLE,
        DEL_TO
    } = row
    return {
        NAME,
        CONTACT: convertPiValues(row, 'contacts'),
        ON_CALL,
        RECALL,
        MSG_TYPES,
        TEMPLATE,
        FORM_NAME,
        COMMANDS,
        VISIBLE: VISIBLE ? 'Y' : 'N',
        DEL_TO: DEL_TO ? 'Y' : 'N'
    }
}
