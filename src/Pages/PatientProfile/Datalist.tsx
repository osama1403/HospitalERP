import OptionsDropdown from "@/components/OptionsDropdown";
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { useState } from "react"


interface DataListProps {
  title: string;
  children: React.ReactNode;
  onAddClick?(): void
}

const DataList = ({ title, onAddClick = () => { }, children }: DataListProps) => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className="max-h-96 flex flex-col rounded-xl overflow-hidden border">
        <div className="p-4 bg-muted flex justify-between">
          <p className="flex gap-2 items-center text-xl text-primary font-medium cursor-pointer" onClick={() => { setOpen(p => !p) }}>
            {title}
            {open ?
              <ChevronUp className="w-5 h-5" />
              :
              <ChevronDown className="w-5 h-5" />
            }
          </p>
          <Button size={'icon'} variant={"outline"} onClick={onAddClick}
            className="bg-transparent hover:bg-primary hover:text-primary-foreground  focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer rounded- w-8 h-8">
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {
          open &&
          <div className="px-2 mb-2 overflow-y-auto scrollbar-hide">
            <div className="space-y-2 pt-2">
              {children}
            </div>
          </div>
        }
      </div>
    </div>
  )
}




interface elementType {
  _id: string;
  name: string;
  description?: string;
}

interface dataElementProps<T> {
  element: T;
  handleDelete: React.Dispatch<React.SetStateAction<T | null>>
  handleEdit: React.Dispatch<React.SetStateAction<T | null>>
}

const DataElement = <T extends elementType>({ element, handleEdit, handleDelete }: dataElementProps<T>) => {
  return (
    <div className=" bg-muted rounded-lg border-primary/20 p-2">
      <div className="flex justify-between items-center">
        <p className="text-primary text-lg font-medium mb-2">{element.name}</p>
        <OptionsDropdown handleEdit={() => { handleEdit(element) }} handleDelete={() => { handleDelete(element) }} />
      </div>
      <p className="text-sm">{element.description}</p>
    </div>
  )
}

export { DataList, DataElement }

