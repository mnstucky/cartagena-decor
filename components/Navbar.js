import React, { useState } from 'react';
import NavbarBrand from './NavbarBrand';
import NavbarMenu from './NavbarMenu';

function Navbar({ cart }) {
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
      <NavbarBrand isActive={isActive} toggleActive={toggleActive} />
      <NavbarMenu isActive={isActive} toggleActive={toggleActive} cart={cart} />
    </nav>
  );
}

export default Navbar;
