import React from 'react';

function Subtotal({ cart }) {
  let subtotal = 0;
  cart.forEach((cartItem) => {
    subtotal += (cartItem.price * cartItem.quantity);
  });
  return (
    <p className="has-text-weight-bold">
      Subtotal: $
      {subtotal}
    </p>
  );
}

export default Subtotal;
