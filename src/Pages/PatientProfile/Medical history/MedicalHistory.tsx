import { useCallback, useState } from "react";
import { DataElement, DataList } from "../Datalist";
import MedicalHistoryFormDialog from "./MedicalHistoryFormDialog";
import ConfirmDialog from "@/components/ConfirmDialog";

export interface medicalHistory {
  id: number;
  name: string;
  description: string;
}

const MedicalHistory = () => {

  const [medicalHistoryToUpdate, setMedicalHistoryToUpdate] = useState<medicalHistory | null>(null)
  const [medicalHistoryToDelete, setMedicalHistoryToDelete] = useState<medicalHistory | null>(null)
  const [medicalHistoryFormOpen, setMedicalHistoryFormOpen] = useState(false)


  const handleDelete = useCallback((e: medicalHistory) => {
    console.log(e);
  }, [])


  return (

    <>
      <MedicalHistoryFormDialog
        medicalHistoryToUpdate={medicalHistoryToUpdate}
        setMedicalHistoryToUpdate={setMedicalHistoryToUpdate}
        open={medicalHistoryFormOpen}
        setOpen={setMedicalHistoryFormOpen}
      />
      <ConfirmDialog<medicalHistory>
        element={medicalHistoryToDelete}
        setElement={setMedicalHistoryToDelete}
        title={`Delete ${medicalHistoryToDelete?.name}?`}
        message="Are you sure you want to delete this element?"
        action={handleDelete}
      />

      <DataList title={`Medical History: ${6}`} onAddClick={() => { setMedicalHistoryFormOpen(true) }}>
        {
          [...Array(6).keys()].map((_, idx) => (
            <DataElement
              key={idx} //demo
              element={{
                id: 1,
                name: "Data element",
                description: "lorem ipsum dolor sit amet,asjk jaowu alkn"
              }}
              handleDelete={setMedicalHistoryToDelete}
              handleEdit={setMedicalHistoryToUpdate}
            />
          ))
        }
      </DataList>
    </>

  );
}

export default MedicalHistory;
