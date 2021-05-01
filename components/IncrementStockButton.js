import React from 'react';

function IncrementStockButton({
  setStock,
}) {
  function incrementQuantity() {
    setStock((oldStock) => {
      if (oldStock === Number.MAX_SAFE_INTEGER) {
        return oldStock;
      }
      return oldStock + 1;
    });
  }
  return (
    <button onClick={incrementQuantity} type="button" className="button is-link is-light">
      +
    </button>
  );
}

export default IncrementStockButton;
