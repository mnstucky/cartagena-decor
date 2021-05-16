// noinspection HtmlUnknownTarget

import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { CartContext } from './CartContextProvider';

function GoToCartButton({
  toggleActive = () => {},
  cartButtonVisibility,
}) {
  const { cart, setCart } = useContext(CartContext);
  // Load saved cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(window.localStorage.getItem('cart'));
    setCart(storedCart || []);
  }, []);
  if (cartButtonVisibility) {
    return (
      <Link href="/cart/">
        <button
          type="button"
          className="button is-primary"
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
