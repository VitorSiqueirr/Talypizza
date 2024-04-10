export type ModalAlertType = {
  showAlertModal: boolean;
  message: string;
};

export type AlertContextType = {
  alert: ModalAlertType;
  setAlert: React.Dispatch<React.SetStateAction<ModalAlertType>>;
};
