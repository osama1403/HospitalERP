import { useCallback, useState } from "react";
import { DataElement, DataList } from "../Datalist";
import MedicalHistoryFormDialog from "./MedicalHistoryFormDialog";
import MedicalHistoryDeleteDialog from "./MedicalHistoryDeleteDialog";

export interface medicalHistory {
  _id: string;
  name: string;
  description?: string;
}

const MedicalHistory = ({ medicalHistory }: { medicalHistory: medicalHistory[] }) => {

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

      <MedicalHistoryDeleteDialog
        medicalHistoryToDelete={medicalHistoryToDelete}
        setMedicalHistoryToDelete={setMedicalHistoryToDelete}
      />

      <DataList title={`Medical History: ${medicalHistory.length}`} onAddClick={() => { setMedicalHistoryFormOpen(true) }}>
        {
          medicalHistory?.length>0?
          medicalHistory.map((el) => (
            <DataElement
              key={el._id}
              element={{ ...el }}
              handleDelete={setMedicalHistoryToDelete}
              handleEdit={setMedicalHistoryToUpdate}
            />
          ))
          :
          <p className="text-muted-foreground text-center">no elements</p>
        }
      </DataList>
    </>

  );
}

export default MedicalHistory;
