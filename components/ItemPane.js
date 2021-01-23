import React from "react";
import Image from "next/image";
import Link from "next/link";

function ItemPane({ image, name, price }) {
  const boxStyle = {
    width: 300
  }
  return (
    <div className="card m-2" style={boxStyle}>
      <div className="card-image">
        <div className="image is-3by2">
          <img src={image}></img>
        </div>
      </div>

      <div className="card-content">
        <p className="name is-5">{name}</p>
        <p className="subname is-6">${price}</p>
      </div>
      <div className="card-footer">
        <div className="card-footer-item">
          Details
        </div>
        <div className="card-footer-item">
          Add to Cart
        </div>
      </div>
    </div>
  );
}

export default ItemPane;
