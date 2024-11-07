import ConfirmDialog from "@/components/ConfirmDialog";
import { medication } from "./Medications"
import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { useParams } from "react-router-dom";
import useAlert from "@/hooks/useAlert";
import { isAxiosError } from "axios";

interface medicationDeleteDialogProps {
  medicationToDelete: medication | null;
  setMedicationToDelete: React.Dispatch<React.SetStateAction<medication | null>>;
}


const MedicationDeleteDialog = ({ medicationToDelete, setMedicationToDelete }: medicationDeleteDialogProps) => {
  const setAlert = useAlert()
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-med', medicationToDelete?._id],
    mutationFn: (v: any) => {
      return axiosInstance.post('/patients/update/delete-med', v)
    }, onSuccess: () => {
      setAlert({ text: 'medication deleted successfully ', type: 'success' })
      setMedicationToDelete(null)
      queryClient.invalidateQueries({queryKey:['patient', id]})
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        setAlert({ text: error.response.data?.msg || 'something went wrong', type: 'error' })
      }
    }
  })

  const handleDelete = useCallback((e: medication) => {
    mutate({ _id: e._id, patientId: id })
  }, [])



  return (
    <ConfirmDialog<medication>
      element={medicationToDelete}
      setElement={setMedicationToDelete}
      title={`Delete ${medicationToDelete?.name}?`}
      message="Are you sure you want to delete this element?"
      action={handleDelete}
      isLoading={isPending}
    />
  );
}

export default MedicationDeleteDialog;