import React from 'react';
import Link from 'next/link';
import ItemGrid from '../components/ItemGrid';

function Shop() {
  return (
    <div className="container pr-3 pl-3">
      <h1 className="title is-4 mt-2">Shop</h1>
      <ItemGrid />
      <Link href="/admin/add">
        <button className="button is-primary">Add New Item</button>
      </Link>
    </div>
  );
}

export default Shop;
