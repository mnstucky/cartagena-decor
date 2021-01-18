import React from "react";
import Image from "next/image";
import Link from "next/link";

function ItemPane({ source }) {
  const boxStyle = {
    width: 300
  }
  return (
    <div className="card m-2" style={boxStyle}>
      <div className="card-image">
        <div className="image is-3by2">
          <img src={source}></img>
        </div>
      </div>

      <div className="card-content">
        <p className="title is-5">Item Name</p>
        <p className="subtitle is-6">$50</p>
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
