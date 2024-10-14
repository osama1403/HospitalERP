import ConfirmDialog from "@/components/ConfirmDialog";
import { room } from "./RoomsList";


interface roomDeleteProps {
  roomToDelete: room | null;
  setRoomToDelete: React.Dispatch<React.SetStateAction<room | null>>;
}

const RoomDeleteDialog = ({ roomToDelete, setRoomToDelete }: roomDeleteProps) => {

  const handleDelete = (roomToDelete: room): void => {
    console.log(`Deleted ${roomToDelete?.name}`);
  }

  return (
    <ConfirmDialog<room>
      element={roomToDelete}
      setElement={setRoomToDelete}
      message="Are you sure you want to delete this room"
      title={`Delete ${roomToDelete?.name}?`}
      action={handleDelete}
    />
  );
}

export default RoomDeleteDialog;