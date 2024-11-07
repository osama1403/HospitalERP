import useAlert from "@/hooks/useAlert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { isAxiosError } from "axios";

const formDefaultValues = {
  title: '',
  description: ''
}

interface note {
  title: string;
  description: string;
}



const NoteDialog = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const setAlert = useAlert()


  const form = useForm({
    mode: 'onChange',
    defaultValues: formDefaultValues
  })

  const { isDirty } = form.formState


  const { mutate, isPending } = useMutation({
    mutationFn: ({ v }: { v: note }) => {
      console.log(v);

      return axiosInstance.post('/admission/update/add-note', v)
    },
    onSuccess: (res) => {
      setAlert({ text: res.data.msg, type: 'success' })
      queryClient.invalidateQueries({ queryKey: ['active-admission'] })
      handleClose()
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        setAlert({ text: error.response.data?.msg || 'something went wrong', type: 'error' })
      }
    }
  })



  const handleSubmitNote = (v: any) => {
    mutate({
      v: {
        ...v, id
      }
    })
  }

  const handleClose = () => {
    form.reset()
    setOpen(false)
  }


  return (
    <Dialog open={open} onOpenChange={(open) => { open ? setOpen(open) : handleClose() }}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 rounded-lg px-3 py-1 transition-all ">
          <Plus />
          Add Note
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[80vh] overflow-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>Admission Note</DialogTitle>
          <DialogDescription className='text-start'>
            Enter admission note.
          </DialogDescription>
        </DialogHeader>


        <Form {...form}>

          <FormField
            control={form.control}
            name="title"
            rules={{
              required: 'this field is required',
            }}
            defaultValue=""
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel className='mb-2'>Title:</FormLabel>
                <FormControl>
                  < Input id='title'
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

          <Button disabled={!isDirty || isPending} className='flex items-center gap-1 rounded-lg' onClick={form.handleSubmit(handleSubmitNote)}>
            Create {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>


  );
}

export default NoteDialog;