export const viewDispatchProcedures = row => {
    let { NAME, ACTIVE, RAWSTEPS } = row
    return {
        NAME,
        ACTIVE: ACTIVE ? 'Y' : 'N',
        RAWSTEPS
    }
}
