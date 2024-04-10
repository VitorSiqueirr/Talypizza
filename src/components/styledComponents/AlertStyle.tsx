import styled from "styled-components";
import { SendButton } from "./Form";
import { Title } from "./PersonalizeTitle";
import { useThemeMode } from "../../hooks/useThemeMode";

export const AlertModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  max-height: 10rem;
  width: 100%;
  max-width: 30rem;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.alert.backgroundColor
      : props.theme.light.alert.backgroundColor;
  }};
  box-shadow: 0px 0px 32px 8px
    ${(props) => {
      return useThemeMode().theme()
        ? props.theme.dark.alert.shadowColor
        : props.theme.light.alert.shadowColor;
    }};
  z-index: 1000;

  @media (max-width: 560px) {
    width: 70%;
  }
`;

export const AlertMask = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  background: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.alert.maskColor
      : props.theme.light.alert.maskColor;
  }};
  z-index: 900;
`;

export const AlertMessage = styled(Title)`
  font-size: 2rem;
  @media (max-width: 560px) {
    font-size: 1.35rem;
  }
`;

export const AlertOkButton = styled(SendButton)`
  background-color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.alert.primaryButtonBackgroundColor
      : props.theme.light.alert.primaryButtonBackgroundColor;
  }};
  box-shadow: 0px 0px 4px 2px
    ${(props) => {
      return useThemeMode().theme()
        ? props.theme.dark.alert.shadowColor
        : props.theme.light.alert.shadowColor;
    }}
    inset;
  transition: background-color 0.5s, box-shadow 0.5s;

  &:hover {
    box-shadow: 0px 0px 4px 2px
      ${(props) => {
        return useThemeMode().theme()
          ? props.theme.dark.alert.shadowColor
          : props.theme.light.alert.shadowColor;
      }};
    background-color: ${(props) => {
      return useThemeMode().theme()
        ? props.theme.dark.alert.secondaryButtonBackgroundColor
        : props.theme.light.alert.secondaryButtonBackgroundColor;
    }};
  }

  @media (max-width: 560px) {
    font-size: 1rem;
  }
`;
