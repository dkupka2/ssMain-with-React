import { applyView } from '../'
import { getLastArraY } from '../../services'

export const loadFromCache = data => applyView => {
    data = { ...data }
    let { type, acct, optTable, accts } = data,
        targetArray, body = []
    if ( tables.lists.compound.includes(optTable) ) {
        // map over tables list
        tables.compoundLists[optTable].map( targetTable => {
            // filter and concat most recent cache
            targetTable = tables.revertKeys[targetTable]
            // cacheData from target table
            targetArray = accts[acct][targetTable]
            // if cache has data
            if (targetArray.length > 0) {
                // filter and aggregate data
                body = [
                    ...body,
                    ...(applyView(targetTable)
                        (getLastArray(targetArray))
                        (optTable)
                    )
                ]
            }
        })
    } else {
        // if table data exists in accts.acct[table]
        if (accts[acct][optTable].length > 0) {
            // coerce viewTable to table value for single document tables
            if (! viewTable) viewTable = table
            // filter table
            body = body.concat(
                applyView(optTable)(getLastArray( accts[acct][optTable]))
            )
        }
    }
    // strip out undefined / null entries
    return { body: cleanArr(body) }
}

export const loadCache = data =>
    loadFromCache(data)(applyView)
