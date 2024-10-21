import PageTitle from "@/components/PageTitle";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import PatientInfo from "./PatientInfo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HeartPulse, Pill, PlusIcon, Trash2, UsersRoundIcon } from "lucide-react";

export interface emergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

const PatientRegestration = () => {
  const [emergencyContacts, setEmergencyContacts] = useState(false)
  const [medications, setMedications] = useState(false)
  const [allergiesAndDiseases, setAllergiesAndDiseases] = useState(false)
  // const [assignRoom, setAssignRoom] = useState(false)

  const form = useForm({ shouldUnregister: true })

  const { fields: emergencyFields, append: emergencyAppend, remove: emergencyRemove } = useFieldArray({
    control: form.control,
    name: "emergencyContacts",
    shouldUnregister: true
  });

  const { fields: medicationsFields, append: medicationsAppend, remove: medicationsRemove } = useFieldArray({
    control: form.control,
    name: "medications",
    shouldUnregister: true
  });

  const { fields: allergiesAndDiseasesFields, append: allergiesAndDiseasesAppend, remove: allergiesAndDiseasesRemove } = useFieldArray({
    control: form.control,
    name: "allergiesAndDiseases",
    shouldUnregister: true
  });


  const submit = (v: any) => {
    console.log(v);
  }

  return (
    <>
      <div className="px-4 py-6">

        <PageTitle text="Register Patient" />

        <Form {...form} >
          <form onSubmit={form.handleSubmit(submit)} className="max-w-2xl space-y-4 ">
            <div >
              <h2 className="text-primary font-normal text-lg mb-2">Patient info</h2>
              <PatientInfo />
            </div>

            <div className="border-b"></div>




            {/* Medications */}
            {/* Moving this block into separate component cause unexpected behaviour with useFieldArray and Controller */}

            <div>
              <Label className="inline-flex items-center gap-4 cursor-pointer">
                <Checkbox checked={medications} onCheckedChange={(c) => { setMedications(c as boolean) }} className="rounded-lg w-4 h-4" />
                <h2 className={`${medications ? 'text-primary' : 'text-muted-foreground'} font-normal text-lg flex gap-2 items-center`}>Medications <Pill className="w-5 h-5" /></h2>
              </Label>

              {medications &&
                <div className="p-4 rounded-lg bg-muted space-y-4">
                  <Button type="button" className="flex items-center gap-2" size={'sm'} onClick={() => { medicationsAppend({ name: '', details: '' }) }}>
                    <PlusIcon className="w-5 h-5" /> Add
                  </Button>

                  {
                    medicationsFields.map((field: any, idx: number) => {

                      return (
                        <div className="gap-4 relative grid  sm:grid-cols-2 border border-primary/30 rounded-lg p-4" key={field.id}>

                          {/* Name */}
                          <FormField
                            control={form.control}
                            name={`medications.${idx}.name` as const}
                            rules={{
                              required: 'this field is required',
                            }}
                            defaultValue={''}
                            render={({ field }: { field: any }) => (
                              <FormItem>
                                <FormLabel className='mb-2'>Name:</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Details */}
                          <FormField
                            control={form.control}
                            name={`medications.${idx}.details` as const}
                            defaultValue={''}
                            rules={{
                              required: 'this field is required',
                            }}
                            render={({ field }: { field: any }) => (
                              <FormItem>
                                <FormLabel className='mb-2'>Details:</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end items-end sm:col-span-2">

                            <Button type="button" variant={'destructive'} className=" text-sm flex gap-2 items-center rounded-lg"
                              onClick={() => { medicationsRemove(idx) }}
                            > Remove <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              }
            </div>

            <div className="border-b"></div>



            {/* Allergies and chronic diseases */}
            {/* Moving this block into separate component cause unexpected behaviour with useFieldArray and Controller */}

            <div>
              <Label className="inline-flex items-center gap-4 cursor-pointer">
                <Checkbox checked={allergiesAndDiseases} onCheckedChange={(c) => { setAllergiesAndDiseases(c as boolean) }} className="rounded-lg w-4 h-4" />
                <h2 className={`${allergiesAndDiseases ? 'text-primary' : 'text-muted-foreground'} font-normal text-lg flex gap-2 items-center`}>Allergies and Chronic Diseases <HeartPulse className="w-5 h-5" /></h2>
              </Label>

              {allergiesAndDiseases &&
                <div className="p-4 rounded-lg bg-muted space-y-4">
                  <Button type="button" className="flex items-center gap-2" size={'sm'} onClick={() => { allergiesAndDiseasesAppend({ name: '', details: '' }) }}>
                    <PlusIcon className="w-5 h-5" /> Add
                  </Button>

                  {
                    allergiesAndDiseasesFields.map((field: any, idx: number) => {

                      return (
                        <div className="gap-4 relative grid  sm:grid-cols-2 border border-primary/30 rounded-lg p-4" key={field.id}>

                          {/* Name */}
                          <FormField
                            control={form.control}
                            name={`allergiesAndDiseases.${idx}.name` as const}
                            rules={{
                              required: 'this field is required',
                            }}
                            defaultValue={''}
                            render={({ field }: { field: any }) => (
                              <FormItem>
                                <FormLabel className='mb-2'>Name:</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Details */}
                          <FormField
                            control={form.control}
                            name={`allergiesAndDiseases.${idx}.details` as const}
                            defaultValue={''}
                            rules={{
                              required: 'this field is required',
                            }}
                            render={({ field }: { field: any }) => (
                              <FormItem>
                                <FormLabel className='mb-2'>Details:</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end items-end sm:col-span-2">

                            <Button type="button" variant={'destructive'} className=" text-sm flex gap-2 items-center rounded-lg"
                              onClick={() => { allergiesAndDiseasesRemove(idx) }}
                            > Remove <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              }
            </div>

            <div className="border-b"></div>

            {/* EMERGENCY CONTACTS */}
            {/* Moving this block into separate component cause unexpected behaviour with useFieldArray and Controller */}

            <div>
              <Label className="inline-flex items-center gap-4 cursor-pointer">
                <Checkbox checked={emergencyContacts} onCheckedChange={(c) => { setEmergencyContacts(c as boolean) }} className="rounded-lg w-4 h-4" />
                <h2 className={`${emergencyContacts ? 'text-primary' : 'text-muted-foreground'} font-normal text-lg flex gap-2 items-center`}>Emergency Contacts <UsersRoundIcon className="w-5 h-5" /></h2>
              </Label>

              {emergencyContacts &&
                <div className="p-4 rounded-lg bg-muted space-y-4">
                  <Button type="button" className="flex items-center gap-2" size={'sm'} onClick={() => { emergencyAppend({ name: '', relationship: '', phone: '09' }) }}>
                    <PlusIcon className="w-5 h-5" /> Add
                  </Button>

                  {
                    emergencyFields.map((field: any, idx: number) => {

                      return (
                        <div className="gap-4 relative grid sm:grid-cols-2 border border-primary/30 rounded-lg p-4" key={field.id}>

                          {/* Name */}
                          <FormField
                            control={form.control}
                            name={`emergencyContacts.${idx}.name` as const}
                            rules={{
                              required: 'this field is required',
                              maxLength: {
                                value: 30, message: 'max-length 20 characters'
                              }
                            }}
                            defaultValue={''}
                            render={({ field }: { field: any }) => (
                              <FormItem>
                                <FormLabel className='mb-2'>Name:</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Relationship */}
                          <FormField
                            control={form.control}
                            name={`emergencyContacts.${idx}.relationship` as const}
                            defaultValue={''}
                            render={({ field }: { field: any }) => (
                              <FormItem>
                                <FormLabel className='mb-2'>Relationship:</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Phone */}
                          <FormField
                            control={form.control}
                            name={`emergencyContacts.${idx}.phone` as const}
                            rules={{
                              required: 'this field is required',
                              pattern: {
                                value: /^\d{10}$/,
                                message: 'phone must be 10 digits'
                              }
                            }}
                            defaultValue={''}
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
                          <div className="flex justify-end items-end">

                            <Button type="button" variant={'destructive'} className="text-sm flex gap-2 items-center rounded-lg"
                              onClick={() => { emergencyRemove(idx) }}
                            >Remove <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              }
            </div>

            <div className="border-b"></div>

            <Button type="submit" variant={'default'} className="">Register</Button>
          </form>
        </Form>
      </div >
    </>
  );
}

export default PatientRegestration;