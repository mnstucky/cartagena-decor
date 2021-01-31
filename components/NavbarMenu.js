import React from "react";
import Link from "next/link";
import NavbarLink from './NavbarLink';

function NavbarBrand({ isActive, toggleActive, cart }) {
  return (
    <div
      id="navbarBasicExample"
      className={`navbar-menu ${isActive ? 'is-active' : ''}`}
    >
      <div className="navbar-start">
        <NavbarLink toggleActive={toggleActive} path="/" label="Home" />
        <NavbarLink toggleActive={toggleActive} path="/shop/" label="Shop" />
        <NavbarLink toggleActive={toggleActive} path="/contact/" label="Contact" />
        <NavbarLink toggleActive={toggleActive} path="/about/" label="About" />
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link href="/cart/">
              <a className="button is-primary" onClick={toggleActive}>
                <strong>{`Cart (${cart.reduce((acc, ele) => acc + ele.quantity, 0)})`}</strong>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarBrand;
