import React, { useContext } from 'react';
import { CartContext } from './CartContextProvider';

function RemoveButton({
  name,
  option,
}) {
  const { cart, setCart } = useContext(CartContext);
  function removeItem() {
    const newCart = cart.filter((cartItem) => cartItem.name !== name || cartItem.option !== option);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  }

  return (
    <button
      onClick={removeItem}
      type="button"
      className="button is-danger is-light ml-2"
    >
      Remove
    </button>
  );
}

export default RemoveButton;
