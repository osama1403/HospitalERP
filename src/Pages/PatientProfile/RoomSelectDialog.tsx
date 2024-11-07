import axiosInstance from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query";
import { CircleAlert, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";


export interface room {
  _id: string;
  name: string;
  depId: any;
  size: number;
  occupied: number;
}



const RoomSelectDialog = ({ onSelect }: { onSelect?(v: room): void }) => {
  const [open, setOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<room | null>(null)
  const [filterDepartment, setFilterDepartment] = useState('All')


  // fetch available rooms and their departments and display them 
  const [availableDepartments, setAvailableDepartments] = useState([])
  const [availableRooms, setAvailableRooms] = useState<room[]>([])



  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['available-rooms'],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/rooms/available`, { signal })
      return response.data
    },
    enabled: false
  })

  useEffect(() => {
    if (data) {
      setAvailableRooms(data.availableRooms)
      setAvailableDepartments(data.availableDepartments)
    }
  }, [data])


  // filtered rooms based on department
  const filteredRooms = useMemo(() => {
    if (availableRooms?.length > 0) {
      if (filterDepartment === 'All') {
        return availableRooms
      } else {
        return availableRooms.filter((room: any) => {


          return room.depId._id === filterDepartment
        })
      }
    }
    return []
  }, [availableRooms, filterDepartment])


  const handleClose = () => {
    setSelectedRoom(null)
    setFilterDepartment('All')
    setOpen(false)
  }

  const handleProceed = () => {
    // call passed finction with room as parameter
    // close dialog
    if (selectedRoom && onSelect) {
      onSelect(selectedRoom)
    }
    handleClose()
  }


  return (
    <Dialog open={open} onOpenChange={(open) => { if (open) { setOpen(open); refetch(); } else { handleClose() } }}>
      <DialogTrigger asChild>
        <Button size={'sm'} className="rounded-lg px-3 py-1">
          Select Room
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[80vh] overflow-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>Select Room</DialogTitle>
          <DialogDescription className='text-start'>
            Select room to proceed.
          </DialogDescription>
        </DialogHeader>



        {
          isFetching ?
            <div className="min-h-44 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            : error ?
              <div className="flex min-h-44 flex-col gap-3 items-center justify-center">
                <CircleAlert />
                <p>Something went wrong</p>
                <Button size={'sm'} variant={'outline'} onClick={() => { refetch() }}>Retry</Button>
              </div> :
              <>


                <p>selected room:{selectedRoom?.name}</p>
                <div className="max-w-fit min-w-[200px]">

                  {/* FILTER BY DEPARTMENT */}
                  <Select defaultValue={filterDepartment} onValueChange={(v) => { setFilterDepartment(v); setSelectedRoom(null) }}>
                    <SelectTrigger id='room-dep' className="">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      {
                        availableDepartments.map((el: any) => (
                          <SelectItem key={el._id} value={String(el._id)}>{el.name}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>

                <div className="max-h-96 scrollbar-hide overflow-auto">
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
                    {
                      filteredRooms?.length > 0 &&
                      filteredRooms?.map((room: any) => (
                        <div key={room._id} className={`p-3 rounded-xl border border-primary/15  cursor-pointer ${selectedRoom?._id === room._id ? 'bg-green-500/25' : 'bg-muted hover:bg-primary/15'}`}
                          onClick={() => { setSelectedRoom(room) }}>
                          <p className="text-sm text-primary">{room.depName}</p>
                          <p className="text-lg">{room.name}</p>
                          <p>size: {room.size}</p>
                          <p>free: {room.size - room.occupied}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </>

        }






        <DialogFooter className="sm:justify-between gap-2">

          <Button type="button" variant="secondary" className='rounded-lg' onClick={handleClose}>
            Close
          </Button>

          <Button disabled={!selectedRoom} className='rounded-lg' onClick={handleProceed}>
            Proceed
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RoomSelectDialog;