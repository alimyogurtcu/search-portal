import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import "./logo.scss";

function Logo({ isHome }) {
  return (
    <>
      {isHome ? (
        <div className="logo">
          <img src={logo} className="tesodevLogo" alt="TESODEV" />
          <span className="logoText">Search web app</span>
        </div>
      ) : (
        <div className="logoTop">
          <Link to={"/"}>
            <img src={logo} className="tesodevLogoTop" alt="TESODEV" />
          </Link>
        </div>
      )}
    </>
  );
}

export default Logo;
