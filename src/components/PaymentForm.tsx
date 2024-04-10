import { LastOrderType } from "../types/cart";
import {
  CheckoutDivContent,
  CheckoutInput,
  CheckoutLabel,
  CheckoutLabelText,
} from "./styledComponents/CheckoutStyle";
import { Title } from "./styledComponents/PersonalizeTitle";

export const PaymentForm = ({
  lastOrder,
  setLastOrder,
}: {
  lastOrder: LastOrderType;
  setLastOrder: React.Dispatch<React.SetStateAction<LastOrderType>>;
}) => {
  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <CheckoutDivContent>
      <Title>Pagamento</Title>
      <CheckoutLabel>
        <CheckoutLabelText>Número do Cartão</CheckoutLabelText>
        <CheckoutInput
          required
          type="number"
          value={lastOrder.payment.number}
          onChange={(e) => {
            setLastOrder((prevState) => ({
              ...prevState,
              payment: {
                ...prevState.payment,
                number: e.target.value,
              },
            }));
          }}
        />
      </CheckoutLabel>
      <CheckoutLabel>
        <CheckoutLabelText>Vencimento</CheckoutLabelText>
        <CheckoutInput
          required
          type="date"
          min={todayDate}
          value={lastOrder.payment.dueDate}
          onChange={(e) => {
            setLastOrder((prevState) => ({
              ...prevState,
              payment: {
                ...prevState.payment,
                dueDate: e.target.value,
              },
            }));
          }}
        />
      </CheckoutLabel>
      <CheckoutLabel>
        <CheckoutLabelText>CVV</CheckoutLabelText>
        <CheckoutInput
          required
          type="number"
          value={lastOrder.payment.cvv}
          onChange={(e) => {
            setLastOrder((prevState) => ({
              ...prevState,
              payment: {
                ...prevState.payment,
                cvv: e.target.value,
              },
            }));
          }}
        />
      </CheckoutLabel>
    </CheckoutDivContent>
  );
};
