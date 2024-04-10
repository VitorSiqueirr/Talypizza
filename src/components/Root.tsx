import { Pizzalist } from "./Pizzalist";
import { Link } from "react-router-dom";
import { TitleFooter } from "./styledComponents/PersonalizeTitle";
import { ColoredText } from "./styledComponents/PersonalizedText";
import { Footer } from "./styledComponents/Footer";
import { MainDiv } from "./styledComponents/Main";
import { useCart } from "../hooks/useCart";
import {
  Form,
  FormButton,
  FormDivInput,
  FormInput,
  SendButton,
} from "./styledComponents/Form";
import { Alert } from "./Alert";
import { useAlert } from "../hooks/useAlert";
import { NavBar } from "./Navigation";

const Root = () => {
  const { cart, addToCart, resetSelectedPizza, changeQuantity } = useCart();
  const { showAlert } = useAlert();

  const handleAddToCart = () => {
    if (cart.selectedPizza) {
      addToCart(cart.selectedPizza, cart.quantity);
      resetSelectedPizza();
    }
  };

  return (
    <>
      <MainDiv>
        {showAlert() ?? <Alert />}
        <NavBar />

        <Pizzalist />

        <Footer>
          {cart.showCart ? (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <FormDivInput>
                <FormButton
                  onClick={() => {
                    resetSelectedPizza();
                  }}>
                  X
                </FormButton>
                <FormInput
                  type="number"
                  value={cart.quantity}
                  onChange={(e) => changeQuantity(Number(e.target.value))}
                  required
                />
                <FormButton
                  onClick={(e) => {
                    e.preventDefault();
                    changeQuantity(cart.quantity + 1);
                  }}>
                  +
                </FormButton>
              </FormDivInput>

              <SendButton onClick={handleAddToCart}>
                Adicionar R${" "}
                {cart.cart.total + cart.selectedPizza.price * cart.quantity}
              </SendButton>
            </Form>
          ) : (
            <Link to="/checkout">
              <TitleFooter>
                <ColoredText text1="Não" text2=" lavamos" text3=" dinheiro" />
              </TitleFooter>
            </Link>
          )}
        </Footer>
      </MainDiv>
    </>
  );
};

export default Root;
