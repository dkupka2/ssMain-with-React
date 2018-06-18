import io from 'socket.io-client'
import {
    tables,
    // event keys
    RELAY_TABLES,
} from  '../store/'

export const socket = io.connect('http://localhost:8000/restapi')

socket.on('connect', () => {
    console.log('dispatcher connected to socket client')
    socket.emit(RELAY_TABLES, tables)
})
