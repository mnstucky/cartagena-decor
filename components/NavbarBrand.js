import React from 'react';
import Link from 'next/link';

function NavbarBrand({ isActive, toggleActive }) {
  return (
    <div className="navbar-brand">
      <Link href="/">
        <a className="navbar-item">
          <img src="https://cartagena-decor.s3.amazonaws.com/logo.jpg" width="28" height="28" />
          <h1 className="is-size-4 is-size-5-mobile is-uppercase is-family-secondary ml-2 has-text-black">
            Cartagena Decor
          </h1>
        </a>
      </Link>
      <a
        role="button"
        className={`navbar-burger ${isActive ? 'is-active' : ''}`}
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        onClick={toggleActive}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
  );
}

export default NavbarBrand;
