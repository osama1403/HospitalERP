import ConfirmDialog from "@/components/ConfirmDialog";
import { medicalHistory } from "./MedicalHistory"
import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { useParams } from "react-router-dom";
import useAlert from "@/hooks/useAlert";
import { isAxiosError } from "axios";

interface medicalHistoryDeleteDialogProps {
  medicalHistoryToDelete: medicalHistory | null;
  setMedicalHistoryToDelete: React.Dispatch<React.SetStateAction<medicalHistory | null>>;
}


const MedicalHistoryDeleteDialog = ({ medicalHistoryToDelete, setMedicalHistoryToDelete }: medicalHistoryDeleteDialogProps) => {
  const setAlert = useAlert()
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-med', medicalHistoryToDelete?._id],
    mutationFn: (v: any) => {
      return axiosInstance.post('/patients/update/delete-medical-history', v)
    }, onSuccess: () => {
      setAlert({ text: 'medical history deleted successfully ', type: 'success' })
      queryClient.invalidateQueries({queryKey:['patient', id]})

      setMedicalHistoryToDelete(null)
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        setAlert({ text: error.response.data?.msg || 'something went wrong', type: 'error' })
      }
    }
  })

  const handleDelete = useCallback((e: medicalHistory) => {
    mutate({ _id: e._id, patientId: id })
  }, [])



  return (
    <ConfirmDialog<medicalHistory>
      element={medicalHistoryToDelete}
      setElement={setMedicalHistoryToDelete}
      title={`Delete ${medicalHistoryToDelete?.name}?`}
      message="Are you sure you want to delete this element?"
      action={handleDelete}
      isLoading={isPending}
    />
  );
}

export default MedicalHistoryDeleteDialog;