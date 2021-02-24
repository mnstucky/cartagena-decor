import React from 'react';
import Link from 'next/link';

function NavbarLink({
  toggleActive,
  path,
  label,
}) {
  return (
    <Link href={path}>
      <a className="navbar-item" onClick={toggleActive}>
        {label}
      </a>
    </Link>
  );
}

export default NavbarLink;
