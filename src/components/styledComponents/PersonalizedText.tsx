import styled from "styled-components";
import { useThemeMode } from "../../hooks/useThemeMode";

const GreenText = styled.span`
  color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.coloredText.tertiaryColor
      : props.theme.light.coloredText.tertiaryColor;
  }};
`;

const RedText = styled.span`
  color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.coloredText.secondaryColor
      : props.theme.light.coloredText.secondaryColor;
  }};
`;

const WhiteText = styled.span`
  color: ${(props) => {
    return useThemeMode().theme()
      ? props.theme.dark.coloredText.primaryColor
      : props.theme.light.coloredText.primaryColor;
  }};
`;

export const ColoredText = ({
  text1,
  text2,
  text3,
}: {
  text1: string;
  text2: string;
  text3: string;
}) => {
  return (
    <>
      <GreenText>{text1}</GreenText>
      <WhiteText>{text2}</WhiteText>
      <RedText>{text3}</RedText>
    </>
  );
};
