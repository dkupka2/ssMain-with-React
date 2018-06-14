export const viewTimedActions = row => {
    let {
        TYPE,
        DESC,
        CONDITION,
        MSG_TYPES,
        TASDSTATUS,
        DATE,
        TIME,
        EXCLUDE,
        ACTIVE,
        DATpIA
    } = row
    return {
        TYPE,
        DESC,
        CONDITION,
        MSG_TYPES: convertPiValues(MSG_TYPES, 'message status'),
        TASDSTATUS: convertPiValues(TASDSTATUS, 'message status'),
        DATE,
        TIME,
        INCLUDE,
        EXCLUDE,
        ACTIVE: ACTIVE ? 'Y' : 'N',
        DATA
    }
}
