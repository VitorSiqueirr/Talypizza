import { MainDiv } from "./styledComponents/Main";
import { ColoredText } from "./styledComponents/PersonalizedText";
import { Footer } from "./styledComponents/Footer";
import { Alert } from "./Alert";
import { useAlert } from "../hooks/useAlert";
import { NavBar } from "./Navigation";
import { FormCheckout } from "./FormCheckout";

const Checkout = () => {
  const { showAlert } = useAlert();

  return (
    <>
      <MainDiv>
        {showAlert() ? <Alert /> : <></>}
        <NavBar />
        <FormCheckout />
        <Footer>
          <ColoredText text1="Não" text2=" lavamos" text3=" dinheiro" />
        </Footer>
      </MainDiv>
    </>
  );
};

export default Checkout;
