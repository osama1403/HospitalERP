import PageTitle from "@/components/PageTitle";
import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CircleAlert, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { differenceInYears } from "date-fns";
import { useNavigate } from "react-router-dom";


interface patient {
  _id: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  birthday: Date;
  activeAdmission?: string
}


const Patients = () => {

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce<string>(search, 500)

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['all-patients'],
    queryFn: async () => {
      const res = await axiosInstance.get('/patients')
      return res.data as patient[]
    }
  })

  // filtering
  const filteredPatient = useMemo(() => {
    if (data) {
      return data.filter(el => (el.firstName+' '+el.lastName).toLowerCase().includes(debouncedSearch.toLowerCase()))
    }
    return null
  }, [debouncedSearch, data])

  console.log(data);


  return (
    <div className="px-4 py-6">
      <PageTitle text="Patients" />
      <div className="flex items-center gap-3 mb-4">
        <Search className="w-6 h-6 text-muted-foreground" />
        <Input placeholder="search" value={search} onChange={(e) => { setSearch(e.target.value) }} className="max-w-72" />
      </div>


      <Table className="max-w-3xl w-full min-w-[500px]">
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead className="text-primary-foreground">Name</TableHead>
            <TableHead className="text-primary-foreground">Age</TableHead>
            <TableHead className="text-primary-foreground">Gender</TableHead>
            <TableHead className="text-primary-foreground text-center">Admission state</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            // errors 
            error ?
              <TableRow className="border-0 bg-transparent hover:bg-transparent">
                <TableCell colSpan={4} className=" py-5">
                  <div className="flex flex-col gap-3 items-center justify-center">
                    <CircleAlert />
                    <p>Something went wrong</p>
                    <Button size={'sm'} variant={'outline'} onClick={() => { refetch() }}>Retry</Button>
                  </div>
                </TableCell>
              </TableRow>
              :
              //  loading
              isFetching ?
                <TableRow className="border-0 bg-transparent hover:bg-transparent">
                  <TableCell colSpan={4} className=" py-5">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 rounded-full border-[6px] border-muted border-t-primary animate-spin " >
                      </div>
                    </div>
                  </TableCell>
                </TableRow>

                :

                filteredPatient && (
                  filteredPatient.length > 0 ?
                    filteredPatient.map((patient) => (
                      <PatientsTableElement key={patient._id} patient={patient} />
                    ))
                    :
                    <TableRow className="border-0 bg-transparent hover:bg-transparent">
                      <TableCell colSpan={4} className="text-center text-lg text-muted-foreground ">
                        no patients found
                      </TableCell>
                    </TableRow>
                )
          }
        </TableBody>
      </Table>
    </ div>

  );
}

export default Patients;


const PatientsTableElement = ({ patient }: { patient: patient }) => {
  const navigate = useNavigate()
  const handleClick = (id: string) => {
    console.log(id);
    navigate(`${id}`)

  }

  return (
    <TableRow className="even:bg-muted cursor-pointer hover:bg-primary/25" onClick={() => { handleClick(patient._id) }}>
      <TableCell className="font-medium">{`${patient.firstName} ${patient.lastName}`}</TableCell>
      <TableCell className="font-medium">{differenceInYears(new Date(), patient.birthday)}</TableCell>
      <TableCell className="font-medium">{patient.gender}</TableCell>
      <TableCell className="font-medium text-center">
        <span className={`px-2 py-[2px] text-primary-foreground rounded-md ${patient.activeAdmission ? 'bg-green-600' : 'bg-zinc-600'}`}>
          {patient.activeAdmission ? 'in admission' : 'NA'}
        </span>
      </TableCell>
    </TableRow>
  )
}