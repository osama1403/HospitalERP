import { useCallback, useState } from "react";
import { DataElement, DataList } from "../Datalist";
import MedicationFormDialog from "./MedicationFormDialog";
import ConfirmDialog from "@/components/ConfirmDialog";
import MedicationDeleteDialog from "./MedicationDeleteDialog";

export interface medication {
  _id: string;
  name: string;
  description?: string;
}

const Medications = ({ medications }: { medications: medication[] }) => {

  const [medicationToUpdate, setMedicationToUpdate] = useState<medication | null>(null)
  const [medicationToDelete, setMedicationToDelete] = useState<medication | null>(null)
  const [medicationFormOpen, setMedicationFormOpen] = useState(false)


  return (
    <>
      <MedicationFormDialog
        medicationToUpdate={medicationToUpdate}
        setMedicationToUpdate={setMedicationToUpdate}
        open={medicationFormOpen}
        setOpen={setMedicationFormOpen}
      />

      <MedicationDeleteDialog
        medicationToDelete={medicationToDelete}
        setMedicationToDelete={setMedicationToDelete}
      />

      <DataList
        title={`Medications: ${medications.length}`}
        onAddClick={() => { setMedicationFormOpen(true) }}
      >
        {
          medications?.length > 0 ?
            medications.map((el) => (
              <DataElement<medication>
                key={el._id}
                element={{ ...el }}
                handleEdit={setMedicationToUpdate}
                handleDelete={setMedicationToDelete}
              />
            ))
            :
            <p className="text-muted-foreground text-center">no elements</p>
        }
      </DataList>
    </>
  );
}

export default Medications;
