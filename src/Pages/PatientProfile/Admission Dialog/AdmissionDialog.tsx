import useAlert from "@/hooks/useAlert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { isAxiosError } from "axios";
import RoomSelectDialog, { room } from "../RoomSelectDialog";
import DoctorSelectDialog, { doctor } from "./SelectDoctor";





const AdmissionDialog = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const setAlert = useAlert()


  const [selectedRoom, setSelectedRoom] = useState<room | null>(null)
  const [selectedDoc, setSelectedDoc] = useState<doctor | null>(null)
  const [cause, setCause] = useState('')




  const { mutate, isPending } = useMutation({
    mutationFn: ({ v }: { v: any }) => {
      return axiosInstance.post('/admission', v)
    },
    onSuccess: (res) => {
      setAlert({ text: res.data.msg, type: 'success' })
      queryClient.invalidateQueries({ queryKey: ['patient'] })
      handleClose()
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        setAlert({ text: error.response.data?.msg || 'something went wrong', type: 'error' })
      }
    }
  })



  const handleSubmit = () => {
    if (selectedDoc && selectedRoom && cause) {
      mutate({
        v: {
          patientId: id,
          cause,
          doctorId: selectedDoc._id,
          roomId: selectedRoom._id
        }
      })
    }
  }

  const handleClose = () => {
    setSelectedRoom(null)
    setSelectedDoc(null)
    setCause('')
    setOpen(false)
  }


  return (
    <Dialog open={open} onOpenChange={(open) => { open ? setOpen(open) : handleClose() }}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 rounded-lg px-3 py-1 transition-all ">
          Admit
          <ArrowRight className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[80vh] overflow-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>Admission info</DialogTitle>
          <DialogDescription className='text-start'>
            Enter admission info.
          </DialogDescription>
        </DialogHeader>


        <div className="space-y-4 my-2">
          <div>
            <p className="font-medium text-sm mb-2">Admission cause:</p>
            < Input id='cause' value={cause} onChange={(e) => { setCause(e.target.value) }}
            />
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <p className=" text-primary text-lg">Room:</p>
              {
                selectedRoom ?
                  <p>{selectedRoom?.depId?.name} - {selectedRoom?.name}</p>
                  :
                  <p className="text-muted-foreground text-sm">please select room</p>
              }
            </div>
            <RoomSelectDialog onSelect={(v) => { setSelectedRoom(v) }} />
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="mb-2">
              <p className="text-lg text-primary">Doctor: </p>

              {
                selectedDoc ?
                  <>
                    <p>{selectedDoc.name}</p>
                    <p className="text-muted-foreground text-sm">{selectedDoc.specialization}</p>
                  </>
                  :
                  <p className="text-muted-foreground text-sm">please select doctor</p>

              }
            </div>

            <DoctorSelectDialog onSelect={(v: doctor) => setSelectedDoc(v)} />
          </div>


        </div>



        <DialogFooter className="sm:justify-between gap-2">

          <Button type="button" variant="secondary" className='rounded-lg' onClick={handleClose}>
            Close
          </Button>

          <Button disabled={!cause || !selectedRoom || isPending} className='rounded-lg' onClick={handleSubmit}>
            Create {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog >


  );
}

export default AdmissionDialog;