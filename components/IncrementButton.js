import React from 'react';

function IncrementButton({
  name,
  option,
  cart,
  setCart
}) {
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
    <button onClick={incrementQuantity} type="button" className="button is-primary is-light pr-4">
      +
    </button>
  );
}

export default IncrementButton;
