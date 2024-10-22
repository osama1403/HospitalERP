import { TableCell, TableRow } from "@/components/ui/table";
import { Admission } from "./Admissions";
import { format } from "date-fns";
import { memo } from "react";


const handleClick= (id:string)=>{
  console.log(id);
}

const AdmissionTableElement = ({ admission }: { admission: Admission }) => {
  return (
    <TableRow className="even:bg-muted cursor-pointer hover:bg-primary/25" onClick={() => { handleClick(admission.id) }}>
      <TableCell className="font-medium">{admission.name}</TableCell>
      <TableCell>{admission.age}</TableCell>
      <TableCell>{format(admission.date, 'PPpp')}</TableCell>
      <TableCell>{admission.department}</TableCell>
      <TableCell>{admission.room}</TableCell>
    </TableRow>
  );
}

export default memo(AdmissionTableElement);