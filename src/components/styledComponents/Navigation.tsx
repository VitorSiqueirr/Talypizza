import styled from "styled-components";
import { useThemeMode } from "../../hooks/useThemeMode";

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  flex-basis: 5%;
  padding: 0.25rem 0;
  background-color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.tertiaryColor
      : props.theme.light.tertiaryColor;
  }};
`;
