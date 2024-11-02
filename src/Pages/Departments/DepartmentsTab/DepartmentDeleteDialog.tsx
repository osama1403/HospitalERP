import ConfirmDialog from "@/components/ConfirmDialog";
import { department } from "./DepartmentsList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/api/axios";
import useAlert from "@/hooks/useAlert";
import { isAxiosError } from "axios";

interface depDeleteProps {
  departmentToDelete: department | null;
  setDepartmentToDelete: React.Dispatch<React.SetStateAction<department | null>>;
}


const DepatmentDeleteDialog = ({ departmentToDelete, setDepartmentToDelete }: depDeleteProps) => {
  const setAlert = useAlert()
  const queryClient = useQueryClient()

  const { isPending, mutate } = useMutation({
    mutationFn: async (depId: string) => {
      return axios.post('/departments/delete', { depId })
    },
    onSuccess: () => {
      setAlert({ text: 'departme deleted successfully', type: 'success' })
      queryClient.invalidateQueries({ queryKey: ['departments-and-rooms'] })
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        setAlert({ text: error.response.data?.msg || 'something went wrong' , type: 'error' })
      }
    },
    onSettled: () => {
      setDepartmentToDelete(null)
    }
  })

  const handleDelete = (departmentToDelete: department) => {
    mutate(departmentToDelete._id)
  }

  return (
    <ConfirmDialog<department>
      element={departmentToDelete}
      setElement={setDepartmentToDelete}
      title={`Delete ${departmentToDelete?.name}?`}
      message="Are you sure you want to delete this department"
      action={handleDelete}
      isLoading={isPending}
    />
  );
}

export default DepatmentDeleteDialog;