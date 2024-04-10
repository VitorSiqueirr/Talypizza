import styled from "styled-components";
import { useThemeMode } from "../../hooks/useThemeMode";

export const Footer = styled.footer`
  margin: 0;
  padding: 1rem;
  color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.secondaryColor
      : props.theme.light.secondaryColor;
  }};
  font-size: 1.75rem;
  font-weight: 700;
  flex-basis: 5%;
  background-color: ${(props) => props.theme.dark.tertiaryColor};
  text-align: center;
`;
