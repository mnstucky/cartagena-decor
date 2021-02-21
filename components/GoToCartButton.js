import React from "react";
import Link from "next/link";

function GoToCartButton({
  toggleActive = () => {},
  cart,
  cartButtonVisibility,
}) {
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
