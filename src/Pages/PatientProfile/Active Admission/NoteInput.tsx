import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

const NoteInput = () => {

  const [formOpen, setFormOpen] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <div className="mb-4">
        <Button className="ml-auto flex gap-2 items-center " onClick={() => { setFormOpen(p => !p) }}>
          Add <Plus className="w-5 h-5" />
        </Button>
      </div>
      {
        formOpen &&
        <div className="p-4 max- rounded-lg border border-green-800">
          <Label htmlFor="note-input" className="mb-3 block text-primary">Note:</Label>
          <Input id="note-input" value={value} onChange={(e) => { setValue(e.target.value) }} />
          {
            error &&
            <p className="text-sm text-destructive">{error}</p>
          }

          <div className="mt-3">
            <Button size={"sm"} disabled={!value.trim()} className="flex gap-2">
              Submit {loading && <Loader2 className="animate-spin w-4 h-4" />}
            </Button>

          </div>
        </div>

      }
    </div>
  );
}

export default NoteInput;