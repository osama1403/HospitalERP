import { AlertContextProvider } from "@/Contexts/AlertContext";
import AlertDialog from "@/components/AlertDialog";

const withAlert = (Component: React.FC) => {
  return (() => (
    <AlertContextProvider>
      <Component />
      <AlertDialog />
    </AlertContextProvider>
  )
  )
}

export default withAlert;