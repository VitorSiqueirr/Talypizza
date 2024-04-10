import { Route, Routes } from "react-router-dom";
import Root from "./components/Root";
import Checkout from "./components/Checkout";
import { GlobalStyle } from "./style/globalStyle";
import { CartProvider } from "./contexts/provider/CartProvider";
import { AlertProvider } from "./contexts/provider/AlertProvider";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { ThemeModeProvider } from "./contexts/provider/ThemeModeProvider";

function App() {
  return (
    <>
      <CartProvider>
        <AlertProvider>
          <ThemeModeProvider>
            <ThemeProvider theme={theme}>
              <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
              <GlobalStyle />
            </ThemeProvider>
          </ThemeModeProvider>
        </AlertProvider>
      </CartProvider>
    </>
  );
}

export default App;
