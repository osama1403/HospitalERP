import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useMemo, useState } from "react";


export interface room {
  id: number;
  name: string;
  depName: string;
  depId: number;
  size: number;
  available: number;
}

const dummyRooms: room[] = [
  {
    id: 1,
    name: '12/3',
    depName: 'private',
    depId: 2,
    size: 2,
    available: 2
  },
  {
    id: 2,
    name: '11/3',
    depName: 'ICU',
    depId: 1,
    size: 1,
    available: 1
  },
  {
    id: 3,
    name: '3/2',
    depName: 'private',
    depId: 2,
    size: 1,
    available: 1
  },
  {
    id: 4,
    name: '5/2',
    depName: 'private',
    depId: 2,
    size: 2,
    available: 1
  },
  {
    id: 5,
    name: '8/2',
    depName: 'private',
    depId: 2,
    size: 2,
    available: 1
  },
  {
    id: 6,
    name: '1/13',
    depName: 'ICU',
    depId: 1,
    size: 1,
    available: 1
  },
]

const dummyDepartments = [
  {
    id: 1,
    name: 'ICU'
  },
  {
    id: 2,
    name: 'private'
  }
]


const RoomSelectDialog = ({ onSelect }: { onSelect?(v: room): void }) => {
  const [open, setOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<room | null>(null)
  const [filterDepartment, setFilterDepartment] = useState('All')


  // fetch available rooms and their departments and display them 
  const [availableDepartments, setAvailableDepartments] = useState(dummyDepartments)
  const [availableRooms, setAvailableRooms] = useState(dummyRooms)

  // filtered rooms based on department
  const filteredRooms = useMemo(() => {
    if (availableRooms?.length > 0) {
      if (filterDepartment === 'All') {
        return availableRooms
      } else {
        return availableRooms.filter(room => {
          return String(room.depId) === filterDepartment
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
    if(selectedRoom && onSelect){
      onSelect(selectedRoom)
    }
    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={(open) => { open ? setOpen(open) : handleClose() }}>
      <DialogTrigger asChild>
        <Button className="rounded-lg px-3 py-1">
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


        <p>selected room:{selectedRoom?.name}</p>
        <div className="max-w-fit min-w-[200px]">

          {/* FILTER BY DEPARTMENT */}
          <Select defaultValue={filterDepartment} onValueChange={(v) => { setFilterDepartment(v) }}>
            <SelectTrigger id='room-dep' className="">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {
                availableDepartments.map(el => (
                  <SelectItem value={String(el.id)}>{el.name}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>

        <div className="max-h-96 scrollbar-hide">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
            {
              filteredRooms?.length > 0 &&
              filteredRooms?.map(room => (
                <div className={`p-3 rounded-xl border border-primary/15  cursor-pointer ${selectedRoom?.id === room.id ? 'bg-green-500/25' : 'bg-muted hover:bg-primary/15'}`}
                  onClick={() => { setSelectedRoom(room) }}>
                  <p>{room.name}</p>
                  <p>size: {room.size}</p>
                  <p>free: {room.available}</p>
                </div>
              ))
            }
          </div>
        </div>






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