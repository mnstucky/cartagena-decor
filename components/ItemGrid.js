import React, { useEffect, useState } from "react";
import ItemPane from "./ItemPane";

function ItemGrid() {
  const gridStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  }
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    console.log("useEffect triggered");
    fetch("/api/db")
    .then(res => {
      if (!res.ok) {
        console.error("Network response wasn't ok");
      }
      res.json().then(function(data) {
        console.log(data);
	console.log(data[0].category);
      });
    });
  });
  return (
    <div style={gridStyles}>
      {/* <div>  */}
        {/* <div className="column"> */}
          <ItemPane source="/IMG_9384.JPG" />
          <ItemPane source="/IMG_9462.JPG" />
          <ItemPane source="/IMG_9476.JPG" />
          <ItemPane source="/IMG_9384.JPG" />
          <ItemPane source="/IMG_9462.JPG" />
        {/* </div>
        <div className="column"> */}
          <ItemPane source="/IMG_9476.JPG" />
          <ItemPane source="/IMG_9384.JPG" />
          <ItemPane source="/IMG_9462.JPG" />
          <ItemPane source="/IMG_9476.JPG" />
        {/* </div>
        <div className="column"> */}
          <ItemPane source="/IMG_9476.JPG" />
          <ItemPane source="/IMG_9384.JPG" />
          <ItemPane source="/IMG_9462.JPG" />
          <ItemPane source="/IMG_9476.JPG" />
        {/* </div> */}
      {/* </div> */}
    </div>
  );
}

export default ItemGrid;
