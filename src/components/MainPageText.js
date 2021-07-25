import React from "react";
import { Link } from "react-router-dom";

function MainPageText() {
  return (
    <div className="MainPageText">
      <h1 className="MainPageHead">Buy all your clothes only at FAKESHOP</h1>
      <Link to="/shop">
        <button className="MainPageBtn">Shop Now</button>
      </Link>
    </div>
  );
}

export default MainPageText;
