import { Button } from "@/components/ui/button";
import { Edit2, EllipsisVertical, TrashIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { memo } from "react";
import { room } from "./RoomsList";

interface roomCardParams {
  room: room;
  updateRoom: React.Dispatch<React.SetStateAction<room | null>>;
  deleteRoom: React.Dispatch<React.SetStateAction<room | null>>;
}

const RoomCard = ({ room, updateRoom, deleteRoom }: roomCardParams) => {
  return (
    <div className="relative w-full p-4 rounded-xl shadow-md flex flex-col justify-between max-w-56 mx-auto bg-muted overflow-hidden">
      <p className="absolute top-0 left-0 w-2/3 rounded-br-xl bg-primary/85 text-primary-foreground py-[2px] text-center text-xs">{room.depName}</p>
      <div className="grow mt-3 flex items-center">
        <h3 className="text-xl font-semibold leading-none text-primary">{room.name}</h3>
      </div>

      <div className="flex gap-3 justify-between items-end mt-6 ">
        <div>
          <p className="text leading-none text-muted-foreground">Size: <span className="text-primary">{room.size}</span> </p>
        </div>
        <div>
          <p className="text leading-none text-muted-foreground">Vacant: <span className="text-primary">{room.size - room.occupied}</span> </p>
        </div>

      </div>


      <DropdownMenu >
        <DropdownMenuTrigger asChild >
          <Button size={"icon"} variant={"ghost"} className="absolute top-2 right-2 text-muted-foreground w-7 h-7">
            <EllipsisVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-0 space-y-2 ">
          <DropdownMenuItem asChild >
            <Button size={"icon"} variant={'outline'} onClick={() => { updateRoom(room) }}
              className="hover:bg-primary focus:bg-primary hover:text-primary-foreground focus:text-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer rounded-full w-8 h-8">
              <Edit2 className="w-6 h-6" />
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild >
            <Button size={"icon"} variant={'outline'} onClick={() => { deleteRoom(room) }}
              className="hover:bg-destructive focus:bg-destructive hover:text-destructive-foreground focus:text-destructive-foreground focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer rounded-full w-8 h-8 ">
              <TrashIcon className="w-6 h-6" />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )

}
export default memo(RoomCard)