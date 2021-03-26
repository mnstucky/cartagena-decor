import React from 'react';
import NavbarLink from './NavbarLink';
import GoToCartButton from './GoToCartButton';

function NavbarBrand({ isActive, toggleActive }) {
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
            <GoToCartButton toggleActive={toggleActive} cartButtonVisibility />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarBrand;
