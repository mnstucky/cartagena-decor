import React from "react";
import Image from "next/image";
import Link from "next/link";

function ItemPane({ image, name, price, url }) {
  const boxStyle = {
    width: 300,
  };
  return (
    <div className="card m-2" style={boxStyle}>
      <Link href={"\\" + url}>
        <a className="card-image">
          <div className="image is-3by2">
            <img src={image}></img>
          </div>
        </a>
      </Link>
      <div className="card-content">
        <p className="name is-5">{name}</p>
        <p className="subname is-6">${price}</p>
      </div>
    </div>
  );
}

export default ItemPane;
