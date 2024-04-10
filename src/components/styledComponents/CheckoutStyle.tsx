import styled from "styled-components";
import { Form, SendButton } from "./Form";
import { useThemeMode } from "../../hooks/useThemeMode";

export const CheckoutContent = styled.div`
  flex-basis: 90%;
  padding: 1rem 0 1rem;
  width: 100%;
`;

export const CheckoutForm = styled(Form)`
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
`;

export const CheckoutDivContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  max-width: 60rem;
`;

export const CheckoutAddressAndPayment = styled(CheckoutDivContent)`
  @media (min-width: 710px) {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }
`;

export const CheckoutProductsDiv = styled(CheckoutDivContent)`
  display: grid;
  justify-items: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  grid-template-columns: 1fr;

  @media (min-width: 710px) {
    grid-template-columns: repeat(auto-fit, minmax(calc(100% / 3), 1fr));
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(auto-fit, minmax(calc(100% / 4), 1fr));
  }
`;
export const CheckoutTotalDivContent = styled(CheckoutDivContent)`
  @media (min-width: 440px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
`;

export const CheckoutLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

export const CheckoutLabelText = styled.p`
  margin: 0;
  padding-left: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
`;

export const CheckoutInput = styled.input`
  border: 1px solid
    ${(props) => {
      return useThemeMode().theme()
        ? props.theme.dark.secondaryColor
        : props.theme.light.secondaryColor;
    }};
  border-radius: 0.5rem;
  padding: 0.5rem 0.5rem;
  margin: 0 0 0.5rem;
  background: none;
  color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.secondaryColor
      : props.theme.light.secondaryColor;
  }};
  font-size: 1rem;
`;

export const CheckoutSelect = styled.select`
  border: 1px solid
    ${(props) => {
      return useThemeMode().theme()
        ? props.theme.dark.secondaryColor
        : props.theme.light.secondaryColor;
    }};
  border-radius: 0.5rem;
  padding: 0.5rem 0.5rem;
  margin: 0 0 0.5rem;
  color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.secondaryColor
      : props.theme.light.secondaryColor;
  }};
  font-size: 1rem;
  background-color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.primaryColor
      : props.theme.light.primaryColor;
  }};
`;

export const CheckoutButton = styled(SendButton)`
  max-width: 10rem;
`;
