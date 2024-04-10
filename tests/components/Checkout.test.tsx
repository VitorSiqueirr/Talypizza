import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as listModule from "../../src/api/list";
import { render, screen } from "@testing-library/react";
import Checkout from "../../src/components/Checkout";
import { AlertProvider } from "../../src/contexts/provider/AlertProvider";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { CartProvider } from "../../src/contexts/provider/CartProvider";
import * as useCartModule from "../../src/hooks/useCart";
import { CartType } from "../../src/types/cart";
import { PizzaType } from "../../src/types/pizza";
import { ThemeModeProvider } from "../../src/contexts/provider/ThemeModeProvider";
import { ThemeProvider } from "styled-components";
import { theme } from "../../src/style/theme";

const customRender = () => {
  render(
    <CartProvider>
      <AlertProvider>
        <ThemeModeProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Checkout />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </ThemeModeProvider>
      </AlertProvider>
    </CartProvider>
  );
};

let useNavigateMock;
const useCartMocked = vi.spyOn(useCartModule, "useCart");
const user = userEvent.setup();
const mockStates = [
  {
    id: 11,
    nome: "Rondônia",
    regiao: { id: 1, sigla: "N", nome: "Norte" },
    sigla: "RO",
  },
  {
    id: 12,
    nome: "São Paulo",
    regiao: { id: 1, sigla: "N", nome: "Norte" },
    sigla: "SP",
  },
];
const mockPizzas = [
  {
    id: "1",
    img: "https://picsum.photos/200",
    name: "Pizza 1",
    price: 10,
  },
];

