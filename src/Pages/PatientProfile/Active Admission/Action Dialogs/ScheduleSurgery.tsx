import useAlert from "@/hooks/useAlert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/dateTimePicker";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


const formDefaultValues = {
  title: '',
  description: '',
  date: '',
  estDuration: {
    h: '',
    m: ''
  }

}

const ScheduleSurgery = () => {

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
        <Button className="rounded-lg px-3 py-1">
          Schedule Surgery
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md sm:max-w-xl max-h-[80vh] overflow-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>Schedule Surgery</DialogTitle>
          <DialogDescription className='text-start'>
            Enter surgery information.
          </DialogDescription>
        </DialogHeader>


        <Form {...form}>
          <div className="grid items-start sm:grid-cols-2 gap-4 my-2">

            {/* Title */}
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

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              rules={{
                required: 'this field is required',
              }}
              defaultValue=""
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel className='mb-2'>Date:</FormLabel>
                  <FormControl>
                    <DateTimePicker {...field} granularity="minute" yearRange={1} displayFormat={{ hour24: 'PPP' }} />

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
                  <FormLabel className='mb-2'>Surgery Description:</FormLabel>
                  <FormControl>
                    <Textarea
                      id='description'
                      className="resize-none scrollbar-hide"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            {/* Estimated Duration */}
            <div>
              <Label className={`${form?.formState?.errors?.estDuration?.h || form?.formState?.errors?.estDuration?.m ? 'text-destructive' : ''} text-sm font-medium leading-none`}>Est Duration:</Label>
              <div className=" flex items-center mt-2 gap-4">

                <div className="flex items-center gap-2">
                  <p>H:</p>
                  <FormField
                    control={form.control}
                    name="estDuration.h"
                    defaultValue=""
                    rules={{
                      required: 'hours are required',
                      pattern: {
                        value: /^(?:[0-3]?[0-9]|40)$/,
                        message: 'hours are not valid 0-40'
                      }
                    }}
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id='est-duration'
                            className="max-w-16"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <p>m:</p>
                  <FormField
                    control={form.control}
                    name="estDuration.m"
                    rules={{
                      required: 'minutes are required',
                      pattern: {
                        value: /^(?:[0-5]?[0-9])$/,
                        message: 'minutes: 0-59'
                      }
                    }}
                    defaultValue=""
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id='est-duration-m'
                            className="max-w-16"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

              </div>
              {
                (form?.formState?.errors?.estDuration?.h || form?.formState?.errors?.estDuration?.m)
                &&
                <p className="text-sm font-medium text-destructive">
                  {`${(form?.formState?.errors?.estDuration?.h?.message || '')} ${(form.formState.errors?.estDuration?.m?.message || '')}`}
                </p>
              }
            </div>
          </div>

        </Form>
        <ScrollArea className="max-h-28 overflow-y-auto">
          <ScrollBar />
          <div className="flex items-center flex-wrap gap-2">

            {
              [...Array(10).keys()].map((_, idx) => (
                <p className="px-3 text-sm py-1 rounded-full border ">Dr oksoak aslkda</p>
              ))
            }
          </div>
        </ScrollArea>







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

export default ScheduleSurgery;