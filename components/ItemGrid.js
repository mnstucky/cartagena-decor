import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContextProvider';
import ItemPane from './ItemPane';

function ItemGrid() {
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
  const spinnerStyles = { minHeight: '90vh' };
  // If fetch from DB is still pending, return a loading spinner

  return items.length === 0 ? (
    <div className="is-flex is-justify-content-center is-align-items-center" style={spinnerStyles}>
      <div className="sk-chase">
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
      </div>
    </div>
  ) : (
    <div className="is-flex is-flex-wrap-wrap is-justify-content-space-evenly">
      {items.map((item) => (
        <ItemPane
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
