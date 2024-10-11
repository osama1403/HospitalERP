import { Button } from "@/components/ui/button";
import { ChevronRight, Edit2, EllipsisVertical, TrashIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { memo } from "react";
import { department } from "./DepartmentsList";


interface depCardParams {
  department: department;
  updateDep: React.Dispatch<React.SetStateAction<department | null>>;
  deleteDep: React.Dispatch<React.SetStateAction<department | null>>;
}

const DepartmentCard = ({ department, updateDep, deleteDep }: depCardParams) => {
  return (
    <div className="relative w-full p-4 rounded-lg border shadow-md flex flex-col justify-between max-w-72 mx-auto bg-muted">
      <div className="grow flex items-center">
        <h3 className="text-2xl font-semibold leading-none text-primary">{department.name}</h3>
      </div>

      <div className="flex gap-3 justify-between items-end mt-6 ">
        <div>
          <p className="text-lg leading-none">{department.rooms} <span className="text-sm text-muted-foreground">Rooms</span></p>
          <p className="text-lg leading-none">{department.availableRooms} <span className="text-sm text-muted-foreground">Free</span></p>
        </div>

        <Button size={"icon"} variant={"outline"} className="w-8 h-8 rounded-lg hover:bg-primary hover:text-primary-foreground">
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>


      <DropdownMenu >
        <DropdownMenuTrigger asChild >
          <Button size={"icon"} variant={"ghost"} className="absolute top-2 right-2 text-muted-foreground w-7 h-7">
            <EllipsisVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-0 space-y-2 ">
          <DropdownMenuItem asChild >
            <Button size={"icon"} variant={'outline'} onClick={() => { updateDep(department) }}
              className="hover:bg-primary focus:bg-primary hover:text-primary-foreground focus:text-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer rounded-full w-8 h-8">
              <Edit2 className="w-6 h-6" />
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild >
            <Button size={"icon"} variant={'outline'} onClick={() => { deleteDep(department) }}
              className="hover:bg-destructive focus:bg-destructive hover:text-destructive-foreground focus:text-destructive-foreground focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer rounded-full w-8 h-8 ">
              <TrashIcon className="w-6 h-6" />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}
export default memo(DepartmentCard)