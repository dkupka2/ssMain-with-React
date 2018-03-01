import {
    tables,
    // socket keys
    REQUEST_LIST,
    REQUEST_LOCAL,
    REQUEST_GLOBAL,
} from '../store/actions'

import 

let typeKeys = {
    list: REQUEST_LIST,
    local: REQUEST_LOCAL,
    global: REQUEST_GLOBAL
}

export const restRequest = (acct, type, table) => {
    if (type !== "compound") {
        table = tables[type][table]
        socket.emit(typeKeys[type], {acct, table})
    } else { // get tables by compound table
        for ( let type of Object.keys( tables.compound[table] ) ) {
            tables.compound[table][type].map((key) => {
                socket.emit(typeKeys[type], { acct, table: key })
            })
        }
    }
}