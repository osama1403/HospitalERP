import useAlert from "@/hooks/useAlert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RoomSelectDialog from "../../RoomSelectDialog";
import { room } from "../../RoomSelectDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { isAxiosError } from "axios";
import { Loader2 } from "lucide-react";

const ChangeRoom = ({ id, room }: { id: string, room: any }) => {
  const queryClient = useQueryClient()
  const setAlert = useAlert()

  const [open, setOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<room | null>(null)


  const { mutate, isPending } = useMutation({
    mutationFn: async (v: any) => {
      return await axiosInstance.post('/admission/update/change-room', v)
    },
    onSuccess: (res) => {
      setAlert({ text: res.data.msg, type: 'success' })
      queryClient.invalidateQueries({ queryKey: ['active-admission'] })
      handleClose()
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        setAlert({ text: error.response.data?.msg || 'something went wrong', type: 'error' })
      }
    }
  })


  const handleClose = () => {
    setOpen(false)
    setSelectedRoom(null)
  }

  const handleChangeRoom = () => {
    mutate({ id, roomId: selectedRoom?._id })
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



        <div className="text-lg">
          <p>From: <span className="text-primary">{room?.depId?.name} - {room?.name}</span></p>
          <p>To: <span className="text-primary">{selectedRoom?.depId.name} - {selectedRoom?.name}</span></p>
        </div>
        <div className="w-fit mb-4">
          <RoomSelectDialog onSelect={(r) => { setSelectedRoom(r) }} />
        </div>


        <DialogFooter className="sm:justify-between gap-2 ">

          <Button type="button" variant="secondary" className='rounded-lg' onClick={handleClose}>
            Close
          </Button>

          <Button disabled={!selectedRoom || selectedRoom?._id === room?._id || isPending} className='rounded-lg' onClick={handleChangeRoom}>
            Submit {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeRoom;