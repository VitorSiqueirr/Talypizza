import { usePizza } from "../hooks/usePizza";
import {
  PizzaImg,
  PizzaInfos,
  PizzaName,
  PizzaPrice,
} from "./styledComponents/Pizza";
import { Card, ListDiv, ListSection } from "./styledComponents/List";
import { PizzaType } from "../types/pizza";
import { useCart } from "../hooks/useCart";

export const Pizzalist = () => {
  const { pizzas } = usePizza();
  const { changeQuantity, showCartTrue, defineSelectedPizza } = useCart();

  const handlePizzaClick = (pizza: PizzaType) => {
    defineSelectedPizza(pizza);
    changeQuantity(1);
    showCartTrue();
  };

  return (
    <ListSection>
      <ListDiv>
        {pizzas.map((pizza, index) => (
          <Card
            key={index}
            onClick={() => handlePizzaClick(pizza)}
            role={"pizza-card"}>
            <PizzaImg src={pizza.img} />
            <PizzaInfos>
              <PizzaName>{pizza.name}</PizzaName>
              <PizzaPrice>R$ {pizza.price}</PizzaPrice>
            </PizzaInfos>
          </Card>
        ))}
      </ListDiv>
    </ListSection>
  );
};
