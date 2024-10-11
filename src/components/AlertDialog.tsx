import { AlertContext, alertContextType } from "@/Contexts/AlertContext";
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
import { AlertTriangle, Check } from "lucide-react";
import { useLayoutEffect, useState, useContext } from "react";

export interface alertType {
  text: string;
  type: 'success' | 'error'
}

const AlertDialog = () => {
  const { alert } = useContext(AlertContext) as alertContextType
  const [open, setOpen] = useState<boolean>(false)

  useLayoutEffect(() => {
    if (alert.text) {
      setOpen(true)
    }
  }, [alert])

  const isSuccess = alert.type === 'success'

  return (
    <Dialog open={open} onOpenChange={(b) => { setOpen(b) }} >
      <DialogContent className={`max-w-md sm:max-w-sm ${isSuccess ? ' border-green-700' : 'border-red-700'}`}>
        <DialogHeader>
          <DialogTitle className={`flex justify-center `}>
            {
              isSuccess ?
                <Check className="w-10 h-10 text-green-600" />
                :
                <AlertTriangle className="w-10 h-10 text-red-600" />
            }
          </DialogTitle>
          <VisuallyHidden>
            <DialogDescription className='text-start'>
              Alert: {alert?.text}
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <p className="mb-6 text-lg text-center">{alert?.text}</p>

        <DialogFooter className="justify-center sm:justify-center ">
          <Button type="button" variant="default" className={`px-6 ${isSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} rounded-lg`} onClick={() => { setOpen(false) }}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AlertDialog;