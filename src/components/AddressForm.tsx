import { useEffect, useState } from "react";
import {
  CheckoutDivContent,
  CheckoutInput,
  CheckoutLabel,
  CheckoutLabelText,
  CheckoutSelect,
} from "./styledComponents/CheckoutStyle";
import { Title } from "./styledComponents/PersonalizeTitle";
import { getStates } from "../api/list";
import { StatesType } from "../types/states";
import { LastOrderType } from "../types/cart";

export const AddressForm = ({
  lastOrder,
  setLastOrder,
}: {
  lastOrder: LastOrderType;
  setLastOrder: React.Dispatch<React.SetStateAction<LastOrderType>>;
}) => {
  const [states, setStates] = useState<StatesType[]>([]);

  useEffect(() => {
    getStates().then((data: StatesType[]) => {
      setStates(data);
    });
  }, []);

  return (
    <CheckoutDivContent>
      <Title>Endereço</Title>
      <CheckoutLabel>
        <CheckoutLabelText>Rua</CheckoutLabelText>
        <CheckoutInput
          required
          type="text"
          value={lastOrder.address.address1}
          onChange={(e) => {
            setLastOrder((prevState) => ({
              ...prevState,
              address: {
                ...prevState.address,
                address1: e.target.value,
              },
            }));
          }}
        />
      </CheckoutLabel>
      <CheckoutLabel>
        <CheckoutLabelText>Complemento</CheckoutLabelText>
        <CheckoutInput
          required
          type="text"
          value={lastOrder.address.complement}
          onChange={(e) => {
            setLastOrder((prevState) => ({
              ...prevState,
              address: {
                ...prevState.address,
                complement: e.target.value,
              },
            }));
          }}
        />
      </CheckoutLabel>
      <CheckoutLabel>
        <CheckoutLabelText>Estado</CheckoutLabelText>
        <CheckoutSelect
          name="states"
          id="states"
          value={lastOrder.address.state}
          onChange={(e) => {
            setLastOrder((prevState) => ({
              ...prevState,
              address: {
                ...prevState.address,
                state: e.target.value,
              },
            }));
          }}>
          {states.map((state, index) => (
            <option key={index} value={state.sigla}>
              {state.nome}
            </option>
          ))}
        </CheckoutSelect>
      </CheckoutLabel>
      <CheckoutLabel>
        <CheckoutLabelText>CEP</CheckoutLabelText>
        <CheckoutInput
          required
          type="number"
          value={lastOrder.address.cep}
          onChange={(e) => {
            setLastOrder((prevState) => ({
              ...prevState,
              address: {
                ...prevState.address,
                cep: e.target.value,
              },
            }));
          }}
        />
      </CheckoutLabel>
    </CheckoutDivContent>
  );
};
