import useAlert from "@/hooks/useAlert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";

const formDefaultValues = {
  title: '',
  description: ''
}



const NoteDialog = () => {

  const [open, setOpen] = useState(false)
  const setAlert = useAlert()


  const form = useForm({
    mode: 'onChange',
    defaultValues: formDefaultValues
  })

  const { isDirty } = form.formState

  const handleSubmitNote = (v: any) => {
    console.log(v);
    setAlert({ text: 'Note added successfully', type: 'success' })
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

          <Button disabled={!isDirty} className='rounded-lg' onClick={form.handleSubmit(handleSubmitNote)}>
            Create
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>


  );
}

export default NoteDialog;