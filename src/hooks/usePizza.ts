import { useEffect, useState } from "react";
import { list } from "../api/list";
import { PizzaType } from "../types/pizza";

export const usePizza = () => {
  const [pizzas, setPizzas] = useState([] as Array<PizzaType>);

  useEffect(() => {
    getAllPizzasFlavours();
  }, []);

  const getAllPizzasFlavours = async () => {
    const pizzaList = await list();
    setPizzas(pizzaList);
  };

  return {
    pizzas,
  };
};
