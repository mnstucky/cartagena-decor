import React, { useState } from "react";
import Link from "next/link";
import NavbarBrand from "./NavbarBrand";
import NavbarMenu from "./NavbarMenu";

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
      <NavbarBrand isActive={isActive} toggleActive={toggleActive} />
      <NavbarMenu isActive={isActive} toggleActive={toggleActive} />
    </nav>
  );
}

export default Navbar;
