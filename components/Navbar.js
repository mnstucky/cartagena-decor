import React, { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  function toggleActive() {
    setIsActive(!isActive);
  }
  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link href={"/"}>
          <a className="navbar-item">
            <img src="/images/logo.jpg" width="28" height="28" />
            <h1 className="is-size-4 is-uppercase is-family-secondary ml-2">
              Cartagena Decor
            </h1>
          </a>
        </Link>
        <a
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={toggleActive}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <Link href={"/"}>
            <a className="navbar-item">Home</a>
          </Link>
          <Link href={"/shop/"}>
            <a className="navbar-item">Shop</a>
          </Link>
          <Link href={"/contact/"}>
            <a className="navbar-item">Contact</a>
          </Link>
          <Link href={"/about/"}>
            <a className="navbar-item">About</a>
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
    </nav>
  );
}

export default Navbar;
