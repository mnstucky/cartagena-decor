import React, { useState } from "react";
import Banner from './Banner';
import NavMenu from './NavMenu';

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  function toggleActive() {
    setIsActive(!isActive);
  }
  return (
    <header>
        <Banner isActive={isActive} toggleActive={toggleActive}/>
        <NavMenu toggleActive={toggleActive}/>
    </header>
  );
}

export default Navbar;