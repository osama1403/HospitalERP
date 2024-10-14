import { useLayoutEffect, useState, memo } from 'react'
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  useForm
} from 'react-hook-form'
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Label } from '@/components/ui/label';
import { room } from './RoomsList';
import useAlert from '@/hooks/useAlert';


interface roomFormProps {
  roomToUpdate: room | null;
  setRoomToUpdate: React.Dispatch<React.SetStateAction<room | null>>;
}

const RoomFormDialog = ({ roomToUpdate, setRoomToUpdate }: roomFormProps) => {
  const updateMode = !!roomToUpdate

  const setAlert = useAlert()

  const [open, setOpen] = useState(false)

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      depId: '',
      size: 0,
    }
  })
  const { isDirty, defaultValues } = form.formState

  useLayoutEffect(() => {
    console.log('effect');
    if (roomToUpdate) {
      form.reset({
        name: roomToUpdate.name,
        depId: roomToUpdate.departmentId,
        size: roomToUpdate.size
      })
      setOpen(true)
    }
  }, [roomToUpdate])

  useLayoutEffect(() => {
    if (!open) {
      form.reset({
        name: '',
        depId: '',
        size: 0,
      })
    }
  }, [open])


  const handleClose = () => {
    console.log(defaultValues);

    if (roomToUpdate) {
      setRoomToUpdate(null)
    }
    setOpen(false)
  }

  const handleCreate = () => {
    //DEMO ALERT
    setAlert({ text: '(Demo Alert)\n Cannot create room', type: 'error' })
    handleClose()
  }

  const handleUpdate = () => {

    setAlert({ text: '(Demo Alert)\n Room updated successfully', type: 'success' })
    handleClose()
  }

  return (
    <Dialog open={open} onOpenChange={(open) => { open ? setOpen(open) : handleClose() }} >
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 rounded-lg px-3 py-1 transition-all ">
          <Plus />
          Create Room
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md sm:max-w-md">
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>Create New Room</DialogTitle>
          <DialogDescription className='text-start'>
            Enter the room details.
          </DialogDescription>
        </DialogHeader>


        <Form {...form}>
          <div className="grid gap-4 my-2">
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: 'this field is required',
                maxLength: {
                  value: 20, message: 'max-length 20 characters'
                }
              }}
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel className='mb-2'>Room Name:</FormLabel>
                  <FormControl>
                    < Input id='room-name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />

            <div className='flex flex-wrap gap-5 '>
              <div className='flex-1 min-w-36'>
                <FormField
                  control={form.control}
                  name='depId'
                  rules={{
                    required: 'this field is required'
                  }}
                  render={({ field }: { field: any }) => (

                    <FormItem>
                      <FormLabel className='mb-2'>Department:</FormLabel>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger id='room-dep' className="w-full">
                            <SelectValue placeholder="Select Department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Department-1</SelectItem>
                          <SelectItem value="2">Department-2</SelectItem>
                          <SelectItem value="3">Department-3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )
                  }
                />
              </div>

              <div className='flex-1 min-w-36'>
                {/* <Label htmlFor="room-size" className='mb-2'>Room Size:</Label> */}
                <FormField
                  control={form.control}
                  name='size'
                  rules={{ required: 'this field is required', validate: (value) => value > 0 || 'Room Size must be at least 1' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Size:</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} onChange={(e) => { if (e.target.value === '' || /^[0-9\b]+$/.test(e.target.value)) field.onChange(Number(e.target.value)) }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>


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

export default memo(RoomFormDialog);