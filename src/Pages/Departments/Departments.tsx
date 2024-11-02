import PageTitle from "@/components/PageTitle";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import DepartmentsList from "./DepartmentsTab/DepartmentsList";
import withAlert from "@/Hoc/withAlert";
import { memo, useEffect, useState } from 'react'
import RoomsList from "./RoomsTab/RoomsList";
import { useQuery } from '@tanstack/react-query'
import axios from "@/api/axios";
import PageLoader from "@/components/PageLoader";


const Departments = () => {
  const [tab, setTab] = useState('departments')

  const { data, isFetching, error } = useQuery({
    queryKey: ['departments-and-rooms'],
    queryFn: async () => {
      const res = await axios.get('/departments/wrooms')
      return res.data
    }
  })

  useEffect(() => {
    console.log(`data: ${data}, isLoading:${isFetching}, error:${error}`);
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


  return (
    <div className="px-4 py-6">

      <PageTitle text="Departments" />


      <div className="inline-grid grid-cols-2 gap-4 py-2 rounded-lg bg- ">
        <div className="p-3 flex flex-col bg-primary/10 text-center rounded-lg">
          <p className="text-3xl font-light text-primary">{data.departments.length}</p>
          <p>Departments</p>
        </div>
        <div className="p-3 flex flex-col bg-primary/10 text-center rounded-lg">
          <p className="text-3xl font-light text-primary">{data.rooms.length}</p>
          <p>Rooms</p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={(t) => setTab(t)} className="mt-10">
        <TabsList className="grid grid-cols-2 gap-4 w-full max-w-sm bg-muted rounded-[0.5rem] mx-auto mb-8">
          <TabsTrigger value="departments" className="rounded-lg hover:bg-primary/15 hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ">Departments</TabsTrigger>
          <TabsTrigger value="rooms" className="rounded-lg hover:bg-primary/15 hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ">Rooms</TabsTrigger>
        </TabsList>

        <TabsContent value="departments">
          <DepartmentsList departments={data.departments} />
        </TabsContent>

        <TabsContent value="rooms">
          <RoomsList departments={data.departments} rooms={data.rooms} />
        </TabsContent>
      </Tabs>

    </div>
  );
}

export default withAlert(memo(Departments));