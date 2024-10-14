import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";


interface confirmDialogProps<T> {
  element: T | null;
  setElement: React.Dispatch<React.SetStateAction<T | null>>;
  title: string;
  message: string;
  action: (E: T) => any
}



// Generic confirmation dialog,
// Triggered (opened) by making element Truthy
// On confirm: action is called with the element as paramenter 

const ConfirmDialog = <T,>({ element, setElement, title, message }: confirmDialogProps<T>) => {

  const handleClose = () => {
    if (element) {
      setElement(null)
    }
  }

  const handleDelete = () => {
    console.log(`Confirmed Action ${message}`);
  }

  return (
    <Dialog open={!!element} onOpenChange={(open) => { if (!open) setElement(null) }} >
      <DialogContent className="max-w-md sm:max-w-md ">
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>{title}</DialogTitle>
          <VisuallyHidden>
            <DialogDescription className='text-start'>
              Confirm action
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <p className="my-1">{message}</p>

        <DialogFooter className="sm:justify-between gap-2">
          <Button type="button" variant="secondary" className='rounded-lg' onClick={handleClose}>
            Close
          </Button>
          <Button variant={'destructive'} className='rounded-lg' onClick={handleDelete}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;