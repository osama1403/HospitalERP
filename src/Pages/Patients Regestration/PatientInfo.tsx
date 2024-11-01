import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateTimePicker } from "@/components/ui/dateTimePicker";

const PatientInfo = () => {
  const { control } = useFormContext()


  return (

    <div className=" bg-muted p-4 rounded-lg grid sm:grid-cols-2 gap-4 ">
      {/* first name */}
      <FormField
        control={control}
        name="patient.firstName"
        rules={{
          required: 'this field is required',
          maxLength: {
            value: 30, message: 'max-length 20 characters'
          }
        }}
        defaultValue={''}
        render={({ field }: { field: any }) => (
          <FormItem>
            <FormLabel className='mb-2'>First Name:</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Last Name */}
      <FormField
        control={control}
        name="patient.lastName"
        rules={{
          required: 'this field is required',
          maxLength: {
            value: 30, message: 'max-length 20 characters'
          }
        }}
        defaultValue={''}

        render={({ field }: { field: any }) => (
          <FormItem>
            <FormLabel className='mb-1'>Last Name:</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* BirthDay */}
      <FormField
        control={control}
        name="patient.birthday"
        rules={{
          required: 'this field is required',
        }}
        // defaultValue={''}

        render={({ field }) => (
          <FormItem>
          <FormLabel className='mb-2'>Date of birth</FormLabel>
          <DateTimePicker {...field} granularity="day" yearRange={100} displayFormat={{hour24:'PPP'}}/>
          <FormMessage />
        </FormItem>
        )}
      />

      {/* Gender */}
      <FormField
        control={control}
        name="patient.gender"
        rules={{
          required: 'this field is required',
        }}
        render={({ field }) => (
          <FormItem className="space-y-5">
            <FormLabel>Gender:</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-3"
              >
                <FormItem className="flex items-center space-x-1 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="male" />
                  </FormControl>
                  <FormLabel className="font-normal text-foreground">
                    M
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="female" />
                  </FormControl>
                  <FormLabel className="font-normal text-foreground">
                    F
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />


     

      {/* Phone */}
      <FormField
        control={control}
        name="patient.phone"

        rules={{
          required: 'this field is required',
          pattern: {
            value: /^\d{10}$/,
            message: 'phone must be 10 digits'
          }

        }}
        defaultValue={'09'}


        render={({ field }: { field: any }) => (
          <FormItem>
            <FormLabel className='mb-2'>Phone:</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
       {/* Adress */}
       <FormField
        control={control}
        name="patient.adress"
        defaultValue={''}
        render={({ field }: { field: any }) => (
          <FormItem>
            <FormLabel className='mb-2'>Adress:</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    </div>
  );
}

export default PatientInfo;