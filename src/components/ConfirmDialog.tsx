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
import { Loader2 } from "lucide-react";
import { useCallback } from "react";


interface confirmDialogProps<T> {
  element: T | null;
  setElement: React.Dispatch<React.SetStateAction<T | null>>;
  title: string;
  message: string;
  action(E: T): void;
  isLoading?: boolean;
}

// Generic confirmation dialog,
// Triggered (opened) by making element Truthy
// On confirm: action is called with the element as paramenter 

const ConfirmDialog = <T,>({ element, setElement, title, message, action, isLoading = false }: confirmDialogProps<T>) => {

  const handleClose = () => {
    if (element) {
      setElement(null)
    }
  }

  const handleConfirm = useCallback(() => {
    if (element) action(element)
  }, [action, element])

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
          <Button disabled={isLoading} variant={'destructive'} className='flex items-center gap-1 rounded-lg' onClick={handleConfirm}>
            Confirm {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;