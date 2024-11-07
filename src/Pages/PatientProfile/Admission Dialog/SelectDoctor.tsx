import axiosInstance from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { CircleAlert, Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";


export interface doctor {
  _id: string;
  name: string;
  specialization: string;
}



const DoctorSelectDialog = ({ onSelect }: { onSelect?(v: doctor): void }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce<string>(search, 500)

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['doctors'],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/staff/doctors`, { signal })
      return response.data
    },
  })



  // filtered doctors based on search
  const filteredDoctors = useMemo(() => {
    if (data?.length > 0) {
      return data.filter((el: doctor) => (el.name).toLowerCase().includes(debouncedSearch.toLowerCase()) || (el.specialization).toLowerCase().includes(debouncedSearch.toLowerCase()))
    }
    return []
  }, [data, debouncedSearch])


  const handleClose = () => {
    setSearch('')
    setOpen(false)
  }
  const handleSelect = (d: doctor) => {
    if (onSelect) {
      onSelect(d)
    }
    handleClose()
  }



  return (
    <Dialog open={open} onOpenChange={(open) => { if (open) { setOpen(open); refetch(); } else { handleClose() } }}>
      <DialogTrigger asChild>
        <Button size={'sm'} className="rounded-lg px-3 py-1">
          Select Doctor
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm max-h-[80vh] overflow-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>Select Doctor</DialogTitle>
          <DialogDescription className='text-start'>
            Select doctor to proceed.
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
              </div>
              :

              <>
                <div className="max-w-fit min-w-[200px]">

                  <div className="flex items-center gap-3">
                    <Input placeholder="search" value={search} onChange={(e) => { setSearch(e.target.value) }} className="max-w-72" />
                    <Search className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>

                <ScrollArea className="max-h-56 overflow-auto">
                  <div className="grid  gap-1">
                    {
                      filteredDoctors?.length > 0 ?
                      filteredDoctors?.map((doctor: doctor) => (
                        <div key={doctor._id} className={`px-3 py-1 rounded border border-primary/15 hover:bg-green-500/15 cursor-pointer `}
                          onClick={() => { handleSelect(doctor) }}>
                          <p className="text-primary">Dr: {doctor.name}</p>
                          <p className="text-sm">{doctor.specialization}</p>
                        </div>
                      ))
                      :
                      <p className="text-center py-2 text-muted-foreground">No doctors</p>
                    }
                  </div>
                </ScrollArea>
              </>


        }


        <DialogFooter className="sm:justify-between gap-2">
          <Button type="button" variant="secondary" className='rounded-lg' onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DoctorSelectDialog;