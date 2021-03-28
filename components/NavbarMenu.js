import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/client';
import NavbarLink from './NavbarLink';
import GoToCartButton from './GoToCartButton';

function NavbarBrand({ isActive, toggleActive }) {
  const [session, loading] = useSession();
  return (
    <div
      id="navbarBasicExample"
      className={`navbar-menu ${isActive ? 'is-active' : ''}`}
    >
      <div className="navbar-start">
        <NavbarLink toggleActive={toggleActive} path="/" label="Home" />
        <NavbarLink toggleActive={toggleActive} path="/shop/" label="Shop" />
        <NavbarLink toggleActive={toggleActive} path="/contact/" label="Contact" />
        <NavbarLink toggleActive={toggleActive} path="/about/" label="About" />
        {session && <NavbarLink toggleActive={toggleActive} path="/profile/" label="Profile" /> }
      </div>
      <div className="navbar-end">
        {session
         && (
         <div className="navbar-item">
           Signed in as
           {' '}
           {session.user.email}
         </div>
         )}
        <div className="navbar-item">
          <div className="buttons">
            {' '}
            {!session && (
            <>
              <button onClick={signIn} className="button is-info">Sign In</button>
            </>
            )}
            {session && (
            <>
              <button onClick={signOut} className="button is-info">Sign Out</button>
            </>
            )}
          </div>
        </div>
        <div className="navbar-item">
          <div className="buttons">
            <GoToCartButton toggleActive={toggleActive} cartButtonVisibility />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarBrand;
