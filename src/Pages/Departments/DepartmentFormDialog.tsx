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
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';

import { department } from './DepartmentsList';


interface depFormProps {
  departmentToUpdate: department | null;
  setDepartmentToUpdate: React.Dispatch<React.SetStateAction<department | null>>;
}

const DepartmentFormDialog = ({ departmentToUpdate, setDepartmentToUpdate }: depFormProps) => {
  const updateMode = !!departmentToUpdate

  const [name, setName] = useState<string>('')
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    if (departmentToUpdate) {
      setName(departmentToUpdate.name)
      setOpen(true)
    } else {
      setName('')
    }
  }, [departmentToUpdate, open])


  const handleClose = () => {
    if (departmentToUpdate) {
      setDepartmentToUpdate(null)
    }
    setOpen(false)
  }

  const handleCreate = () => {

  }
  const handleUpdate = () => {

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

        <div className="grid gap-2 my-2">
          <Label htmlFor="department-name">Department Name:</Label>
          <Input id='department-name' value={name} onChange={(e) => { setName(e.target.value) }} />
        </div>

        <DialogFooter className="sm:justify-between gap-2">
            <Button type="button" variant="secondary" className='rounded-lg' onClick={handleClose}>
              Close
            </Button>
          {
            updateMode ?
              <Button disabled={departmentToUpdate?.name === name} className='rounded-lg' onClick={() => { handleUpdate() }}>
                Update
              </Button>
              :
              <Button disabled={!(name.trim())} className='rounded-lg' onClick={() => { handleCreate() }}>
                Create
              </Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DepartmentFormDialog;