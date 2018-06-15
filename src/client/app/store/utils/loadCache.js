import { applyView } from '../'
import { getLastArraY } from '../../services'

const filterRow = body => target => array => table => [
    ...body,
    ...applyView(target)( getLastArray(array) )(table)
]

export const loadFromCache = data => applyView => {
    let targetArray,
        body = [],
        { type, acct, optTable, accts } = data

    if ( tables.lists.compound.includes(optTable) ) {
        // map over tables list
        tables.compoundLists[optTable].map( targetTable => {
            // revert table name to human readable
            targetTable = tables.revertKeys[targetTable]
            // cacheData from target table
            targetArray = accts[acct][targetTable]
            // if cache has data
            if (targetArray.length > 0) {
                // filter and aggregate data
                body = filterRow(body)
                    (targetTable)
                    (targetArray)
                    (optTable)
            }
        })
    } else {
        // cacheData from selected table
        targetArray = accts[acct][optTable]
        // if table data exists in accts.acct[table]
        if (targetArray.length > 0) {
            // coerce viewTable to table value for single document tables
            if (! viewTable) viewTable = table
            // filter table
            body = filterRow(body)
                (optTable)
                (targetArray)
                (optTable)
        }
    }
    // strip out undefined / null entries
    return { body: cleanArr(body) }
}

export const loadCache = data =>
    loadFromCache(data)(applyView)
