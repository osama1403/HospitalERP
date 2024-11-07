import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Edit2, EllipsisVertical, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NoteDialog from "./Action Dialogs/NoteDialog";
import { useState } from "react";
import ChangeRoom from "./Action Dialogs/ChangeRoom";
import ScheduleSurgery from "./Action Dialogs/ScheduleSurgery";

const AdmissionActions = ({id,data}:{id:string,data:any}) => {

  const [optionsOpen, setOptionsOpen] = useState(false)
  return (
    <>
      <div className="w-full flex flex-col gap-3 items-start lg:items-end">
        <NoteDialog id={id}/>
        <Button size={'sm'} className="flex items-center gap-2" onClick={() => { setOptionsOpen(p => !p) }}>
          Options <ChevronDown className="w-4 h-4" />
        </Button>
        {
          optionsOpen &&
          <div className=" flex flex-col gap-2 p-2 border border-primary rounded-lg ">
            <ChangeRoom id={id} room={data.roomId}/>
            <ScheduleSurgery/>
            <Button>Discharge</Button>
          </div>
        }

      </div>
    </>
  );
}

export default AdmissionActions;