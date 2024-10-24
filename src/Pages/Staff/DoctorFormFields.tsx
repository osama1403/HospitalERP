import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useFormContext } from "react-hook-form";

const DoctorFormFields = () => {
  const { control } = useFormContext()

  return (
    <div >
      <div className="flex items-center gap-2">
        <p className="text-lg text-primary">Doctor info:</p>
        <div className="border-t border-muted grow"></div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 my-2">
        <FormField
          control={control}
          name="doctor.name"
          rules={{
            required: 'this field is required',
            maxLength: {
              value: 30, message: 'max-length 30 characters'
            }
          }}
          defaultValue={''}
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel className='mb-2'>Dr Name:</FormLabel>
              <FormControl>
                < Input id='doctor-name'
                  {...field}
                />
              </FormControl>
              <FormMessage />

            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="doctor.specialty"
          rules={{
            required: 'this field is required',
          }}
          defaultValue={''}
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel className='mb-2'>Specialty:</FormLabel>
              <FormControl>
                < Input id='doctor-specialty'
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

export default DoctorFormFields;