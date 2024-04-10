import styled from "styled-components";
import { useThemeMode } from "../../hooks/useThemeMode";

export const MainDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.primaryColor
      : props.theme.light.primaryColor;
  }};
  color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.secondaryColor
      : props.theme.light.secondaryColor;
  }};
`;
