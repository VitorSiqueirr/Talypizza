import { Link } from "react-router-dom";
import { Nav } from "./styledComponents/Navigation";
import { Title } from "./styledComponents/PersonalizeTitle";
import { ColoredText } from "./styledComponents/PersonalizedText";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { useThemeMode } from "../hooks/useThemeMode";
export const NavBar = () => {
  const { theme, toggleDarkTheme, toggleLightTheme } = useThemeMode();

  const handleThemeModeChange = () => {
    if (theme()) {
      toggleDarkTheme();
    } else {
      toggleLightTheme();
    }
  };

  return (
    <Nav>
      <Link to="/">
        <Title>
          <ColoredText text1="Tal" text2="yPi" text3="zza" />
        </Title>
      </Link>
      <div
        onClick={() => {
          handleThemeModeChange();
        }}>
        {theme() ? <MoonIcon /> : <SunIcon />}
      </div>
    </Nav>
  );
};
