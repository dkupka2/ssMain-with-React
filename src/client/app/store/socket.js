import io from 'socket.io-client'

export const socket = io.connect("http://localhost:8000/restapi")

socket.on("connect", () => {
    console.log("dispatcher connected to socket client")
})