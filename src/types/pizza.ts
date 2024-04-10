export type PizzaType = {
  id: string;
  img: string;
  name: string;
  price: number;
};

export type PizzaContextType = {
  pizzas: PizzaType[];
  setPizzas: React.Dispatch<React.SetStateAction<PizzaType[]>>;
};
