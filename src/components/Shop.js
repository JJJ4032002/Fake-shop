import React from "react";
import src1 from "../Photos/danijel-skabic-16nBtbn-ZRA-unsplash.jpg";
import src2 from "../Photos/taylor-Xqb7GmV_VoQ-unsplash.jpg";
import src3 from "../Photos/dugba-cauley-hushie-6MNmDi1hc_Y-unsplash.jpg";
import { Link } from "react-router-dom";
function Shop() {
  return (
    <div className="ShopContainer">
      <div className="CategoryContainer">
        <div className="CategoryItem">
          <Link className="CategoryLinks">
            <h1 className="IndCategoryHead">Women's</h1>
            <img className="CategoryPhoto" src={src1} alt="Women's" />
          </Link>
        </div>

        <div className="CategoryItem">
          <Link className="CategoryLinks">
            <h1 className="IndCategoryHead">Men's</h1>
            <img className="CategoryPhoto" src={src2} alt="Men's" />
          </Link>
        </div>

        <div className="CategoryItem">
          <Link to="/Product/" className="CategoryLinks">
            <h1 className="IndCategoryHead">Electronics</h1>
            <img className="CategoryPhoto" src={src3} alt="Electronics" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Shop;
