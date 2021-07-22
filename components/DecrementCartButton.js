import React, { useContext } from "react";
import { CartContext } from "./CartContextProvider";

function DecrementCartButton({ name, option, quantity }) {
  const { cart, setCart } = useContext(CartContext);
  function decrementQuantity() {
    const newCart = cart.map((cartItem) => {
      if (cartItem.name === name && cartItem.option === option) {
        const updatedItem = {
          name: cartItem.name,
          price: cartItem.price,
          option: cartItem.option,
          images: cartItem.images,
          itemUrl: cartItem.itemUrl,
          quantity: cartItem.quantity - 1,
          maxQuantity: cartItem.maxQuantity,
        };
        return updatedItem;
      }
      return cartItem;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  }

  return (
    <button
      onClick={decrementQuantity}
      disabled={quantity <= 1}
      type="button"
      className="button is-link is-light"
    >
      -
    </button>
  );
}

export default DecrementCartButton;
