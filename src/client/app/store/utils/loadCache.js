import {
    loadCompound,
    filterTable
} from '../'

import {
    getLastArray
} from '../../services'

export const loadFromCache = data => (loadCompound, filterTable) => {
    data = { ...data }
    let { type, acct, optTable, accts } = data
    if ( tables.lists.compound.includes(optTable) ) {
        return loadCompound(data)
    } // if table data exists in accts.acct.*table*
    if (accts[acct][optTable].length > 0) {
            // filter table
            data.body = filterTable(
                optTable,
                // get last instance of table data
                getLastArray( accts[acct][optTable] )
            )
            data.isCached = true
    } else {
        data.body = []
    }
    return data
}

export const loadCache = data =>
    loadFromCache(data)(loadCompound, filterTable)
