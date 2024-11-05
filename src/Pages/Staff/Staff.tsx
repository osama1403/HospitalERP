import PageTitle from "@/components/PageTitle";
import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CircleAlert, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";





interface staff {
  _id: number;
  name: string;
  specialization: string;
  account: { 
    role: 'DOCTOR' | 'NURSE'
   }
}

const demoStaff: staff[] = [
  {
    _id: 1,
    name: 'john snow',
    specialization: 'spec1',
    account:{
      role:'DOCTOR',
    }
  },
  {
    _id: 2,
    name: 'walter white',
    specialization: 'spec1',
    account:{
      role:'DOCTOR',
    }
  },
  {
    _id: 3,
    name: 'johny syndako',
    specialization: 'spec1',
    account:{
      role:'DOCTOR',
    }
  },
  {
    _id: 4,
    name: 'lina mark',
    specialization: 'spec1',
    account:{
      role:'NURSE',
    }
  },

]


const Staff = () => {

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce<string>(search, 500)
  const [data, setData] = useState(demoStaff)



  // filtering
  const filteredStaff = useMemo(() => {
    if (data) {
      return data.filter(el => (el.name).toLowerCase().includes(debouncedSearch.toLowerCase()))
    }
    return null
  }, [debouncedSearch, data])

  return (
    <div className="px-4 py-6">
      <PageTitle text="Staff" />
      <div className="flex items-center gap-3 mb-4">
        <Search className="w-6 h-6 text-muted-foreground" />
        <Input placeholder="search" value={search} onChange={(e) => { setSearch(e.target.value) }} className="max-w-72" />
      </div>


      <Table className="max-w-3xl w-full min-w-[500px]">
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead className="text-primary-foreground">Name</TableHead>
            <TableHead className="text-primary-foreground">Role</TableHead>
            <TableHead className="text-primary-foreground">Specialization</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            // errors 
            false ?
              <TableRow className="border-0 bg-transparent hover:bg-transparent">
                <TableCell colSpan={3} className=" py-5">
                  <div className="flex flex-col gap-3 items-center justify-center">
                    <CircleAlert />
                    <p>Something went wrong</p>
                    <Button size={'sm'} variant={'outline'}>Retry</Button>
                  </div>
                </TableCell>
              </TableRow>
              :
              //  loading
              false ?
                <TableRow className="border-0 bg-transparent hover:bg-transparent">
                  <TableCell colSpan={3} className=" py-5">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 rounded-full border-[6px] border-muted border-t-primary animate-spin " >
                      </div>
                    </div>
                  </TableCell>
                </TableRow>

                :

                filteredStaff && (
                  filteredStaff.length > 0 ?
                    filteredStaff.map((staff) => (
                      <StaffTableElement key={staff._id} staff={staff} />
                    ))
                    :
                    <TableRow className="border-0 bg-transparent hover:bg-transparent">
                      <TableCell colSpan={5} className="text-center text-lg text-muted-foreground ">
                        no staff found
                      </TableCell>
                    </TableRow>
                )
          }
        </TableBody>
      </Table>
    </ div>

  );
}

export default Staff;


const StaffTableElement = ({ staff }: { staff: staff }) => {
  const handleClick = (id: number) => {
    console.log(id);
  }

  return (
    <TableRow className="even:bg-muted cursor-pointer hover:bg-primary/25" onClick={() => { handleClick(staff._id) }}>
      <TableCell className="font-medium">{staff.name}</TableCell>
      <TableCell className="font-medium">{staff.account.role}</TableCell>
      <TableCell className="font-medium">{staff.specialization}</TableCell>

    </TableRow>
  )
}