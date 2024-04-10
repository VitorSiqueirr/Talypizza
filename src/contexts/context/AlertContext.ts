import { createContext } from "react";
import { AlertContextType } from "../../types/alert";

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);
