import { useQuery } from "@tanstack/react-query";
import AdmissionActions from "./AdmissionActions";
import { memo } from "react";
import axiosInstance from "@/api/axios";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const ActiveAdmission = ({ admissionId }: { admissionId: string }) => {

  const { data, error, isFetching } = useQuery({
    queryKey: ['active-admission', admissionId],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/admission/${admissionId}`, { signal })
      return response.data
    }
  })


  if (isFetching) {
    return (
      <div className="w-full p-4 mt-6 rounded-xl border-[3px] border-red-400 bg-mutd flex items-center ">
        <Loader2 className="w-7 h-7 text-red-600 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full p-4 mt-6 rounded-xl border-[3px] border-red-400 bg-mutd ">
        <div className="flex items-center justify-center">
          <p className="text-lg text-destructive">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-4 mt-6 rounded-xl border-[3px] border-red-400 bg-mutd  ">

      <p className="text-2xl text-red-500 mb-2 ">Active admission:</p>
      <div className="h-[1px] bg-red-400 my-4"></div>
      <div className="max-w-3xl">
        <div className="sm:grid sm:grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-2 space-y-2 sm:space-y-0 ">
          <p className="flex flex-wrap"><span className="text-primary font-medium mr-2">Admission date: </span>{format(data.date,'PPpp')}</p>
          <p className="flex flex-wrap"><span className="text-primary font-medium mr-2">Expected discharge: </span>{data.expectedDischarge}</p>
          <p className="flex flex-wrap"><span className="text-primary font-medium mr-2">Dedicated Doctor: </span>{data.doctorId.name}</p>
          <p className="flex flex-wrap"><span className="text-primary font-medium mr-2">Department/Room:</span>{data.roomId.depId.name} - {data.roomId.name}</p>
        </div>
      </div>

      <div className="mt-6 lg:grid grid-cols-5 gap-4 max-w-5xl">

        <div className="col-span-2 order-2 mb-4 lg:mb-0">
          <AdmissionActions id={admissionId} data={data}/>
        </div>

        <div className="mb-4 lg:mb-0 col-span-3 p-4 space-y-3 max-h-96 overflow-auto bg-primary/5  rounded-xl scrollbar-hide">
          {
            data.notes.map((el:any) => (

              <div key={el._id} className="p-2 bg-primary/15 rounded-lg">
                <p className="text-sm text-muted-foreground">{format(el.data,'PPpp')}</p>
                <p className="text-lg">{el.title}</p>
                <p>{el.description}</p>
              </div>
            ))
          }
        </div>



      </div>
    </div>
  );
}

export default memo(ActiveAdmission);