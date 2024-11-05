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
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";

type RoleSelect = Role | 'All'

export interface account {
  _id: string,
  userName: string,
  role: Role,
  email: string,
  staffAccount?: { _id: String }
}


const Accounts = () => {
  const [accountToUpdate, setAccountToUpdate] = useState<account | null>(null)
  const [accountToDelete, setAccountToDelete] = useState<account | null>(null)

  const [role, setRole] = useState<RoleSelect>('All')
  // const [data, setData] = useState(staffData)

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['all-accounts'],
    queryFn: async () => {
      const res = await axiosInstance.get('/accounts')
      return res.data as account[]
    }
  })

  const filteredAccounts = useMemo(() => {
    return data?.filter((s: any) => role === 'All' ? true : role === s.role) || []
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
              error ?
                <TableRow className="border-0 bg-transparent hover:bg-transparent">
                  <TableCell colSpan={5} className=" py-5">
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
                    <TableCell colSpan={5} className=" py-5">
                      <div className="flex justify-center">
                        <div className="w-12 h-12 rounded-full border-[6px] border-muted border-t-primary animate-spin " >
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>

                  :

                  filteredAccounts && (
                    filteredAccounts.length > 0 ?
                      filteredAccounts.map((staff) => (
                        <AccountTableElement key={staff._id} account={staff} updateAccount={setAccountToUpdate} deleteAccount={setAccountToDelete} />
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

