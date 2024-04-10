import styled from "styled-components";
import { useThemeMode } from "../../hooks/useThemeMode";

export const ListSection = styled.div`
  display: flex;
  flex-flow: column;
  overflow-y: auto;
  flex-basis: 90%;
`;

export const ListDiv = styled.div`
  display: flex;
  margin: 1rem 0;
  padding: 0 2.5rem;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;

  @media (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const Card = styled.div`
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  width: 100%;
  max-width: 17rem;
  padding: 1rem;
  margin: 0.5rem;
  border: 1px solid
    ${(props) => {
      return useThemeMode().theme()
        ? props.theme.dark.secondaryColor
        : props.theme.light.secondaryColor;
    }};
  border-radius: 0.5rem;
  max-height: 100vh;
  box-shadow: 0px 2px 8px 1px
    ${(props) => {
      return useThemeMode().theme()
        ? props.theme.dark.products.shadowColor
        : props.theme.light.products.shadowColor;
    }};
  transition: background-color 0.3s, transform 0.3s;

  &:hover,
  &:focus {
    background-color: ${(props) => {
      return useThemeMode().theme()
        ? props.theme.dark.products.secondaryBackgroundColor
        : props.theme.light.products.secondaryBackgroundColor;
    }};
    transform: scale(1.05);
  }

  @media (min-width: 600px) {
    max-width: 18rem;
  }
`;

export const CheckoutCard = styled(Card)`
  width: 90%;
  margin: 0.5rem 0;

  &hover,
  &focus {
    background-color: none;
    transform: scale(1);
  }
`;
