import { ReactNode, useState } from "react";
import { CartContext } from "../context/CartContext";
import { CartStateType, CartType } from "../../types/cart";
import { PizzaType } from "../../types/pizza";
import { v4 as uuidv4 } from "uuid";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartStateType>({
    cart: { id: uuidv4(), products: [], total: 0 } as CartType,
    selectedPizza: {} as PizzaType,
    quantity: 0,
    showCart: false,
  });

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
