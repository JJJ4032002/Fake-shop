import React from "react";
import cartLogo from "../Photos/icons8-shopping-cart-30.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link className="NavHead" to="/">
        <h1 id="NavHead" className="NavItems">
          FAKESHOP
        </h1>
      </Link>
      <div id="RightNav" className="NavItems">
        <Link to="/shop">
          <button className="RightNavItem" id="ShopBtn">
            SHOP
          </button>
        </Link>
        <img className="RightNavItem" src={cartLogo} alt="cartLogo" />
      </div>
    </nav>
  );
}

export default Navbar;
