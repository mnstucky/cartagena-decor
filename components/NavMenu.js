import React from "react";
import NavLink from "./NavLink";
import Link from "next/link";

function NavMenu({toggleActive}) {
  return (
    <nav class="navbar-menu">
      <div className="navbar-start">
          <NavLink className="navbar-item" destination="shop" toggleActive={toggleActive}/>
          <NavLink className="navbar-item" destination="about" toggleActive={toggleActive}/>
          <NavLink className="navbar-item" destination="contact" toggleActive={toggleActive}/>
          <NavLink className="navbar-item" destination="cart" toggleActive={toggleActive}/>
      </div>
    </nav>
  );
}

export default NavMenu;
