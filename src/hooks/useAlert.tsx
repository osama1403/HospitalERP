import { useContext } from 'react'
import { AlertContext, alertContextType } from '@/Contexts/AlertContext'

const useAlert = () => {
  const { setAlert } = useContext(AlertContext) as alertContextType

  if (setAlert === undefined)
    throw new Error("useAlert must be used within a AlertContextProvider")
    
  return setAlert
}
export default useAlert
