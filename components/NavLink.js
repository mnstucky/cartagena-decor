import React from "react";
import Link from "next/link";

function NavLink({ destination }) {
  return (
    <Link href={"/" + destination}>
      <a>
        {destination.toUpperCase()}
      </a>
    </Link>
  );
}

export default NavLink;
