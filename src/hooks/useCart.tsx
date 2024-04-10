import { useContext, useEffect } from "react";
import { PizzaType } from "../types/pizza";
import { CartContext } from "../contexts/context/CartContext";
import { CartType } from "../types/cart";
import { v4 as uuidv4 } from "uuid";

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const { cart, setCart } = context;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    if (storedCart && Object.keys(storedCart).length > 0) {
      setCart((prevState) => ({ ...prevState, card: storedCart }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart.cart));
  }, [cart.cart]);

  const addToCart = (pizza: PizzaType, quantity: number) => {
    const newCart: CartType = { ...cart.cart };
    const existingProductIndex = newCart.products.findIndex(
      (product) => product.id === pizza.id
    );

    if (existingProductIndex >= 0) {
      newCart.products[existingProductIndex].quantity += quantity;
    } else {
      newCart.products.push({ ...pizza, quantity });
    }

    newCart.total += pizza.price * quantity;

    setCart((prevState) => ({ ...prevState, cart: newCart }));
  };

  const removeFromCart = (pizzaId: string) => {
    const newCart: CartType = { ...cart.cart };
    const existingProductIndex = newCart.products.findIndex(
      (product) => product.id === pizzaId
    );

    if (existingProductIndex >= 0) {
      const product = newCart.products[existingProductIndex];
      newCart.total -= product.price * product.quantity;
      newCart.products.splice(existingProductIndex, 1);
    }

    setCart((prevState) => ({ ...prevState, cart: newCart }));
  };

  const resetCart = () => {
    setCart({
      cart: { id: uuidv4(), products: [], total: 0 } as CartType,
      selectedPizza: {} as PizzaType,
      quantity: 0,
      showCart: false,
    });
  };

  const resetSelectedPizza = () => {
    setCart((prevState) => ({
      ...prevState,
      selectedPizza: {} as PizzaType,
      quantity: 0,
      showCart: false,
    }));
  };

  const changeQuantity = (quantity: number) => {
    setCart((prevState) => ({ ...prevState, quantity: quantity }));
  };

  const showCartTrue = () => {
    setCart((prevState) => ({ ...prevState, showCart: true }));
  };

  const defineSelectedPizza = (pizza: PizzaType) => {
    setCart((prevState) => ({ ...prevState, selectedPizza: pizza }));
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    resetSelectedPizza,
    changeQuantity,
    showCartTrue,
    defineSelectedPizza,
    resetCart,
  };
};
