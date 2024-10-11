import PageTitle from "@/components/PageTitle";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import DepartmentsList from "./DepartmentsTab/DepartmentsList";
import withAlert from "@/Hoc/withAlert";
import { memo } from 'react'

const Departments = () => {

  return (
    <div className="px-4 py-6">
      <PageTitle text="Departments" />

      <div className="inline-grid grid-cols-2 gap-4 py-2 rounded-lg bg- ">
        <div className="p-3 flex flex-col bg-primary/10 text-center rounded-lg">
          <p className="text-3xl font-light text-primary">4</p>
          <p>Departments</p>
        </div>
        <div className="p-3 flex flex-col bg-primary/10 text-center rounded-lg">
          <p className="text-3xl font-light text-primary">15</p>
          <p>Rooms</p>
        </div>
      </div>

      <Tabs defaultValue={'departments'} className="mt-10">
        <TabsList className="grid grid-cols-2 gap-4 w-full max-w-sm bg-muted rounded-[0.5rem] mx-auto mb-8">
          <TabsTrigger value="departments" className="rounded-lg hover:bg-primary/15 hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ">Departments</TabsTrigger>
          <TabsTrigger value="rooms" className="rounded-lg hover:bg-primary/15 hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ">Rooms</TabsTrigger>
        </TabsList>

        <TabsContent value="departments">
          <DepartmentsList />
        </TabsContent>

        <TabsContent value="rooms">
          <p>rooms</p>
        </TabsContent>
      </Tabs>

    </div>
  );
}

export default withAlert(memo(Departments));