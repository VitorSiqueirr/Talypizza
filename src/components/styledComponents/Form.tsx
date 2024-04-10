import styled from "styled-components";
import { useThemeMode } from "../../hooks/useThemeMode";

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;

  @media (min-width: 550px) {
    align-items: normal;
    justify-content: center;
    gap: 2rem;
  }
`;

export const FormDivInput = styled.form`
  box-shadow: 0px 0px 8px 1px ${(props) => props.theme.dark.shadowColor};
  border-radius: 0.25rem;
  width: max-content;
  padding: 0.25rem 1rem;
`;

export const FormButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.coloredText.primaryColor
      : props.theme.light.coloredText.primaryColor;
  }};
  border-radius: 0.5rem;
  padding: 0.25rem;
  font-weight: 700;
  font-size: 1.2rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => {
      return useThemeMode().theme()
        ? props.theme.dark.button.sendSecondaryBackgroundColor
        : props.theme.light.button.sendSecondaryBackgroundColor;
    }};
  }
`;

export const FormInput = styled.input`
  width: 4rem;
  margin: 0.5rem 0.5rem 0.5rem 0.25rem;
  background: none;
  color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.coloredText.primaryColor
      : props.theme.light.coloredText.primaryColor;
  }};
  font-weight: 700;
  font-size: 1.2rem;
  border-radius: 0.25rem;
  border: none;
  padding: 0.25rem 0.5rem;
  transition: box-shadow 0.3s, outline 0.3s;

  &:focus-visible {
    outline: none;
    box-shadow: 0px 0px 4px 1px ${(props) => props.theme.dark.shadowColor};
  }
`;

export const SendButton = styled(FormButton)`
  background: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.button.sendPrimaryBackgroundColor
      : props.theme.light.button.sendPrimaryBackgroundColor;
  }};
  color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.coloredText.primaryColor
      : props.theme.light.coloredText.primaryColor;
  }};
  border-radius: 0.25rem;
  padding: 0.675rem 0.5rem;
  box-shadow: 0px 0px 4px 1px
    ${(props) => {
      return useThemeMode().theme()
        ? props.theme.dark.shadowColor
        : props.theme.light.shadowColor;
    }}
    inset;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => {
      return useThemeMode().theme()
        ? props.theme.dark.button.sendSecondaryBackgroundColor
        : props.theme.light.button.sendSecondaryBackgroundColor;
    }};
    box-shadow: 0px 0px 4px 1px
      ${(props) => {
        return useThemeMode().theme()
          ? props.theme.dark.button.sendShadowColor
          : props.theme.light.button.sendShadowColor;
      }};
  }
`;
