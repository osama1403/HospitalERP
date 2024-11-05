import PageTitle from "@/components/PageTitle";
import { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Role } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountTableElement from "./AccountTableElement";
import AccountFormDialog from "./AccountFormDialog";
import withAlert from "@/Hoc/withAlert";
import AccountDeleteDialog from "./AccountDeleteDialog";

type RoleSelect = Role | 'All'

export interface account {
  id: string,
  userName: string,
  role: Role,
  email: string
}

const staffData: account[] = [
  {
    id: '1',
    userName: 'john doe',
    role: 'DOCTOR',
    email: 'johndoe@gmail.com'
  },
  {
    id: '2',
    userName: 'sarah staff',
    role: 'STAFF',
    email: 'johndoe@gmail.com'
  },
  {
    id: '3',
    userName: 'alan admin',
    role: 'ADMIN',
    email: 'johndoe@gmail.com'
  },
  {
    id: '4',
    userName: 'adam doctor',
    role: 'DOCTOR',
    email: 'johndoe@gmail.com'
  },
  {
    id: '5',
    userName: 'Elly staff',
    role: 'STAFF',
    email: 'johndoe@gmail.com'
  },
]

const Accounts = () => {
  const [role, setRole] = useState<RoleSelect>('All')
  const [data, setData] = useState(staffData)

  const [accountToUpdate, setAccountToUpdate] = useState<account | null>(null)
  const [accountToDelete, setAccountToDelete] = useState<account | null>(null)


  const filteredStaff = useMemo(() => {
    return data.filter(s => role === 'All' ? true : role === s.role)
  }, [data, role])


  return (
    <div className="px-4 py-6">
      <PageTitle text="Accounts" />
      <div className="max-w-4xl w-full ">

        <div className="my-7 flex justify-between">
          {/* Filter by role Select */}
          <Select defaultValue={'All'} value={role} onValueChange={(v: RoleSelect) => { setRole(v) }}>
            <SelectTrigger id='roles' className="w-full max-w-44">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="DOCTOR">Doctor</SelectItem>
              <SelectItem value="NURSE">Nurse</SelectItem>
              <SelectItem value="STAFF">Staff</SelectItem>
            </SelectContent>
          </Select>

          {/* Account Form */}
          <AccountFormDialog accountToUpdate={accountToUpdate} setAccountToUpdate={setAccountToUpdate} />
        </div>

        <Table className="max-w-4xl w-full min-w-[500px]">

          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              <TableHead className="text-primary-foreground">User name</TableHead>
              <TableHead className="text-primary-foreground">Role</TableHead>
              <TableHead className="text-primary-foreground">email</TableHead>
              <TableHead className="text-primary-foreground">#Action</TableHead>
            </TableRow>
          </ TableHeader>
          <TableBody>
            {
              // errors 
              false ?
                <TableRow className="border-0 bg-transparent hover:bg-transparent">
                  <TableCell colSpan={5} className=" py-5">
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
                    <TableCell colSpan={5} className=" py-5">
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
                        <AccountTableElement key={staff.id} account={staff} updateAccount={setAccountToUpdate} deleteAccount={setAccountToDelete} />
                      ))
                      :
                      <TableRow className="border-0 bg-transparent hover:bg-transparent">
                        <TableCell colSpan={5} className="text-center text-lg text-muted-foreground ">
                          no accounts found
                        </TableCell>
                      </TableRow>
                  )
            }
          </TableBody>
        </Table>
      </div>

      <AccountDeleteDialog accountToDelete={accountToDelete} setAccountToDelete={setAccountToDelete} />

    </div >
  );
}

export default withAlert(Accounts);