describe("Checkout", () => {
  beforeEach(() => {
    localStorage.clear();
    const mockState = vi.spyOn(listModule, "getStates");
    const mockList = vi.spyOn(listModule, "list");
    useNavigateMock = vi.fn();

    mockState.mockImplementation(() => Promise.resolve(mockStates));
    mockList.mockImplementation(() => Promise.resolve(mockPizzas));
    vi.mock("react-router-dom", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useNavigate: () => useNavigateMock,
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("when rendering the page", () => {
    it("renders the form correctly", async () => {
      useCartMocked.mockImplementation(() => ({
        cart: {
          cart: { id: "1", products: [], total: 0 } as CartType,
          selectedPizza: {} as PizzaType,
          quantity: 0,
          showCart: false,
        },
        removeFromCart: vi.fn(),
        resetCart: vi.fn(),
        addToCart: vi.fn(),
        resetSelectedPizza: vi.fn(),
        defineSelectedPizza: vi.fn(),
        changeQuantity: vi.fn(),
        showCartTrue: vi.fn(),
      }));

      await act(async () => {
        await customRender();
      });

      expect.soft(screen.getByRole("navigation")).toBeInTheDocument();
      expect
        .soft(screen.getByRole("textbox", { name: /rua/i }))
        .toBeInTheDocument();
      expect
        .soft(
          screen.getByRole("textbox", {
            name: /complemento/i,
          })
        )
        .toBeInTheDocument();
      expect
        .soft(
          screen.getByRole("combobox", {
            name: /estado/i,
          })
        )
        .toBeInTheDocument();
      expect
        .soft(
          screen.getByRole("spinbutton", {
            name: /cep/i,
          })
        )
        .toBeInTheDocument();
      expect
        .soft(
          screen.getByRole("heading", {
            name: /produtos:/i,
          })
        )
        .toBeInTheDocument();
      expect
        .soft(
          screen.getByRole("heading", {
            name: /total: r\$ 0/i,
          })
        )
        .toBeInTheDocument();
      expect
        .soft(
          screen.getByRole("button", {
            name: /fechar pedido/i,
          })
        )
        .toBeInTheDocument();
    });
  });

  describe("when there's no product in the cart", () => {
    it("should change the alert to true and shows a modal and after clicking the ok button the form is reset", async () => {
      useCartMocked.mockImplementation(() => ({
        cart: {
          cart: { id: "1", products: [], total: 0 } as CartType,
          selectedPizza: {} as PizzaType,
          quantity: 0,
          showCart: false,
        },
        removeFromCart: vi.fn(),
        resetCart: vi.fn(),
        addToCart: vi.fn(),
        resetSelectedPizza: vi.fn(),
        defineSelectedPizza: vi.fn(),
        changeQuantity: vi.fn(),
        showCartTrue: vi.fn(),
      }));

      act(() => {
        customRender();
      });

      const addressInputForm = screen.getByRole("textbox", { name: /rua/i });
      const complementInputForm = screen.getByRole("textbox", {
        name: /complemento/i,
      });
      const stateSelectForm = screen.getByRole("combobox", {
        name: /estado/i,
      });
      const cepInputForm = screen.getByRole("spinbutton", {
        name: /cep/i,
      });
      const numberInputForm = screen.getByRole("spinbutton", {
        name: /número do cartão/i,
      });
      const cvvInputForm = screen.getByRole("spinbutton", {
        name: /cvv/i,
      });
      const sendButton = screen.getByRole("button", {
        name: /fechar pedido/i,
      });

      await screen.findByText("Rondônia");

      await act(async () => {
        await user.type(addressInputForm, "Teste");
        await user.type(complementInputForm, "Teste");
        await user.selectOptions(stateSelectForm, "SP");
        await user.type(cepInputForm, "123");
        await user.type(numberInputForm, "123");
        await user.type(cvvInputForm, "123");
      });

      expect(addressInputForm.value).toEqual("Teste");
      expect(complementInputForm.value).toEqual("Teste");
      expect(stateSelectForm.value).toEqual("SP");
      expect(cepInputForm.value).toEqual("123");
      expect(numberInputForm.value).toEqual("123");
      expect(cvvInputForm.value).toEqual("123");

      await act(async () => {
        await user.click(sendButton);
      });

      const modalTitle = screen.getByRole("heading", {
        name: /please select at least one pizza!/i,
      });
      const modalOkButton = screen.getByRole("button", {
        name: /ok !/i,
      });

      expect(modalTitle).toBeInTheDocument();
      expect(modalOkButton).toBeInTheDocument();

      await act(async () => {
        await user.click(modalOkButton);
      });

      expect(addressInputForm.value).toEqual("");
      expect(complementInputForm.value).toEqual("");
      expect(stateSelectForm.value).toEqual("RO");
      expect(cepInputForm.value).toEqual("");
      expect(numberInputForm.value).toEqual("");
      expect(cvvInputForm.value).toEqual("");
    });
  });

  describe("when the form is send successfully", () => {
    it("send the form, resets the form and clean localStorage cart", async () => {
      const resetCart = vi.fn();
      const lastOrderObject = {
        address: {
          address1: "Teste",
          cep: "123",
          complement: "Teste",
          state: "SP",
        },
        cart: {
          products: [
            {
              id: "1",
              img: "https://picsum.photos/200",
              name: "Pizza 1",
              price: 10,
              quantity: 2,
            },
          ],
          total: 20,
        },
        orderId: "0205f517-cf48-4fe3-89d4-2901150e9a41",
        payment: {
          cvv: "123",
          dueDate: "2200-03-27",
          number: "123",
        },
      };
      useCartMocked.mockImplementation(() => ({
        cart: {
          cart: {
            id: "0205f517-cf48-4fe3-89d4-2901150e9a41",
            products: [
              {
                id: "1",
                img: "https://picsum.photos/200",
                name: "Pizza 1",
                price: 10,
                quantity: 2,
              },
            ],
            total: 20,
          },
          selectedPizza: {
            id: "1",
            img: "https://picsum.photos/200",
            name: "Pizza 1",
            price: 10,
          },
          quantity: 1,
          showCart: true,
        },
        removeFromCart: vi.fn(),
        resetCart: resetCart,
        addToCart: vi.fn(),
        resetSelectedPizza: vi.fn(),
        defineSelectedPizza: vi.fn(),
        changeQuantity: vi.fn(),
        showCartTrue: vi.fn(),
      }));

      customRender();

      const addressInputForm = screen.getByRole("textbox", { name: /rua/i });
      const complementInputForm = screen.getByRole("textbox", {
        name: /complemento/i,
      });
      const stateSelectForm = screen.getByRole("combobox", {
        name: /estado/i,
      });
      const cepInputForm = screen.getByRole("spinbutton", {
        name: /cep/i,
      });
      const numberInputForm = screen.getByRole("spinbutton", {
        name: /número do cartão/i,
      });
      const cvvInputForm = screen.getByRole("spinbutton", {
        name: /cvv/i,
      });
      const sendButton = screen.getByRole("button", {
        name: /fechar pedido/i,
      });

      await screen.findByText("Rondônia");

      expect.soft(screen.getByRole("pizza-card")).toBeInTheDocument();

      await act(async () => {
        await user.type(addressInputForm, lastOrderObject.address.address1);
        await user.type(
          complementInputForm,
          lastOrderObject.address.complement
        );
        await user.selectOptions(
          stateSelectForm,
          lastOrderObject.address.state
        );
        await user.type(cepInputForm, lastOrderObject.address.cep);
        await user.type(numberInputForm, lastOrderObject.payment.number);
        await user.type(cvvInputForm, lastOrderObject.payment.cvv);
      });

      await act(async () => {
        await user.click(sendButton);
      });

      expect.soft(resetCart).toHaveBeenCalledOnce();
      expect.soft(useNavigateMock).toHaveBeenCalledWith("/");
      expect.soft(JSON.parse(localStorage.getItem("cart") || "{}")).toEqual({});
      expect
        .soft(JSON.parse(localStorage.getItem("lastOrder") || "{}"))
        .toEqual(lastOrderObject);
      expect.soft(addressInputForm.value).toEqual("");
      expect.soft(complementInputForm.value).toEqual("");
      expect.soft(stateSelectForm.value).toEqual("RO");
      expect.soft(cepInputForm.value).toEqual("");
      expect.soft(numberInputForm.value).toEqual("");
      expect.soft(cvvInputForm.value).toEqual("");
    });
  });
});
