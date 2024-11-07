import useAlert from "@/hooks/useAlert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { medicalHistory } from "./MedicalHistory"
import { useForm } from "react-hook-form";
import { useLayoutEffect } from "react";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { isAxiosError } from "axios";
import { Loader2 } from "lucide-react";

const formDefaultValues = {
  name: '',
  description: ''
}

interface medicalHistoryFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  medicalHistoryToUpdate: medicalHistory | null;
  setMedicalHistoryToUpdate: React.Dispatch<React.SetStateAction<medicalHistory | null>>;
}

const MedicalHistoryFormDialog = ({ medicalHistoryToUpdate, setMedicalHistoryToUpdate, open, setOpen, }: medicalHistoryFormProps) => {
  const updateMode = !!medicalHistoryToUpdate
  const setAlert = useAlert()
  const { id } = useParams()
  const queryClient = useQueryClient()

  const form = useForm({
    mode: 'onChange',
    defaultValues: formDefaultValues
  })

  const { isDirty } = form.formState


  useLayoutEffect(() => {
    if (medicalHistoryToUpdate) {
      form.reset({ ...medicalHistoryToUpdate })
      setOpen(true)
    }
  }, [medicalHistoryToUpdate])


  const { mutate, isPending } = useMutation({
    mutationFn: ({ v, isUpdate }: { v: medicalHistory, isUpdate: boolean }) => {
      if (isUpdate) {
        return axiosInstance.post('/patients/update/update-medical-history', v)
      } else {
        return axiosInstance.post('/patients/update/add-medical-history', v)
      }
    }, onSuccess: (res) => {
      setAlert({ text: res.data.msg, type: 'success' })
      queryClient.invalidateQueries({queryKey:['patient', id]})
      handleClose()
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        setAlert({ text: error.response.data?.msg || 'something went wrong', type: 'error' })
      }
    }

  })


  const handleCreate = (v: any) => {
    const medHis = { ...v, patientId: id }
    mutate({ v: medHis, isUpdate: false })
  }

  const handleUpdate = (v: any) => {
    const medHis = { ...v, patientId: id }
    mutate({ v: medHis, isUpdate: true })
  }

  const handleClose = () => {
    setOpen(false)
    setMedicalHistoryToUpdate(null)
    form.reset(formDefaultValues)
  }


  return (
    <Dialog open={open} onOpenChange={(open) => { open ? setOpen(open) : handleClose() }}>

      <DialogContent className="max-w-md max-h-[80vh] overflow-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>Medical History</DialogTitle>
          <DialogDescription className='text-start'>
            Enter medical history details.
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
              <Button disabled={!isDirty || isPending} className='flex items-center gap-1 rounded-lg' onClick={form.handleSubmit(handleUpdate)}>
                Update {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              </Button>
              :
              <Button disabled={!isDirty} className='flex items-center gap-1 rounded-lg' onClick={form.handleSubmit(handleCreate)}>
                Create {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              </Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MedicalHistoryFormDialog;