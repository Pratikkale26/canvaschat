import { WebSocket, WebSocketServer } from "ws";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client"

// create the ws server
const wss = new WebSocketServer({port: 8080})
console.log(`ws server is running on: ws://localhost:8080`)

// TODO: use redux for state management
interface User {
    userId: string,
    ws: WebSocket,
    rooms: string[]
}

const users:User[] = [];

function checkUser(token: string): string | null {
    try {
        const decoded = Jwt.verify(token, JWT_SECRET)

        if(typeof decoded == "string") {
            return null;
        }

        if(!decoded || !(decoded).userId) {
            return null
        }
        return decoded.userId
    }catch(e){
        return null;
    }
}

//handle client 
wss.on('connection', function connection(ws, request) {
    console.log("new client connected")

    const url = request.url;
    if(!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1])
    const token = queryParams.get('token') ?? "";
    const userId = checkUser(token);

    if(userId == null) {
        ws.close();
        return null;
    }

    users.push({
        userId,
        rooms: [],
        ws
    })

    
    //handle msg from the client
    ws.on('message', async function message(data) {
        console.log(`recieved the msg: ${data}`)

        const parsedData = JSON.parse(data as unknown as string); // converts string data in json

        if(parsedData.type === "join_room"){
            //TODO: multile checkes: room exists, permission and all
            const user = users.find(x => x.ws === ws)
            user?.rooms.push(parsedData.roomId);
        }

        if(parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws);
            if(!user) {
                return 
            }
            user.rooms = user?.rooms.filter(x => x === parsedData.room)

        }

        if(parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message // TODO: 10 different checks here: not to long, not any abusing word

            // first saving to the db and then broadcasting to everyone -> reliable but slow
            // TODO: better approach q system (push it to q and then all stuff)
            await prismaClient.chat.create({
                data:{
                    roomId,
                    message,
                    userId
                }
            })
            
            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })

        }
    });

    ws.on('close', () => {
        console.log("client disconnected")
    })

})