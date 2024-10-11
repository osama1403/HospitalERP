import { ReactNode, createContext, useState } from 'react'
import { alertType } from '@/components/AlertDialog'

export interface alertContextType{
  alert:alertType;
  setAlert:React.Dispatch<React.SetStateAction<alertType>>
}

const initialAlert: alertType = {
  text: '',
  type: 'success'
}

export const AlertContext = createContext<alertContextType | null>(null)

export const AlertContextProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<alertType>(initialAlert)
  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

