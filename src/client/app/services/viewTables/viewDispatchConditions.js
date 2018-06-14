export const viewDispatchConditions = row => {
    let {
        NAME,
        VISIBLE,
        TESTFIELD,
        COMPTYPE,
        DATA1,
        DATA2,
        DESCR
    } = row
    return {
        NAME,
        VISIBLE,
        TESTFIELD,
        COMPTYPE,
        COMPARISON: `${DATA1} - ${DATA2} - ${DESCR}`
    }
}
