import React from "react";
import Link from "next/link";

function Banner({ isActive, toggleActive }) {
  return (
    <div class="navbar-brand">
      <div class="navbar-item">
        <img src="logo.jpg" alt="Cartegena Decor logo" />
        <h1 className="cartegena-header">
          <Link href="/">
            <a>CARTAGENA DECOR</a>
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default Banner;
