import ConfirmDialog from "@/components/ConfirmDialog";
import { department } from "./DepartmentsList";

interface depDeleteProps {
  departmentToDelete: department | null;
  setDepartmentToDelete: React.Dispatch<React.SetStateAction<department | null>>;
}

const DepatmentDeleteDialog = ({ departmentToDelete, setDepartmentToDelete }: depDeleteProps) => {

  const handleDelete = (departmentToDelete: department) => {
    console.log(`Deleted ${departmentToDelete?.name}`);
    setDepartmentToDelete(null)
  }

  return (
    <ConfirmDialog<department>
      element={departmentToDelete}
      setElement={setDepartmentToDelete}
      title={`Delete ${departmentToDelete?.name}?`}
      message="Are you sure you want to delete this department"
      action={handleDelete}
    />
  );
}

export default DepatmentDeleteDialog;