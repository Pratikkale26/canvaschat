import { useEffect, useState } from "react";
import { WS_URL } from "../../app/room/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzZjODQ4Zi1mMTc1LTRlMGYtOWRmNi04MTgxNzM3MmFkZWIiLCJpYXQiOjE3Mzc1MzM3MDQsImV4cCI6MTczNzYyMDEwNH0.ne2b9GlwebFol93Y9F4uzTpKxKPX-MOhtTqA0ahV_2Q`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }

}