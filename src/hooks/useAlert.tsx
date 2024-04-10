import { useContext } from "react";
import { AlertContext } from "../contexts/context/AlertContext";

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error("useAlert must be used within a AlertProvider");
  }

  const { alert, setAlert } = context;

  const showAlert = () => {
    return alert.showAlertModal;
  };

  const alertMessage = () => {
    return alert.message;
  };

  const defineAlert = (message: string) => {
    setAlert({
      showAlertModal: true,
      message: message,
    });
  };

  const removeAlert = () => {
    setAlert({
      message: "",
      showAlertModal: false,
    });
  };

  return {
    showAlert,
    alertMessage,
    defineAlert,
    removeAlert,
  };
};
