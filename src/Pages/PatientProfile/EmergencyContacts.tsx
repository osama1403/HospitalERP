import { Button } from "@/components/ui/button";
import { useState } from "react";

interface emergencyContact {
  name: string;
  relationship: string;
  phone: string
}

const dummyContacts : emergencyContact[]=[
  {
    name:'john snow',
    relationship:'friend',
    phone:'0987654321'
  },
  {
    name:'john snow',
    relationship:'friend',
    phone:'0987654321'
  }
]

const EmergencyContacts = ({ contacts }: { contacts: emergencyContact[] }) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <div className="flex gap-2 items-center">
        <p className="">Emergency contacts: 0</p>
        <Button className="" variant={"link"} onClick={() => { setShow(p => !p) }}>{show ? 'Hide' : 'View'}</Button>
      </div>

      {show &&

        <div className="mt-2 grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] ">
          {dummyContacts.map(contact=>(
            <div className="border border-primary/25 p-2">
              <p><span className="text-primary mr-2">Name: </span> {contact.name}</p>
              <p><span className="text-primary mr-2">Relationship: </span>{contact.relationship}</p>
              <p><span className="text-primary mr-2">Phone: </span>{contact.phone}</p>
            </div>
          ))}
          
        </div>
      }
    </div>
  );
}

export default EmergencyContacts;