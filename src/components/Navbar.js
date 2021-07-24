import React from "react";
import cartLogo from "../Photos/icons8-shopping-cart-40.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">
        <h1 id="NavHead" className="NavItems">
          FAKESHOP
        </h1>
      </Link>
      <div id="RightNav" className="NavItems">
        <button className="RightNavItem" id="ShopBtn">
          SHOP
        </button>
        <img className="RightNavItem" src={cartLogo} alt="cartLogo" />
      </div>
    </nav>
  );
}

export default Navbar;
