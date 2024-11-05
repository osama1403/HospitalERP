import ConfirmDialog from "@/components/ConfirmDialog";
import { account } from "./Accounts";
import useAlert from "@/hooks/useAlert";

interface accountDeleteProps {
  accountToDelete: account | null;
  setAccountToDelete: React.Dispatch<React.SetStateAction<account | null>>;
}


const AccountDeleteDialog = ({ accountToDelete, setAccountToDelete }: accountDeleteProps) => {

  const setAlert = useAlert()
  const handleDelete = (account: account) => {
    console.log(`Deleted ${account?.userName}`);
    setAlert({text:'Account deleted successfully',type:'success'})
    setAccountToDelete(null)
  }

  return (
    <ConfirmDialog
      element={accountToDelete}
      setElement={setAccountToDelete}
      message={`Are you sure you want to delete this account`}
      title={`Delete ${accountToDelete?.userName}?`}
      action={handleDelete}
    />
  );
}

export default AccountDeleteDialog;