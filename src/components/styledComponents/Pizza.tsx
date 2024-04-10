import styled from "styled-components";

export const PizzaInfos = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  padding-left: 1rem;
  height: 100%;
  width: max-content;
`;

export const PizzaName = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const PizzaPrice = styled.p`
  padding: 0;
  margin: 0;
`;

export const PizzaQuantity = styled(PizzaPrice)`
  font-weight: 700;
`;

export const PizzaImg = styled.img`
  width: 10rem;
  height: 7rem;
  object-fit: cover;
  border-radius: 0.5rem;

  @media (max-width: 366px) {
    width: 8rem;
    height: 5rem;
  }
`;
