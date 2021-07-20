import React, { useEffect } from "react";

function QuantitySelector({ quantity, setQuantity, maxQuantity, selection }) {
  function decrementQuantity() {
    setQuantity(quantity - 1);
  }
  function incrementQuantity() {
    setQuantity(quantity + 1);
  }
  useEffect(() => {
    setQuantity(1);
  }, [selection]);
  return (
    <div className="is-flex is-align-items-center mb-2">
      <button
        onClick={decrementQuantity}
        disabled={quantity <= 1}
        type="button"
        className="button is-link is-light"
      >
        -
      </button>
      <p className="mb-0 ml-2 mr-2">Quantity: {quantity}</p>
      <button
        onClick={incrementQuantity}
        disabled={quantity >= maxQuantity}
        type="button"
        className="button is-link is-light"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
