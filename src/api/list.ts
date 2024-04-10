export const list = () => {
  return Promise.resolve([
    {
      id: "1",
      name: "4 queijos",
      price: 55,
      img: "/4queijos.png",
    },
    {
      id: "2",
      name: "Brocolis",
      price: 55,
      img: "/brocolis.png",
    },
    {
      id: "3",
      name: "Calabresa",
      price: 50,
      img: "/calabresa.png",
    },
    {
      id: "4",
      name: "Marguerita",
      price: 50,
      img: "/marguerita.png",
    },
    {
      id: "5",
      name: "Mussarela",
      price: 45,
      img: "/mussarela.png",
    },
    {
      id: "6",
      name: "Pepperoni",
      price: 60,
      img: "/pepperoni.png",
    },
  ]);
};

export const getStates = async () => {
  try {
    const response = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
