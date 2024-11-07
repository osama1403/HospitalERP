import { TableCell, TableRow } from "@/components/ui/table";
import { Admission } from "./Admissions";
import { format } from "date-fns";
import { memo } from "react";
import { useNavigate } from "react-router-dom";



const AdmissionTableElement = ({ admission }: { admission: Admission }) => {

const navigate = useNavigate()


const handleClick= (id:string)=>{
  navigate(`/patients/${id}`)
}
  return (
    <TableRow className="even:bg-muted cursor-pointer hover:bg-primary/25" onClick={() => { handleClick(admission.patientId) }}>
      <TableCell className="font-medium">{admission.name}</TableCell>
      <TableCell>{admission.age}</TableCell>
      <TableCell>{format(admission.date, 'PPpp')}</TableCell>
      <TableCell>{admission.department}</TableCell>
      <TableCell>{admission.room}</TableCell>
    </TableRow>
  );
}

export default memo(AdmissionTableElement);