import filterTable from '../'

export const loadCompoundFromCache = data => (filterTable) => {
    let arr = [],
        { type, acct, optTable, accts } = data
    // map over tables list
    tables.compoundLists[optTable].map( targetTable => {
        // filter and concat most recent cache
        targetTable = tables.revertKeys[targetTable]
        // if cache has data
        if (accts[acct][targetTable].length > 0) {
            // filter and aggregate data
            arr = arr.concat(
                filterTable(
                    targetTable,
                    getLastArray( accts[acct][targetTable] ),
                    optTable
                )
            )
        }
    }) // strip out undefined / null entries
    return { body: cleanArr(arr) }
}

export const loadCompound = data =>
    loadCompoundFromCache(data)(filterTable)
