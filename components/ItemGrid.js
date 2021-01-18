import React, { useEffect } from "react";
import ItemPane from "./ItemPane";

function ItemGrid() {
  const gridStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  }
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
