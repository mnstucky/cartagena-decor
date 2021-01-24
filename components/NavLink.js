import React from "react";
import Link from "next/link";

function NavLink({ destination, toggleActive }) {
  return (
    <Link href={"/" + destination} onClick={toggleActive}>
      <a>
        {destination.toUpperCase()}
      </a>
    </Link>
  );
}

export default NavLink;
