import React from "react";
import NavLink from "./NavLink";
import Link from "next/link";

function NavMenu({toggleActive}) {
  return (
    <nav>
      <ul className="navMenu">
          <NavLink destination="shop" toggleActive={toggleActive}/>
          <NavLink destination="about" toggleActive={toggleActive}/>
          <NavLink destination="contact" toggleActive={toggleActive}/>
          <NavLink destination="cart" toggleActive={toggleActive}/>
        <li>
          <a href="#top">
            <i className="fas fa-shopping-cart"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;
