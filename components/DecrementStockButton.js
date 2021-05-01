import React from 'react';

function DecrementStockButton({
  setStock,
}) {
  function decrementQuantity() {
    setStock((oldStock) => {
      if (oldStock === 0) {
        return oldStock;
      }
      return oldStock - 1;
    });
  }
  return (
    <button onClick={decrementQuantity} type="button" className="button is-link is-light">
      -
    </button>
  );
}

export default DecrementStockButton;
