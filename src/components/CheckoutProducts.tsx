import { useCart } from "../hooks/useCart";
import {
  CheckoutDivContent,
  CheckoutProductsDiv,
} from "./styledComponents/CheckoutStyle";
import { CheckoutCard } from "./styledComponents/List";
import { Title } from "./styledComponents/PersonalizeTitle";
import {
  PizzaImg,
  PizzaInfos,
  PizzaName,
  PizzaPrice,
  PizzaQuantity,
} from "./styledComponents/Pizza";

export const CheckoutProducts = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <CheckoutDivContent>
        <Title>Produtos:</Title>
        <CheckoutProductsDiv>
          {cart.cart.products.map((product, index) => {
            return (
              <CheckoutCard
                key={index}
                role={"pizza-card"}
                onClick={() => {
                  removeFromCart(product.id);
                }}>
                <PizzaImg src={product.img} />
                <PizzaInfos>
                  <PizzaName>{product.name}</PizzaName>
                  <PizzaPrice>R$ {product.price}</PizzaPrice>
                  <PizzaQuantity>{product.quantity}. und</PizzaQuantity>
                </PizzaInfos>
              </CheckoutCard>
            );
          })}
        </CheckoutProductsDiv>
      </CheckoutDivContent>
    </>
  );
};
