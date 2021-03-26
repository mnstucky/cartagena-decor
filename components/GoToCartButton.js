import React, { useContext } from 'react';
import Link from 'next/link';
import { CartContext } from './CartContextProvider';

function GoToCartButton({
  toggleActive = () => {},
  cartButtonVisibility,
}) {
  const { cart } = useContext(CartContext);
  console.log(cart);
  if (cartButtonVisibility) {
    return (
      <Link href="/cart/">
        <button
          type="button"
          className="button is-primary ml-2"
          onClick={toggleActive}
        >
          <strong>
            {`Cart (${cart.reduce((acc, ele) => acc + ele.quantity, 0)})`}
          </strong>
        </button>
      </Link>
    );
  }
  return <div />;
}

export default GoToCartButton;
