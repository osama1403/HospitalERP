import { useState } from "react";
import RoomCard from "./RoomCard";
import RoomFormDialog from "./RoomFormDialog";
import RoomDeleteDialog from "./RoomDeleteDialog";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface room {
  name: string;
  size: number;
  departmentName: string;
  departmentId: string;
  // vacant: number;
}
const demoRoom: room = { name: 'room 12/3', departmentName: 'Patients rooms', size: 1, departmentId: '1' }

const RoomsList = () => {
  const [roomToUpdate, setRoomToUpdate] = useState<room | null>(null)
  const [roomToDelete, setRoomToDelete] = useState<room | null>(null)
  const [depFilter, setDepFilter] = useState<string>('All')
  
  return (
    <div>
      <div className="flex flex-col w-full max-w-fit gap-3 items-start">
        <RoomFormDialog roomToUpdate={roomToUpdate} setRoomToUpdate={setRoomToUpdate} />

        <Select defaultValue={depFilter} onValueChange={(v) => { setDepFilter(v) }}>
          <SelectTrigger id='room-dep' className="">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="1">Department-1</SelectItem>
            <SelectItem value="2">Department-2</SelectItem>
            <SelectItem value="3">Department-3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <RoomDeleteDialog roomToDelete={roomToDelete} setRoomToDelete={setRoomToDelete} />

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


