import React from "react";
import Link from "next/link";

function NavbarBrand({ isActive, toggleActive }) {
  return (
    <div
      id="navbarBasicExample"
      className={`navbar-menu ${isActive ? "is-active" : ""}`}
    >
      <div className="navbar-start">
        <Link href={"/"}>
          <a className="navbar-item" onClick={toggleActive}>
            Home
          </a>
        </Link>
        <Link href={"/shop/"}>
          <a className="navbar-item" onClick={toggleActive}>
            Shop
          </a>
        </Link>
        <Link href={"/contact/"}>
          <a className="navbar-item" onClick={toggleActive}>
            Contact
          </a>
        </Link>
        <Link href={"/about/"}>
          <a className="navbar-item" onClick={toggleActive}>
            About
          </a>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link href={"/cart/"}>
              <a className="button is-primary">
                <strong>Cart</strong>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarBrand;
