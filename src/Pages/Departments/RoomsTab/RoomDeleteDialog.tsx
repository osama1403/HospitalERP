import ConfirmDialog from "@/components/ConfirmDialog";
import { room } from "./RoomsList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/api/axios";
import useAlert from "@/hooks/useAlert";
import { isAxiosError } from "axios";


interface roomDeleteProps {
  roomToDelete: room | null;
  setRoomToDelete: React.Dispatch<React.SetStateAction<room | null>>;
}

const RoomDeleteDialog = ({ roomToDelete, setRoomToDelete }: roomDeleteProps) => {
  const setAlert = useAlert()
  const queryClient = useQueryClient()

  const { isPending, mutate } = useMutation({
    mutationFn: async (roomId: string) => {
      return axios.post('/rooms/delete', { roomId })
    },
    onSuccess: () => {
      setAlert({ text: 'room deleted successfully', type: 'success' })
      queryClient.invalidateQueries({ queryKey: ['departments-and-rooms'] })
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        setAlert({ text: error.response.data?.msg || 'something went wrong', type: 'error' })
      }
    },
    onSettled: () => {
      setRoomToDelete(null)
    }
  })


  const handleDelete = (roomToDelete: room): void => {
    mutate(roomToDelete._id)
  }

  return (
    <ConfirmDialog<room>
      element={roomToDelete}
      setElement={setRoomToDelete}
      message="Are you sure you want to delete this room"
      title={`Delete ${roomToDelete?.name}?`}
      action={handleDelete}
      isLoading={isPending}
    />
  );
}

export default RoomDeleteDialog;