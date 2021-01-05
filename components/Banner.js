import React from "react";
import Link from "next/link";

function Banner({ isActive, toggleActive }) {
  return (
    <>
      <div className="banner">
        <label
          htmlFor="nav-toggle"
          className="nav-toggle-label"
          onClick={toggleActive}
        >
          <span
            className={
              isActive
                ? "hamburger hamburger--squeeze is-active"
                : "hamburger hamburger--squeeze"
            }
            type="button"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </span>
        </label>
        <span className="headline">
          <img src="logo.jpg" alt="Cartegena Decor logo" />
          <h1>
            <Link href="/">
              <a>CARTAGENA DECOR</a>
            </Link>
          </h1>
        </span>
      </div>
      <input
        type="checkbox"
        id="nav-toggle"
        className="nav-toggle"
        readOnly
        checked={isActive}
      />
    </>
  );
}

export default Banner;
