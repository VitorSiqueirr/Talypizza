import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Pizzalist } from "../../src/components/Pizzalist";
import * as listModule from "../../src/api/list";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "../../src/contexts/provider/CartProvider";
import { AlertProvider } from "../../src/contexts/provider/AlertProvider";
import * as useCartModule from "../../src/hooks/useCart";
import { CartStateType } from "../../src/types/cart";
import { ThemeModeProvider } from "../../src/contexts/provider/ThemeModeProvider";
import { ThemeProvider } from "styled-components";
import { theme } from "../../src/style/theme";

const customRender = () => {
  render(
    <CartProvider>
      <AlertProvider>
        <ThemeModeProvider>
          <ThemeProvider theme={theme}>
            <Pizzalist />
          </ThemeProvider>
        </ThemeModeProvider>
      </AlertProvider>
    </CartProvider>
  );
};

describe("PizzaList", () => {
  const user = userEvent.setup();

  const mockPizzas = [
    {
      id: "1",
      img: "https://picsum.photos/200",
      name: "Pizza 1",
      price: 10,
    },
  ];

  let defineSelectedPizza;
  let changeQuantity;
  let showCartTrue;

  beforeEach(() => {
    const mockList = vi.spyOn(listModule, "list");
    defineSelectedPizza = vi.fn();
    changeQuantity = vi.fn();
    showCartTrue = vi.fn();

    vi.spyOn(useCartModule, "useCart").mockImplementation(() => ({
      cart: {} as CartStateType,
      removeFromCart: vi.fn(),
      resetCart: vi.fn(),
      addToCart: vi.fn(),
      resetSelectedPizza: vi.fn(),
      defineSelectedPizza: defineSelectedPizza,
      changeQuantity: changeQuantity,
      showCartTrue: showCartTrue,
    }));

    mockList.mockImplementation(() => Promise.resolve(mockPizzas));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("when rendering the page", () => {
    it("renders the pizzas correctly", async () => {
      customRender();

      expect
        .soft(await screen.findByText(mockPizzas[0].name))
        .toBeInTheDocument();
      expect
        .soft(await screen.findByText(`R$ ${mockPizzas[0].price}`))
        .toBeInTheDocument();
    });
  });

  describe("when click on a pizza card", () => {
    it("calls the functions setSelectedPizza, setQuantity and setShowCart", async () => {
      customRender();

      const pizzaCard = await screen.findByRole("pizza-card");

      expect.soft(pizzaCard).toBeInTheDocument();

      await user.click(pizzaCard);

      expect.soft(defineSelectedPizza).toHaveBeenCalledWith(mockPizzas[0]);
      expect.soft(changeQuantity).toHaveBeenCalledWith(1);
      expect.soft(showCartTrue).toHaveBeenCalled();
    });
  });
});
