import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useFormContext } from "react-hook-form";

const StaffFormFields = () => {
  const { control } = useFormContext()

  return (
    <div >
      <div className="flex items-center gap-2">
        <p className="text-lg text-primary">Staff info:</p>
        <div className="border-t border-muted grow"></div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 my-2">
        <FormField
          control={control}
          name="staff.name"
          shouldUnregister={true}
          rules={{
            required: 'this field is required',
            maxLength: {
              value: 30, message: 'max-length 30 characters'
            }
          }}
          defaultValue={''}
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel className='mb-2'>Name:</FormLabel>
              <FormControl>
                < Input id='staff-name'
                  {...field}
                />
              </FormControl>
              <FormMessage />

            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="staff.specialization"
          shouldUnregister={true}
          rules={{
            required: 'this field is required',
          }}
          defaultValue={''}
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel className='mb-2'>Specialization:</FormLabel>
              <FormControl>
                < Input id='staff-specialization'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
    </div>

  );
}

export default StaffFormFields;