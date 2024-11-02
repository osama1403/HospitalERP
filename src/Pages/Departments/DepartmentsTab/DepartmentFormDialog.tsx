import { useLayoutEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { department } from './DepartmentsList';
import useAlert from '@/hooks/useAlert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/api/axios'
import { isAxiosError } from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface depFormProps {
  departmentToUpdate: department | null;
  setDepartmentToUpdate: React.Dispatch<React.SetStateAction<department | null>>;
}

const DepartmentFormDialog = ({ departmentToUpdate, setDepartmentToUpdate }: depFormProps) => {
  const updateMode = !!departmentToUpdate
  const setAlert = useAlert()
  const queryClient = useQueryClient()

  const [name, setName] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    // 
    if (departmentToUpdate) {
      setName(departmentToUpdate.name)
      setType(departmentToUpdate.type)
      setOpen(true)
    } else {
      setName('')
      setType('')
    }
  }, [departmentToUpdate, open])

  // Close the dialog
  const handleClose = () => {
    if (departmentToUpdate) {
      setDepartmentToUpdate(null)
    }
    setOpen(false)
  }



  const { isPending, mutate } = useMutation({
    mutationFn: ({ dep, isUpdate }: { dep: any, isUpdate: boolean }) => {
      if (isUpdate) {
        return axios.post('/departments/update', dep)
      } else {
        return axios.post('/departments', dep)
      }
    },
    onSuccess: () => {
      setAlert({ text: updateMode ? 'department updated successfully' : 'department created successfully', type: 'success' })
      queryClient.invalidateQueries({ queryKey: ['departments-and-rooms'] })
      handleClose()
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        setAlert({ text: error.response.data?.msg || 'something went wrong', type: 'error' })
      }
    }
  })



  const handleCreate = () => {
    mutate({
      dep: {
        department: { name: name, type: type }
      },
      isUpdate: false
    })
  }

  const handleUpdate = () => {
    mutate({
      dep: {
        department: { _id: departmentToUpdate?._id, name: name }
      },
      isUpdate: true
    })
  }


  return (
    <Dialog open={open} onOpenChange={(open) => { open ? setOpen(open) : handleClose() }} >
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 rounded-lg px-3 py-1 transition-all ">
          <Plus />
          Create Department
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md sm:max-w-md">
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>Create New Department</DialogTitle>
          <DialogDescription className='text-start'>
            Enter the name of new department.
          </DialogDescription>
        </DialogHeader>

        <div>
          <div className="max-w-fit">
            <Label htmlFor="department-type" className='mb-2 block'>Department Type:</Label>
            <Select disabled={updateMode} value={type} onValueChange={(v) => { setType(v) }}>
              <SelectTrigger id='department-type' className="w-full gap-2">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'private'}>Private</SelectItem>
                <SelectItem value={'operational'}>Operational</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className=" mt-4">
            <Label htmlFor="department-name" className='mb-2 block'>Department Name:</Label>
            <Input id='department-name' value={name} onChange={(e) => { setName(e.target.value) }} />
          </div>
        </div>


        <DialogFooter className="sm:justify-between gap-2">
          <Button type="button" variant="secondary" className='rounded-lg' onClick={handleClose}>
            Close
          </Button>
          {
            updateMode ?
              <Button disabled={isPending || departmentToUpdate?.name === name.trim()} className='rounded-lg' onClick={() => { handleUpdate() }}>
                Update {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              </Button>
              :
              <Button disabled={isPending || !(name.trim() || !type)} className='rounded-lg' onClick={() => { handleCreate() }}>
                Create {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              </Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DepartmentFormDialog;