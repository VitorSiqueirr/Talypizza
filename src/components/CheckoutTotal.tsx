import { useCart } from "../hooks/useCart";
import {
  CheckoutButton,
  CheckoutTotalDivContent,
} from "./styledComponents/CheckoutStyle";
import { Total } from "./styledComponents/PersonalizeTitle";

export const CheckoutTotal = () => {
  const { cart } = useCart();

  return (
    <CheckoutTotalDivContent>
      <Total>Total: R$ {cart.cart.total}</Total>
      <CheckoutButton type="submit">Fechar Pedido</CheckoutButton>
    </CheckoutTotalDivContent>
  );
};
