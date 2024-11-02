import { useState } from "react";
import DepartmentCard from "./DepartmentCard";
import DepartmentFormDialog from "./DepartmentFormDialog";
import DepatmentDeleteDialog from "./DepartmentDeleteDialog";

export interface department {
  _id: string;
  name: string;
  type:string;
  rooms: number;
}

interface DepListProps {
  departments: department[];
}

const DepartmentsList = ({ departments }: DepListProps) => {
  const [departmentToUpdate, setDepartmentToUpdate] = useState<department | null>(null)
  const [departmentToDelete, setDepartmentToDelete] = useState<department | null>(null)

  return (
    <div>
      <DepartmentFormDialog
        departmentToUpdate={departmentToUpdate}
        setDepartmentToUpdate={setDepartmentToUpdate}
      />
      <DepatmentDeleteDialog
        departmentToDelete={departmentToDelete}
        setDepartmentToDelete={setDepartmentToDelete}
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 mt-5">
        {
          departments.map(el => (
            <DepartmentCard key={el._id} department={el} updateDep={setDepartmentToUpdate} deleteDep={setDepartmentToDelete} />
          ))
        }
      </div>

    </div>
  );
}

export default DepartmentsList;

