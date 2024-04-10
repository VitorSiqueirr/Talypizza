import { PizzaType } from "./pizza";

export type CartProductType = PizzaType & {
  quantity: number;
};

export type CartType = {
  id: string;
  products: CartProductType[];
  total: number;
};

export type CartStateType = {
  cart: CartType;
  selectedPizza: PizzaType;
  quantity: number;
  showCart: boolean;
};

export type CartContextType = {
  cart: CartStateType;
  setCart: React.Dispatch<React.SetStateAction<CartStateType>>;
};

export type LastOrderCartType = {
  products: CartProductType[];
  total: number;
};

export type AddressType = {
  address1: string;
  complement: string;
  cep: string;
  state: string;
};

export type PaymentType = {
  number: string;
  dueDate: string;
  cvv: string;
};

export type LastOrderType = {
  orderId: string;
  cart: LastOrderCartType;
  address: AddressType;
  payment: PaymentType;
};

export const lastOrderPaymentAddressDefault = {
  address: {
    address1: "",
    complement: "",
    cep: "",
    state: "",
  },
  payment: {
    number: "",
    dueDate: "2200-03-27",
    cvv: "",
  },
};
