import React from "react";
import Link from "next/link";

function NavbarBrand({ isActive, toggleActive }) {
  return (
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
  );
}

export default NavbarBrand;
