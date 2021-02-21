import React from 'react';
import ItemGrid from '../components/ItemGrid';

function Shop({ cart, setCart }) {
  return (
    <div className="container pr-3 pl-3">
      <h1 className="title is-4 mt-2">Shop</h1>
      <ItemGrid cart={cart} setCart={setCart} />
    </div>
  );
}

export default Shop;
