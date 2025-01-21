import { WebSocketServer } from "ws";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

// create the ws server
const wss = new WebSocketServer({port: 8080})

console.log(`ws server is running on: ws://localhost:8080`)

//handle client 
wss.on('connection', function connection(ws, request) {
    console.log("new client connected")

    const url = request.url;
    if(!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1])
    const token = queryParams.get('token') ?? ""
    const decoded = Jwt.verify(token, JWT_SECRET)
    
    if(!decoded || !(decoded as JwtPayload).userId) {
        ws.close();
        return
    }
    //handle msg from the client
    ws.on('message', function message(data) {
        console.log(`recieved the msg: ${data}`)

        // echo the msg to the client
        ws.send(`you said: ${data}`)
    })

    ws.on('close', () => {
        console.log("client disconnected")
    })

})