import io from 'socket.io-client'
import {
    tables,
    // event keys
    RELAY_TABLES,
    PARSE_ERROR,
    REST_ERROR,
} from  '../store/'

export const socket = io.connect('http://localhost:8000/restapi')

socket.on('connect', () => {
    console.log('dispatcher connected to socket client')
    socket.emit(RELAY_TABLES, tables)
})

socket.on(PARSE_ERROR, (e) => {
  console.log('error parsing response from RestAPI server')
})

socket.on(REST_ERROR, (e) => {
  console.log('error response from RestAPI server - see console for info')
})
