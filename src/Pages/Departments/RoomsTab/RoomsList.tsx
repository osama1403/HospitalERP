import { useState } from "react";
import RoomCard from "./RoomCard";
import RoomFormDialog from "./RoomFormDialog";
import RoomDeleteDialog from "./RoomDeleteDialog";

export interface room {
  name: string;
  size: number;
  departmentName: string;
  departmentId: string;
  // vacant: number;
}
const demoRoom: room = { name: 'room 12/3', departmentName: 'Patients rooms', size: 1,departmentId:'1' }

const RoomsList = () => {
  const [roomToUpdate, setRoomToUpdate] = useState<room | null>(null)
  const [roomToDelete, setRoomToDelete] = useState<room | null>(null)

  return (
    <div>
      <RoomFormDialog roomToUpdate={roomToUpdate} setRoomToUpdate={setRoomToUpdate}/>
      <RoomDeleteDialog roomToDelete={roomToDelete} setRoomToDelete={setRoomToDelete}/>
      
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5 mt-5">
        <RoomCard room={demoRoom} updateRoom={setRoomToUpdate} deleteRoom={setRoomToDelete} />
        <RoomCard room={demoRoom} updateRoom={setRoomToUpdate} deleteRoom={setRoomToDelete} />
        <RoomCard room={demoRoom} updateRoom={setRoomToUpdate} deleteRoom={setRoomToDelete} />
        <RoomCard room={demoRoom} updateRoom={setRoomToUpdate} deleteRoom={setRoomToDelete} />
        <RoomCard room={demoRoom} updateRoom={setRoomToUpdate} deleteRoom={setRoomToDelete} />
      </div>
    </div>

  );
}

export default RoomsList;


