import React, { useEffect, useState } from "react";
import ItemPane from "./ItemPane";

function ItemGrid({ cart, setCart }) {
  const gridStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  }
  const [items, setItems] = useState([]);
// Load in-stock items from database on component load
  useEffect(() => {
    console.log("useEffect triggered");
    fetch("/api/db")
    .then(res => {
      if (!res.ok) {
        console.error("Network response wasn't ok");
      }
      res.json().then(function(data) {
	setItems(data);
      });
    });
  }, []);
  return (
    <div style={gridStyles}>
      {items.map(item => <ItemPane cart={cart} setCart={setCart} image={"images/" + item.images[0]} name={item.name} price={item.price} url={item.url}/>)}
    </div>
  );
}

export default ItemGrid;
