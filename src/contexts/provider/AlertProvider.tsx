import { ReactNode, useState } from "react";
import { AlertContext } from "../context/AlertContext";
import { ModalAlertType } from "../../types/alert";

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<ModalAlertType>({
    showAlertModal: false,
    message: "",
  });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
