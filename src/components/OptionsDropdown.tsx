import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit2, EllipsisVertical, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";


interface optionsDropdownProps {
  handleEdit(): void;
  handleDelete(): void;
}

const OptionsDropdown = ({ handleEdit, handleDelete }: optionsDropdownProps) => {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild >
        <Button size={"icon"} variant={"ghost"} className="text-muted-foreground w-7 h-7">
          <EllipsisVertical className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-0 space-y-2 ">
        <DropdownMenuItem asChild >
          <Button size={"icon"} variant={'outline'} onClick={handleEdit}
            className="hover:bg-primary focus:bg-primary hover:text-primary-foreground focus:text-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer rounded-full w-8 h-8">
            <Edit2 className="w-6 h-6" />
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild >
          <Button size={"icon"} variant={'outline'} onClick={handleDelete}
            className="hover:bg-destructive focus:bg-destructive hover:text-destructive-foreground focus:text-destructive-foreground focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer rounded-full w-8 h-8 ">
            <TrashIcon className="w-6 h-6" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OptionsDropdown;