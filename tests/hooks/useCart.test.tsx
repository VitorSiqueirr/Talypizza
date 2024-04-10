import React from "react";
import { CartProvider } from "../../src/contexts/provider/CartProvider";
import { renderHook } from "@testing-library/react";
import { useCart } from "../../src/hooks/useCart";
import { describe, vi, beforeEach, afterEach, it, expect } from "vitest";
import { act } from "react-dom/test-utils";
import { PizzaType } from "../../src/types/pizza";

const Setup = () => {
  const wrapper = ({ children }) => {
    return <CartProvider>{children}</CartProvider>;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { result } = renderHook(() => useCart(), { wrapper });
  return result;
};

describe("useCart", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("when not use within a EntriesProvider", () => {
    let originalError;

    beforeEach(() => {
      originalError = console.error;
      console.error = vi.fn();
    });

    afterEach(() => {
      console.error = originalError;
    });

    it("throw an error", () => {
      expect(() => {
        renderHook(() => useCart());
      }).toThrow("useCart must be used within a CartProvider");
    });
  });

  it("starting with default entries", () => {
    const result = Setup();
    expect.soft(result.current.cart).toEqual({
      cart: {
        id: expect.stringMatching(
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
        ),
        products: [],
        total: 0,
      },
      selectedPizza: {} as PizzaType,
      quantity: 0,
      showCart: false,
    });
  });

  describe("when using addToCart", () => {
    it("create a new cart an add to the localStorage", () => {
      const result = Setup();
      const cartResult = {
        id: expect.stringMatching(
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
        ),
        products: [
          {
            id: "1",
            img: "/4queijos.png",
            name: "4 queijos",
            price: 55,
            quantity: 10,
          },
        ],
        total: 550,
      };
      const newPizza = {
        id: "1",
        img: "/4queijos.png",
        name: "4 queijos",
        price: 55,
      };
      const quantity = 10;

      act(() => {
        result.current.addToCart(newPizza, quantity);
      });

      expect.soft(result.current.cart.cart).toEqual(cartResult);

      expect
        .soft(JSON.parse(localStorage.getItem("cart") || "{}"))
        .toEqual(cartResult);
    });

    it("if there's already one product with the same id just adds the new quantity to thw old one", () => {
      const result = Setup();
      const cartResult = {
        id: expect.stringMatching(
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
        ),
        products: [
          {
            id: "1",
            img: "/4queijos.png",
            name: "4 queijos",
            price: 40,
            quantity: 6,
          },
          {
            id: "2",
            img: "/calabresa.png",
            name: "Calabresa",
            price: 55,
            quantity: 5,
          },
        ],
        total: 515,
      };
      const pizza1 = {
        id: "1",
        img: "/4queijos.png",
        name: "4 queijos",
        price: 40,
      };
      const pizza2 = {
        id: "2",
        img: "/calabresa.png",
        name: "Calabresa",
        price: 55,
      };
      const pizza3 = {
        id: "1",
        img: "/4queijos.png",
        name: "4 queijos",
        price: 40,
      };
      const quantity = 1;
      const quantity2 = 5;

      act(() => {
        result.current.addToCart(pizza1, quantity);
      });
      act(() => {
        result.current.addToCart(pizza2, quantity2);
      });
      act(() => {
        result.current.addToCart(pizza3, quantity2);
      });

      expect.soft(result.current.cart.cart).toEqual(cartResult);

      expect
        .soft(JSON.parse(localStorage.getItem("cart") || "{}"))
        .toEqual(cartResult);
    });
  });

  describe("when using changeQuantity", () => {
    it("changes the quantity", () => {
      const result = Setup();
      const quantity = 10;

      expect.soft(result.current.cart.quantity).toEqual(0);

      act(() => {
        result.current.changeQuantity(quantity);
      });

      expect.soft(result.current.cart.quantity).toEqual(quantity);
    });
  });

  describe("when using showCartTrue", () => {
    it("changes the showCart to true", () => {
      const result = Setup();

      expect.soft(result.current.cart.showCart).toEqual(false);

      act(() => {
        result.current.showCartTrue();
      });

      expect.soft(result.current.cart.showCart).toEqual(true);
    });
  });

  describe("when using defineSelectedPizza", () => {
    it("changes the selectedPizza to the newPizza", () => {
      const result = Setup();
      const newPizza = {
        id: "1",
        img: "/4queijos.png",
        name: "4 queijos",
        price: 55,
      };

      expect.soft(result.current.cart.selectedPizza).toEqual({} as PizzaType);

      act(() => {
        result.current.defineSelectedPizza(newPizza);
      });

      expect.soft(result.current.cart.selectedPizza).toEqual(newPizza);
    });
  });

  describe("when using resetSelectedPizza", () => {
    it("resets the value of selected Pizza, quantity, and showCart", () => {
      const result = Setup();
      const newPizza = {
        id: "1",
        img: "/4queijos.png",
        name: "4 queijos",
        price: 55,
      };
      const quantity = 10;

      act(() => {
        result.current.defineSelectedPizza(newPizza);
        result.current.changeQuantity(quantity);
        result.current.showCartTrue();
      });

      expect.soft(result.current.cart.selectedPizza).toEqual(newPizza);
      expect.soft(result.current.cart.quantity).toEqual(quantity);
      expect.soft(result.current.cart.showCart).toEqual(true);

      act(() => {
        result.current.resetSelectedPizza();
      });

      expect.soft(result.current.cart.selectedPizza).toEqual({} as PizzaType);
      expect.soft(result.current.cart.quantity).toEqual(0);
      expect.soft(result.current.cart.showCart).toEqual(false);
    });
  });
});
