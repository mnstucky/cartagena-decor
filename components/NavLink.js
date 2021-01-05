import React from "react";
import Link from "next/link";

function NavLink({ destination, toggleActive }) {
  return (
    <li>
      <Link href={"/" + destination}>
        <a onClick={function() { toggleActive(); }}>{destination.toUpperCase()}</a>
      </Link>
    </li>
  );
}

export default NavLink;