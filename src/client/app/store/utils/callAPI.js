import { socket } from '../socket'
import { tables } from '../'

export const callAPI_piRest = acct => type => table => tables => socket => {
    if (type !== 'compound') {
        table = tables[type][table]
        socket.emit( tables.requestKeys[type], {acct, table} )
    } else { // get tables by compound table
        for ( let type of Object.keys( tables.compound[table] ) ) {
            tables.compound[table][type].map( (key) => {
                socket.emit(
                    tables.requestKeys[type], {
                        acct,
                        table: key
                    }
                )
            })
        }
    }
}

export const callAPI = (acct, type, table) =>
    callAPI_piRest(acct)(type)(table)(tables)(socket)
