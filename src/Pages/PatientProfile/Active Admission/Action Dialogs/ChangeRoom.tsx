import useAlert from "@/hooks/useAlert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RoomSelectDialog from "./RoomSelectDialog";
import { room } from "./RoomSelectDialog";

const ChangeRoom = () => {

  const setAlert = useAlert()

  const [open, setOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<room | null>(null)

  const handleClose = () => {
    setOpen(false)
    setSelectedRoom(null)
  }

  const handleChangeRoom = () => {
    setAlert({text:'room changed successfully',type:'success'})
    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={(open) => { open ? setOpen(open) : handleClose() }}>
      <DialogTrigger asChild>
        <Button className="rounded-lg px-3 py-1">
          Change Room
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[80vh] overflow-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>Change Room</DialogTitle>
          <DialogDescription className='text-start'>
            Select room to change to.
          </DialogDescription>
        </DialogHeader>



        <div className="text-lg ">
          <p>From: ICU: 12/3</p>
          <p>To: {selectedRoom?.depName}{selectedRoom?.name}</p>
        </div>
        <div className="w-fit mb-4">
          <RoomSelectDialog onSelect={(r) => { setSelectedRoom(r) }} />
        </div>


        <DialogFooter className="sm:justify-between gap-2 ">

          <Button type="button" variant="secondary" className='rounded-lg' onClick={handleClose}>
            Close
          </Button>

          <Button disabled={!selectedRoom} className='rounded-lg' onClick={handleChangeRoom}>
            Create
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeRoom;