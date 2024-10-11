import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"

import { department } from "./DepartmentsList";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface depDeleteProps {
  departmentToDelete: department | null;
  setDepartmentToDelete: React.Dispatch<React.SetStateAction<department | null>>;
}

const DepatmentDeleteDialog = ({ departmentToDelete, setDepartmentToDelete }: depDeleteProps) => {

  const handleClose = () => {
    if (departmentToDelete) {
      setDepartmentToDelete(null)
    }
  }

  const handleDelete = () => {
    console.log(`Deleted ${departmentToDelete?.name}`);
  }

  return (
    <Dialog open={!!departmentToDelete} onOpenChange={(open) => { if (!open) setDepartmentToDelete(null) }} >
      <DialogContent className="max-w-md sm:max-w-md ">
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>Delete "{departmentToDelete?.name}"?</DialogTitle>
          <VisuallyHidden>
            <DialogDescription className='text-start'>
              Confirm delete actions
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <p className="my-1">Are You sure you want to delete this department?</p>

        <DialogFooter className="sm:justify-between gap-2">
          <Button type="button" variant="secondary" className='rounded-lg' onClick={handleClose}>
            Close
          </Button>
          <Button variant={'destructive'} className='rounded-lg' onClick={() => { handleDelete() }}>
            Delete
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}

export default DepatmentDeleteDialog;