export const cacheTable = payload => {
    let { accts, acct, resTable, data, from } = payload
    accts = Object.assign( {}, accts )
    accts[acct][resTable] = accts[acct][resTable].concat(
        [data]
    )
    return { type: CACHE_TABLE, accts: accts }
}
