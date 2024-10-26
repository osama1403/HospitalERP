import { Button } from "@/components/ui/button";
import EmergencyContacts from "./EmergencyContacts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format, sub } from "date-fns";
import MedicalHistory from "./Medical history/MedicalHistory";
import Medications from "./Medications/Medications";
import withAlert from "@/Hoc/withAlert";
import ActiveAdmission from "./Active Admission/ActiveAdmission";



const d = new Date()



export interface Admission {
  id: number;
  date: Date;
  dischargeDate: Date | null;
}
const admissions: Admission[] = [
  {
    id: 2,
    date: sub(d, { days: 2 }),
    dischargeDate: null,
  },
  {
    id: 1,
    date: sub(d, { days: 2 }),
    dischargeDate: sub(d, { days: 1 }),
  },
]

const PatientProfile = () => {
  return (
    <>
      <div className="px-4 py-6">
        <div className="p-4 rounded-xl bg-muted">
          <p className="text-primary text-3xl mb-4">Patient: John doe</p>
          <div className="max-w-3xl">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2  ">
              <p><span className="text-primary mr-2">First name:</span>John</p>
              <p><span className="text-primary mr-2">Last name:</span>Doe</p>
              <p><span className="text-primary mr-2">Gender:</span>Male</p>
              <p><span className="text-primary mr-2">Age:</span>45</p>
              <p><span className="text-primary mr-2">Phone:</span>0912345678</p>
              <p><span className="text-primary mr-2">Adress:</span>city-street</p>
            </div>
          </div>

          <div className="mt-4">
            <EmergencyContacts contacts={[]} />
          </div>
        </div>



        {/* Medical history and medications */}

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <MedicalHistory />
          <Medications />
        </div>


        {/* Active Admission */}
        <ActiveAdmission/>




        {/* Admissions */}
        <div className="mt-6">
          <p className=" text-2xl font-medium text-primary mb-4">Admissions: 3</p>
          <Table className="max-w-2xl w-full min-w-[400px]">
            <TableHeader>
              <TableRow className="bg-primary hover:bg-primary">

                <TableHead className="text-primary-foreground py-0">Admission Date</TableHead>
                <TableHead className="text-primary-foreground py-0">Discharge Date</TableHead>

              </TableRow>
            </TableHeader>

            <TableBody>
              {

                admissions.length > 0 ?
                  admissions.map((admission) => (
                    <TableRow className="even:bg-muted cursor-pointer hover:bg-primary/25" onClick={() => { }}>
                      <TableCell>{format(admission.date, 'PPpp')}</TableCell>
                      <TableCell>{
                        admission.dischargeDate ?
                          (format(admission.dischargeDate, 'PPpp')) :
                          <span className="px-2 pb-[2px] bg-green-600 rounded-lg text-primary-foreground">Ongoing</span>
                      }</TableCell>
                    </TableRow>
                  ))
                  :
                  <TableRow className="border-0 bg-transparent hover:bg-transparent">
                    <TableCell colSpan={2} className="text-center text-lg text-muted-foreground ">
                      no admissions found
                    </TableCell>
                  </TableRow>

              }
            </TableBody>
          </Table>

        </div>
      </div>
    </>
  );
}

export default withAlert(PatientProfile);