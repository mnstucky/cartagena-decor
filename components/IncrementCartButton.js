import React, { useContext } from 'react';
import { CartContext } from './CartContextProvider';

function IncrementCartButton({
  name,
  option,
}) {
  const { cart, setCart } = useContext(CartContext);
  function incrementQuantity() {
    const newCart = cart.map((cartItem) => {
      if (cartItem.name === name && cartItem.option === option) {
        const updatedItem = {
          name: cartItem.name,
          price: cartItem.price,
          option: cartItem.option,
          images: cartItem.images,
          itemUrl: cartItem.itemUrl,
          quantity: cartItem.quantity + 1,
        };
        return updatedItem;
      }
      return cartItem;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  }
  return (
    <button onClick={incrementQuantity} type="button" className="button is-link is-light">
      +
    </button>
  );
}

export default IncrementCartButton;
