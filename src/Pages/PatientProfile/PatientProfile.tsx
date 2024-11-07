import EmergencyContacts from "./EmergencyContacts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { differenceInYears, format } from "date-fns";
import MedicalHistory from "./Medical history/MedicalHistory";
import Medications from "./Medications/Medications";
import withAlert from "@/Hoc/withAlert";
import ActiveAdmission from "./Active Admission/ActiveAdmission";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import PageLoader from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AdmissionDialog from "./Admission Dialog/AdmissionDialog";



export interface Admission {
  _id: string;
  date: Date;
  dischargeDate?: Date;
}


const PatientProfile = () => {
  const { id } = useParams()
  const { data, isFetching, error } = useQuery({
    queryKey: ['patient', id],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/patients/${id}`, { signal })
      return response.data
    }
  })


  if (isFetching) {
    return (
      <PageLoader />
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-lg text-destructive">{error.message}</p>
      </div>
    )
  }

  const activeAdmissionId = data?.admissions?.find((el: any) => el.dischargeDate === undefined)?._id

  return (
    <>
      <div className="px-4 py-6">

        <div className="p-4 rounded-xl bg-muted">
          <p className="text-primary text-3xl mb-2">Patient: {`${data.firstName} ${data.lastName}`}</p>
          {
            !activeAdmissionId &&
            <AdmissionDialog id={id!}/>
          }
          <div className="max-w-3xl">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2  ">
              <p><span className="text-primary mr-2">First name: </span>{data.firstName}</p>
              <p><span className="text-primary mr-2">Last name: </span>{data.lastName}</p>
              <p><span className="text-primary mr-2">Gender: </span>{data.gender}</p>
              <p><span className="text-primary mr-2">Age: </span>{differenceInYears(new Date(), data.birthday)}</p>
              <p><span className="text-primary mr-2">Phone: </span>{data.phone}</p>
              <p><span className="text-primary mr-2">Adress: </span>{data.adress || '-'}</p>
            </div>
          </div>

          <div className="mt-4">
            <EmergencyContacts contacts={data.emergencyContacts} />
          </div>
        </div>



        {/* Medical history and medications */}

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <MedicalHistory medicalHistory={data.medicalHistory} />
          <Medications medications={data.medications} />
        </div>


        {/* Active Admission */}

        {
          activeAdmissionId &&
          <ActiveAdmission admissionId={activeAdmissionId} />
        }




        {/* Admissions */}
        <div className="mt-6">
          <p className=" text-2xl font-medium text-primary mb-4">Admissions: {data.admissions?.length}</p>
          <Table className="max-w-2xl w-full min-w-[400px]">
            <TableHeader>
              <TableRow className="bg-primary hover:bg-primary">

                <TableHead className="text-primary-foreground py-0">Admission Date</TableHead>
                <TableHead className="text-primary-foreground py-0">Discharge Date</TableHead>

              </TableRow>
            </TableHeader>

            <TableBody>
              {

                data.admissions?.length > 0 ?
                  data.admissions.map((admission: Admission) => (
                    <TableRow key={admission._id} className="even:bg-muted cursor-pointer hover:bg-primary/25" onClick={() => { }}>
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