import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { AddressForm } from "./AddressForm";
import { CheckoutProducts } from "./CheckoutProducts";
import { CheckoutTotal } from "./CheckoutTotal";
import {
  CheckoutAddressAndPayment,
  CheckoutContent,
  CheckoutForm,
} from "./styledComponents/CheckoutStyle";
import { LastOrderType } from "../types/cart";
import { useAlert } from "../hooks/useAlert";
import { useNavigate } from "react-router-dom";
import { PaymentForm } from "./PaymentForm";
import { lastOrderPaymentAddressDefault } from "../types/cart";

export const FormCheckout = () => {
  const { cart, resetCart } = useCart();
  const { defineAlert } = useAlert();
  const navigate = useNavigate();
  const [lastOrder, setLastOrder] = useState<LastOrderType>({
    orderId: cart.cart.id,
    cart: {
      products: cart.cart.products,
      total: cart.cart.total,
    },
    ...lastOrderPaymentAddressDefault,
  });

  const resetLastOrder = () => {
    setLastOrder({
      orderId: cart.cart.id,
      cart: {
        products: cart.cart.products,
        total: cart.cart.total,
      },
      ...lastOrderPaymentAddressDefault,
    });
  };

  const handleSubmit = () => {
    if (lastOrder.cart.products.length === 0) {
      defineAlert("Please select at least one pizza!");
      resetLastOrder();
      return;
    } else {
      localStorage.removeItem("cart");
      resetCart();
      localStorage.setItem("lastOrder", JSON.stringify(lastOrder));
      resetLastOrder();
      navigate("/");
    }
  };

  return (
    <CheckoutContent>
      <CheckoutForm
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <CheckoutAddressAndPayment>
          <AddressForm lastOrder={lastOrder} setLastOrder={setLastOrder} />
          <PaymentForm lastOrder={lastOrder} setLastOrder={setLastOrder} />
        </CheckoutAddressAndPayment>
        <CheckoutProducts />
        <CheckoutTotal />
      </CheckoutForm>
    </CheckoutContent>
  );
};
