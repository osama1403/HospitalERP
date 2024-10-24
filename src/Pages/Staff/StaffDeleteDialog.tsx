import ConfirmDialog from "@/components/ConfirmDialog";
import { staff } from "./Staff";
import useAlert from "@/hooks/useAlert";

interface staffDeleteProps {
  staffToDelete: staff | null;
  setStaffToDelete: React.Dispatch<React.SetStateAction<staff | null>>;
}


const StaffDeleteDialog = ({ staffToDelete, setStaffToDelete }: staffDeleteProps) => {

  const setAlert = useAlert()
  const handleDelete = (staff: staff) => {
    console.log(`Deleted ${staff?.userName}`);
    setAlert({text:'Account deleted successfully',type:'success'})
    setStaffToDelete(null)
  }

  return (
    <ConfirmDialog
      element={staffToDelete}
      setElement={setStaffToDelete}
      message={`Are you sure you want to delete this account`}
      title={`Delete ${staffToDelete?.userName}?`}
      action={handleDelete}
    />
  );
}

export default StaffDeleteDialog;