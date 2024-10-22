import PageTitle from "@/components/PageTitle";
import { useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronDown, ChevronUp, CircleAlert, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sub } from 'date-fns'
import { Input } from "@/components/ui/input";
import { getComparator } from "@/lib/utils";
import AdmissionTableElement from "./AdmissionTableElement";
import useDebounce from "@/hooks/useDebounce";

type order = 'desc' | 'asc'
type sortableFields = 'date' | 'age'
const d = new Date()



export interface Admission {
  id: string,
  name: string,
  age: number,
  date: Date,
  department: string,
  room: string
}
const admisssionsData: Admission[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 26,
    date: sub(d, { days: 2 }),
    department: 'ICU',
    room: 'room 13'
  },
  {
    id: '2',
    name: 'Mike Syndako',
    age: 43,
    date: d,
    department: 'Surgery',
    room: '2'
  },
  {
    id: '3',
    name: 'Sarah Maria',
    age: 28,
    date: sub(d, { days: 3 }),
    department: 'Private',
    room: '24'
  },

]





const Admissions = () => {

  // State
  const [order, setOrder] = useState<order>('desc');
  const [orderBy, setOrderBy] = useState<sortableFields>('date');
  const [data, setData] = useState(admisssionsData)

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce<string>(search, 500)

  const handleRequestSort = (property: sortableFields) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };


  // filtering
  const filteredData = useMemo(() => {
    if (data) {
      return data.filter(el => (el.name).toLowerCase().includes(debouncedSearch.toLowerCase()))
    }
    return null
  }, [debouncedSearch, data])

  // Sorting
  const sortedAdmissions = useMemo(() => {
    if (filteredData) {
      return [...filteredData].sort(getComparator<Admission>(order, orderBy))
    }
    return null
  }, [order, orderBy, filteredData])


  return (
    <>
      <div className="px-4 py-6">
        <PageTitle text="Admissions" />
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-6 h-6 text-muted-foreground" />
          <Input placeholder="search" value={search} onChange={(e) => { setSearch(e.target.value) }} className="max-w-72" />
        </div>


        <Table className="max-w-3xl w-full min-w-[500px]">
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              <TableHead className="text-primary-foreground">Name</TableHead>

              <TableHead className="text-primary-foreground py-0">
                <SortingButton text="Age"
                  active={(orderBy === 'age')}
                  direction={orderBy === 'age' ? order : 'desc'}
                  onClick={() => { handleRequestSort('age') }} />
              </TableHead>

              <TableHead className="text-primary-foreground py-0">
                <SortingButton text="Date"
                  active={(orderBy === 'date')}
                  direction={orderBy === 'date' ? order : 'desc'}
                  onClick={() => { handleRequestSort('date') }} />
              </TableHead>

              <TableHead className="text-primary-foreground">Department</TableHead>
              <TableHead className="text-primary-foreground">Room</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              // errors 
              false ?
                <TableRow className="border-0 bg-transparent hover:bg-transparent">
                  <TableCell colSpan={5} className=" py-5">
                    <div className="flex flex-col gap-3 items-center justify-center">
                      <CircleAlert/>
                      <p>Something went wrong</p>
                      <Button size={'sm'} variant={'outline'}>Retry</Button>
                    </div>
                  </TableCell>
                </TableRow>
                :
                //  loading
                false ?
                  <TableRow className="border-0 bg-transparent hover:bg-transparent">
                    <TableCell colSpan={5} className=" py-5">
                      <div className="flex justify-center">
                        <div className="w-12 h-12 rounded-full border-[6px] border-muted border-t-primary animate-spin " >
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>

                  :

                  sortedAdmissions && (
                    sortedAdmissions.length > 0 ?
                      sortedAdmissions.map((admission) => (
                        <AdmissionTableElement key={admission.id} admission={admission} />
                      ))
                      :
                      <TableRow className="border-0 bg-transparent hover:bg-transparent">
                        <TableCell colSpan={5} className="text-center text-lg text-muted-foreground ">
                          no admissions found
                        </TableCell>
                      </TableRow>
                  )
            }
          </TableBody>
        </Table>

      </div>

    </>
  );
}

export default Admissions;


interface SortingButtonProps {
  text: string;
  active: boolean;
  direction: 'desc' | 'asc';
  onClick(): void
}
const SortingButton = ({ text, active, direction, onClick }: SortingButtonProps) => {
  return (
    <Button className="h-full bg-primary rounded-none hover:bg-muted/20 flex gap-2 items-center" onClick={() => { onClick() }}>
      {text} {direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className={`w-4 h-4 ${active ? "" : 'opacity-50'}`} />}
    </Button>

  )
}