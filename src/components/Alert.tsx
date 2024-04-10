import { useNavigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import {
  AlertMask,
  AlertMessage,
  AlertModal,
  AlertOkButton,
} from "./styledComponents/AlertStyle";

export const Alert = () => {
  const { alertMessage, removeAlert } = useAlert();
  const navigate = useNavigate();

  const handleClick = () => {
    removeAlert();
    navigate("/");
  };

  return (
    <>
      <AlertMask onClick={handleClick}></AlertMask>
      <AlertModal>
        <AlertMessage>{alertMessage()}</AlertMessage>
        <AlertOkButton onClick={handleClick}>OK !</AlertOkButton>
      </AlertModal>
    </>
  );
};
