import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit2, TrashIcon } from "lucide-react";
import { staff } from "./Staff";

interface staffTableElementParams {
  staff: staff;
  updateStaff: React.Dispatch<React.SetStateAction<staff | null>>;
  deleteStaff: React.Dispatch<React.SetStateAction<staff | null>>;
}

const StaffTableElement = ({ staff,updateStaff,deleteStaff }: staffTableElementParams) => {

  const handleClick = (id: any) => {
    console.log(id);
  }
  return (
    <TableRow className="even:bg-muted cursor-pointer hover:bg-primary/25" onClick={() => { handleClick(staff.id) }}>
      <TableCell className="font-medium">{staff.userName}</TableCell>
      <TableCell>
        <span className={`px-2 inline-block w-20 text-center text-primary-foreground rounded-md ${staff.role === 'DOCTOR' ? 'bg-green-600' : staff.role === 'STAFF' ? 'bg-blue-600' : 'bg-zinc-600'}`}>
          {staff.role}
        </span>
      </TableCell>
      <TableCell>{staff.email}</TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Button size={"icon"} variant={'outline'} onClick={() => { updateStaff(staff) }}
            className="hover:bg-primary focus:bg-primary hover:text-primary-foreground focus:text-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer rounded-full w-8 h-8">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button size={"icon"} variant={'outline'} onClick={() => { deleteStaff(staff) }}
            className="hover:bg-destructive focus:bg-destructive hover:text-destructive-foreground focus:text-destructive-foreground focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer rounded-full w-8 h-8 ">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default StaffTableElement;
