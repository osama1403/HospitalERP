import { useState } from "react";
import DepartmentCard from "./DepartmentCard";
import DepartmentFormDialog from "./DepartmentFormDialog";
import DepatmentDeleteDialog from "./DepartmentDeleteDialog";

export interface department {
  name: string,
  rooms: number,
  availableRooms: number
}

const demoDep: department = { name: 'Example Department', rooms: 12, availableRooms: 3 }

const DepartmentsList = () => {
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
        <DepartmentCard department={demoDep} updateDep={setDepartmentToUpdate} deleteDep={setDepartmentToDelete} />
        <DepartmentCard department={demoDep} updateDep={setDepartmentToUpdate} deleteDep={setDepartmentToDelete} />
        <DepartmentCard department={demoDep} updateDep={setDepartmentToUpdate} deleteDep={setDepartmentToDelete} />
        <DepartmentCard department={demoDep} updateDep={setDepartmentToUpdate} deleteDep={setDepartmentToDelete} />
        <DepartmentCard department={demoDep} updateDep={setDepartmentToUpdate} deleteDep={setDepartmentToDelete} />
      </div>

    </div>
  );
}

export default DepartmentsList;

