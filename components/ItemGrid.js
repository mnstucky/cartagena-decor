import React, { useEffect, useState } from 'react';
import ItemPane from './ItemPane';

function ItemGrid({
  cart,
  setCart,
}) {
  const [items, setItems] = useState([]);
  // Load in-stock items from database on component load
  useEffect(() => {
    fetch('/api/db')
      .then((res) => {
        if (!res.ok) {
          console.error('Network response wasn\'t ok');
        }
        res.json()
          .then((data) => {
            setItems(data);
          });
      });
  }, []);
  return (
    <div className="is-flex is-flex-wrap-wrap is-justify-content-space-evenly">
      {items.map((item) => (
        <ItemPane
          cart={cart}
          setCart={setCart}
          image={`images/${item.images[0]}`}
          name={item.name}
          price={item.price}
          url={item.url}
        />
      ))}
    </div>
  );
}

export default ItemGrid;
