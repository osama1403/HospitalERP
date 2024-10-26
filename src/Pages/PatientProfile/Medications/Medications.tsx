import { useCallback, useState } from "react";
import { DataElement, DataList } from "../Datalist";
import MedicationFormDialog from "./MedicationFormDialog";
import ConfirmDialog from "@/components/ConfirmDialog";

export interface medication {
  id: number;
  name: string;
  description: string;
}

const Medications = () => {

  const [medicationToUpdate, setMedicationToUpdate] = useState<medication | null>(null)
  const [medicationToDelete, setMedicationToDelete] = useState<medication | null>(null)
  const [medicationFormOpen, setMedicationFormOpen] = useState(false)


  const handleDelete = useCallback((e: medication) => {
    console.log(e);
  }, [])


  return (
    <>
      <MedicationFormDialog
        medicationToUpdate={medicationToUpdate}
        setMedicationToUpdate={setMedicationToUpdate}
        open={medicationFormOpen}
        setOpen={setMedicationFormOpen}
      />

      <ConfirmDialog<medication>
        element={medicationToDelete}
        setElement={setMedicationToDelete}
        title={`Delete ${medicationToDelete?.name}?`}
        message="Are you sure you want to delete this element?"
        action={handleDelete}
      />

      <DataList
        title={`Medications: ${3}`}
        onAddClick={() => { setMedicationFormOpen(true) }}
      >
        {
          [...Array(3).keys()].map((_, idx) => (
            <DataElement<medication>
              key={idx} //demo
              element={{
                id: 1,
                name: "Data element",
                description: "lorem ipsum dolor sit amet,asjk jaowu alkn"
              }}
              handleEdit={setMedicationToUpdate}
              handleDelete={setMedicationToDelete}
            />
          ))
        }
      </DataList>
    </>
  );
}

export default Medications;
