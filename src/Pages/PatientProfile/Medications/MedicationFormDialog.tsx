
import useAlert from "@/hooks/useAlert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { medication } from "./Medications"
import { useForm } from "react-hook-form";
import { useLayoutEffect } from "react";
import { Input } from "@/components/ui/input";

const formDefaultValues = {
  name: '',
  description: ''
}

interface medicationFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  medicationToUpdate: medication | null;
  setMedicationToUpdate: React.Dispatch<React.SetStateAction<medication | null>>;
}

const MedicationFormDialog = ({ medicationToUpdate, setMedicationToUpdate, open, setOpen, }: medicationFormProps) => {
  const updateMode = !!medicationToUpdate
  const setAlert = useAlert()

  const form = useForm({
    mode: 'onChange',
    defaultValues: formDefaultValues
  })

  const { isDirty } = form.formState


  useLayoutEffect(() => {
    console.log('effect');
    if (medicationToUpdate) {
      form.reset({ ...medicationToUpdate })
      setOpen(true)
    }
  }, [medicationToUpdate])


  const handleCreate = (v: any) => {
    console.log(v);
    setAlert({ text: '(Demo Alert) Medication added successfully', type: 'success' })
    handleClose()
  }

  const handleUpdate = () => {
    //DEMO ALERT
    setAlert({ text: '(Demo Alert)\n Cannot update medication', type: 'error' })
    handleClose()
  }

  const handleClose = () => {
    setOpen(false)
    setMedicationToUpdate(null)
    form.reset(formDefaultValues)
  }


  return (
    <Dialog open={open} onOpenChange={(open) => { open ? setOpen(open) : handleClose() }}>

      <DialogContent className="max-w-md max-h-[80vh] overflow-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>Medication</DialogTitle>
          <DialogDescription className='text-start'>
            Enter medication details.
          </DialogDescription>
        </DialogHeader>


        <Form {...form}>

          <FormField
            control={form.control}
            name="name"
            rules={{
              required: 'this field is required',
            }}
            defaultValue=""
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel className='mb-2'>Name:</FormLabel>
                <FormControl>
                  < Input id='name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            defaultValue=""
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel className='mb-2'>Description:</FormLabel>
                <FormControl>
                  < Input id='description'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </Form>

        <DialogFooter className="sm:justify-between gap-2">

          <Button type="button" variant="secondary" className='rounded-lg' onClick={handleClose}>
            Close
          </Button>
          {
            updateMode ?
              <Button disabled={!isDirty} className='rounded-lg' onClick={form.handleSubmit(handleUpdate)}>
                Update
              </Button>
              :
              <Button disabled={!isDirty} className='rounded-lg' onClick={form.handleSubmit(handleCreate)}>
                Create
              </Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MedicationFormDialog;