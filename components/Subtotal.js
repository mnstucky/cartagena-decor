import React, { useContext } from "react";
import { CartContext } from "./CartContextProvider";

function Subtotal() {
  const { cart, setCart } = useContext(CartContext);
  let subtotal = 0;
  cart.forEach((cartItem) => {
    subtotal += cartItem.price * cartItem.quantity;
  });
  return (
    <p className="has-text-weight-bold">Subtotal: ${subtotal.toFixed(2)}</p>
  );
}

export default Subtotal;
