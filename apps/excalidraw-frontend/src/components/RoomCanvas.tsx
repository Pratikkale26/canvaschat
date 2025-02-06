"use client";

import { WS_URL } from "../../config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId: string}) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1N2E3YmYzNC02YWU1LTQ0NjQtOGMwOC02Yzc2YjFhZDJjY2EiLCJpYXQiOjE3Mzg4NDAyNDAsImV4cCI6MTczODkyNjY0MH0.4-9if_qZ-gVjd-qBcYM-izeqmrrSosZ0M-lfnpGOm40`)

        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type: "join_room",
                roomId
            });
            console.log(data);
            ws.send(data)
        }
        
    }, [])
   
    if (!socket) {
        return <div>
            Connecting to server....
        </div>
    }

    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>
}
