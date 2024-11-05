import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit2, TrashIcon } from "lucide-react";
import { account } from "./Accounts";

interface accountTableElementParams {
  account: account;
  updateAccount: React.Dispatch<React.SetStateAction<account | null>>;
  deleteAccount: React.Dispatch<React.SetStateAction<account | null>>;
}

const AccountTableElement = ({ account, updateAccount, deleteAccount }: accountTableElementParams) => {

  return (
    <TableRow className="even:bg-muted cursor-pointer hover:bg-primary/25" >
      <TableCell className="font-medium">{account.userName}</TableCell>
      <TableCell>
        <span className={`px-2 inline-block w-20 text-center text-primary-foreground rounded-md ${account.role === 'DOCTOR' ? 'bg-green-600' : account.role === 'STAFF' ? 'bg-blue-600' :account.role==='NURSE'?'bg-pink-600': 'bg-zinc-600'}`}>
          {account.role}
        </span>
      </TableCell>
      <TableCell>{account.email}</TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Button size={"icon"} variant={'outline'} onClick={() => { updateAccount(account) }}
            className="hover:bg-primary focus:bg-primary hover:text-primary-foreground focus:text-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer rounded-full w-8 h-8">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button size={"icon"} variant={'outline'} onClick={() => { deleteAccount(account) }}
            className="hover:bg-destructive focus:bg-destructive hover:text-destructive-foreground focus:text-destructive-foreground focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer rounded-full w-8 h-8 ">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default AccountTableElement;
