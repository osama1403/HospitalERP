import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateTimePicker } from "@/components/ui/dateTimePicker";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { useEffect, useState } from "react";
import { ArrowUpRight, Loader2, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";



const PatientInfo = () => {
  const { control, watch } = useFormContext()

  const [fn, ln] = watch(['patient.firstName', 'patient.lastName'])
  
  // check if patient already exists
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: ['check-patient-existance', fn,ln],
    queryFn: async ({ signal }) => {
      const response = await axiosInstance.get(`/patients/byname?fn=${fn}&ln=${ln}`, { signal })
      return response.data
    },
    enabled: false,
  })


  const handleNameBlur=()=>{
    if (fn && ln) {
      refetch()
    }
  }


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
              <Input {...field} onBlur={(e) => { field.onBlur(e); handleNameBlur() }} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div>


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
                <Input {...field} onBlur={(e) => { field.onBlur(e); handleNameBlur() }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {
          (data?._id || error || isFetching) &&
          <div className="pt-2 text-sm flex items-center">
            {
              error && <TriangleAlert className="text-destructive w-5 h-5" />
            }
            {
              isFetching && <Loader2 className="w-5 h-5 animate-spin" />
            }
            {
              data?._id &&
              <Link to={`/patients/${data._id}`}
                className="px-2 py-[2px] hover:underline rounded-md bg-yellow-600 text-white flex items-center gap-1"
              >
                Go to patient
                <ArrowUpRight className="w-4 h-4" /> </Link>
            }
          </div>
        }

      </div>

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
            <DateTimePicker {...field} granularity="day" yearRange={100} displayFormat={{ hour24: 'PPP' }} />
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
                className="flex flex-row space-x-3"
              >
                <FormItem className="flex items-center space-x-1 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="M" />
                  </FormControl>
                  <FormLabel className="font-normal text-foreground">
                    M
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="F" />
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