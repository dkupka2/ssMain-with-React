import {
    tables,
    lists,
    // socket keys
    REQUEST_LIST,
    REQUEST_LOCAL,
    REQUEST_GLOBAL,
} from '../store/actions'

// global:
// local:
// compound: 
//     Conflicts:
//         global:
//         local:

let typeKeys = {
    list: REQUEST_LIST,
    local: REQUEST_LOCAL,
    global: REQUEST_GLOBAL
}

let callAPI = (acct, type, table) => {
    if (type !== "compound") table = tables[type][table]
    switch (type) {
        case "compound":
                // get tables by compound table

                tables.map((table) => {
                    socket.emit(REQUEST_GLOBAL, {
                        acct, table: keys.tables.global[table]
                    })
                })
        return
        default:
            socket.emit(typeKeys[type], {acct, table} )
    }
}

export const restRequest = (acct, type, table) => {
    alert(`acct: ${acct} type: ${type} table: ${table}`)
}