# TALYPIZZA REDESIGN by Vitor Siqueira

Check the Figma design [here](https://www.figma.com/file/Q4ue68Otj9NyD9erNW5A2D/talypizza?type=design&node-id=0%3A1&mode=design&t=s1b9R9WHum5tyX5Z-1)

## TASK 1 - INDEX PAGE

We will get started by building the index page, which shows the list of pizzas available for purchase as well as the logic of adding a pizza to the cart. Free tip: remember to create small components that can be reused alongside the app for the next challenges and don’t forget the unit tests. We don’t want normal people to order pizza or we’ll need to buy microwave pizzas and send them to people’s houses. So, the way to go to the checkout page is to click on the footer: “Não lavabos dinheiro”. Consider this an easter egg.
When a pizza is added to the cart, a key on local storage should be written/updated with the pizza flavors and their quantity. We only want to have one cart key on local storage, so don’t duplicate keys.

```JS
// example of cart key inside of local storage
{
  id: "1" // cart id,
  products: [
   {
     id: "5", //id of the pizza flavour
     img: "/mussarela.png",
     name: "Mussarela",
     price: 45,
     quantity: 2
   },
   {
     id: "1",
     img: "/pepperoni.png",
     name: "Pepperoni",
     price: 30,
     quantity: 1
   },
  ],
  total: 120 // sum of all pizzas prices with their quantity
}
```

## TASK 2 - CHECKOUT PAGE: CART AND ADDRESS INFO FORM

It’s time to go to the checkout page. We will need to display to the user the pizzas that are inside the cart, alongside a form to put their address info. At this point, Hana, the designer who was working on the prototype started to smell something weird about it and quit her job. She left us with only the dark mode design of the page and only for mobile! But don’t worry, I know you can handle it creatively.

## TASK 3 - CHECKOUT PAGE: PAYMENT INFO

For that, we will now have a form that contains the credit card so the user can finish the buying process. The payment info will be shown between the address and the cart (the cart must be the last thing above the finish order button) and when the user clicks on finish order it will do the following:
1 - the current cart inside the local storage will be cleaned
2 - a “last order” key will be created on local storage containing the following: the address info, the payment info, and the cart info (all pizza flavors alongside their quantities)
3 - the user will be redirected to the index page

```JS
// example of last order
{
  orderId: "1" // the orderId will receive the value of the cartId,
  cart: {
    products: [
      {
         id: "5", //id of the pizza flavour
         img: "/mussarela.png",
         name: "Mussarela",
         price: 45,
         quantity: 2
      },
      {
         id: "1",
         img: "/pepperoni.png",
         name: "Pepperoni",
         price: 30,
         quantity: 1
       },
    ],
    total: 120 // sum of all pizzas prices with their quantity
  },
  address: {
    address1: "Rua do Talysson",
    address2: "Apartamento 61",
    cep: "1234504",
    state: "SP"
  },
  payment: {
    number: "1234 5678 9812 0123",
    dueDate: "12/31",
    cvv: 123
  }
}
```

## EXTRA - LIGHT MODE

Research made by the Department of Advanced Research has shown that users do like light mode. So this option should be available on all the pages.
