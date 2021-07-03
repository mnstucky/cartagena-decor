import React from 'react';
import Link from 'next/link';

function NavbarLink({
  toggleActive,
  path,
  label,
  isBold = false,
}) {
  let classes = 'navbar-item';
  if (isBold) {
    classes += ' has-text-weight-bold';
  }
  return (
    <Link href={path}>
      <a className={`${classes}`} onClick={toggleActive}>
        {label}
      </a>
    </Link>
  );
}

export default NavbarLink;
