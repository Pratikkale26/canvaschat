"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const [roomId, setRoomId] = useState("")
  const router = useRouter();

  return (
    <div className={"flex w-screen h-screen justify-center items-center"}>
      <div className="flex w-screen justify-center gap-4">
        <input value={roomId} onChange={(e) => {
          setRoomId(e.target.value)
        }}  type="text" placeholder="RoomId" className="border-2 border-white" />

        <button onClick={() => {
          router.push(`/room/${roomId}`);
        }} className="border-2 border-white p-2">Join Room</button>
        </div>
    </div>
  );
}
