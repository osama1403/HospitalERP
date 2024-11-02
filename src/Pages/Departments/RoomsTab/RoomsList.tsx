import { useMemo, useState } from "react";
import RoomCard from "./RoomCard";
import RoomFormDialog from "./RoomFormDialog";
import RoomDeleteDialog from "./RoomDeleteDialog";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { department } from "../DepartmentsTab/DepartmentsList";

export interface room {
  _id:string,
  name: string;
  size: number;
  depId: string;
  type:string;
  occupied:number;
  status:string;
  depName?:string
}

interface roomsListProps{
  rooms:room[],
  departments:department[]
}
const RoomsList = ({rooms,departments}:roomsListProps) => {
  const [roomToUpdate, setRoomToUpdate] = useState<room | null>(null)
  const [roomToDelete, setRoomToDelete] = useState<room | null>(null)
  const [depFilter, setDepFilter] = useState<string>('All')

  const filteredRooms= useMemo(()=>{
    if(rooms){
      if(depFilter==='All'){
        return rooms.map(room=>{
          const depName= departments.find(dep=>dep._id===room.depId)?.name
          return {...room,depName:depName}
        })
      }
      return rooms.filter(el=>el.depId===depFilter).map(room=>{
        const depName= departments.find(dep=>dep._id===room.depId)?.name
        return {...room,depName:depName}
      })
    }
    return []
  },[depFilter,rooms])

  return (
    <div>
      <div className="flex flex-col w-full max-w-fit gap-3 items-start">
        <RoomFormDialog departments={departments} roomToUpdate={roomToUpdate} setRoomToUpdate={setRoomToUpdate} />

        <Select defaultValue={depFilter} onValueChange={(v) => { setDepFilter(v) }}>
          <SelectTrigger id='room-dep' className="">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {
              departments.map(dep=>(
                <SelectItem key={dep._id} value={dep._id}>{dep.name}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </div>
      <RoomDeleteDialog roomToDelete={roomToDelete} setRoomToDelete={setRoomToDelete} />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5 mt-5">
        {
          filteredRooms.map(room=>(
            <RoomCard room={room} updateRoom={setRoomToUpdate} deleteRoom={setRoomToDelete} />
          ))
        }
        </div>
    </div>

  );
}

export default RoomsList;


