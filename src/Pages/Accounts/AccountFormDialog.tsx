import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/passwordInput";
import { account } from "./Accounts";
import StaffFormFields from "./StaffFormFields";
import { useLayoutEffect, useState } from "react";
import useAlert from "@/hooks/useAlert";



interface accountFormProps {
  accountToUpdate: account | null;
  setAccountToUpdate: React.Dispatch<React.SetStateAction<account | null>>;
}


const formDefaultValues = {
  userName: '',
  email: '',
  password: '',
  role: ''
}


const AccountFormDialog = ({ accountToUpdate, setAccountToUpdate }: accountFormProps) => {
  const updateMode = !!accountToUpdate
  const setAlert = useAlert()

  const [open, setOpen] = useState(false)


  const form = useForm({
    mode: 'onChange',
    defaultValues: formDefaultValues
  })

  const { isDirty } = form.formState
  const selectedRole = form.watch('role')


  useLayoutEffect(() => {
    console.log('effect');
    if (accountToUpdate) {
      form.reset({ ...accountToUpdate })
      setOpen(true)
    }
  }, [accountToUpdate])


  // Handlers

  const handleCreate = (v: any) => {
    console.log(v);
    setAlert({ text: '(Demo Alert)\n Staff Added successfully', type: 'success' })
    handleClose()

  }

  const handleUpdate = () => {
    //DEMO ALERT
    setAlert({ text: '(Demo Alert)\n Cannot update staff', type: 'error' })
    handleClose()
  }

  const handleClose = () => {
    setOpen(false)
    setAccountToUpdate(null)
    form.reset(formDefaultValues)
  }

  return (

    <Dialog open={open} onOpenChange={(open) => { open ? setOpen(open) : handleClose() }}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 rounded-lg px-3 py-1 transition-all ">
          <Plus />
          Add Account
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md sm:max-w-xl max-h-[80vh] overflow-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>Add new account</DialogTitle>
          <DialogDescription className='text-start'>
            Enter account details.
          </DialogDescription>
        </DialogHeader>

        {/* User Name */}
        <Form {...form}>
          <div className="grid items-center sm:grid-cols-2 gap-4 my-2">
            <FormField
              control={form.control}
              name="userName"
              rules={{
                required: 'this field is required',
                maxLength: {
                  value: 20, message: 'max-length 20 characters'
                }
              }}
              defaultValue=""
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel className='mb-2'>User name:</FormLabel>
                  <FormControl>
                    < Input id='user-name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />

            {/* ROLE */}
            <FormField
              control={form.control}
              name='role'
              rules={{
                required: 'this field is required'
              }}
              render={({ field }: { field: any }) => (

                <FormItem>
                  <FormLabel className='mb-2'>Role:</FormLabel>
                  <Select defaultValue={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger disabled={updateMode} id='role' className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="DOCTOR">Doctor</SelectItem>
                      <SelectItem value="NURSE">Nurse</SelectItem>
                      <SelectItem value="STAFF">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )
              }
            />

            {/* Email */}
            <FormField
              control={form.control}
              name='email'
              rules={{
                required: 'this field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              }}
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input id="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            {
              updateMode ?
                <Button variant={'link'} className="mt-6">reset password</Button>
                :
                <FormField
                  control={form.control}
                  name='password'
                  rules={{
                    required: 'this field is required',
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      message: 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
                    }
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password:</FormLabel>
                      <FormControl>
                        <PasswordInput id="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            }

          </div>

          {
            (selectedRole === 'DOCTOR' || selectedRole === 'NURSE') && !updateMode &&
            <StaffFormFields />
          }


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

export default AccountFormDialog;