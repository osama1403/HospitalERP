import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from 'react'
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = useState(false)
    return (
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <button onClick={() => { setShow(p => !p) }}
          className="absolute right-2 top-2"
        >
          {show ? <Eye /> : <EyeOff />}
        </button>
      </div>
    )
  }
)
PasswordInput.displayName = "Input"

export { PasswordInput }
