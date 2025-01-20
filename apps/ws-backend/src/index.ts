import { WebSocketServer } from "ws";

// create the ws server
const wss = new WebSocketServer({port: 8080})

console.log(`ws server is running on: ws://localhost:8080`)

//handle client 
wss.on('connection', (ws) => {
    console.log("new client connected")

    //handle msg from the client
    ws.on('message', (message) => {
        console.log(`recieved the msg: ${message}`)

        // echo the msg to the client
        ws.send(`you said: ${message}`)
    })

    ws.on('close', () => {
        console.log("client disconnected")
    })

})