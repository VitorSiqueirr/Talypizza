import styled from "styled-components";

export const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;

  @media (min-width: 600px) {
    font-size: 2.5rem;
  }
`;

export const TitleFooter = styled(Title)`
  font-size: 1.5rem;

  @media (min-width: 366px) {
    font-size: 2rem;
  }
`;

export const Total = styled(Title)`
  width: 100%;
  @media (min-width: 440px) {
    width: max-content;
  }
`;
