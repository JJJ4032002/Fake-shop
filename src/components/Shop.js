import React from "react";
import src1 from "../Photos/danijel-skabic-16nBtbn-ZRA-unsplash.jpg";
import src2 from "../Photos/taylor-Xqb7GmV_VoQ-unsplash.jpg";
import src3 from "../Photos/lexy-lammerink-LV5gOg3c1Kk-unsplash.jpg";
function Shop() {
  return (
    <div className="ShopContainer">
      <div className="CategoryContainer">
        <div className="CategoryItem">
          <h1 className="IndCategoryHead">Women's</h1>
          <img className="CategoryPhoto" src={src1} alt="Women's" />
        </div>
        <div className="CategoryItem">
          <h1 className="IndCategoryHead">Men's</h1>
          <img className="CategoryPhoto" src={src2} alt="Men's" />
        </div>
        <div className="CategoryItem">
          <h1 className="IndCategoryHead">Jewellary</h1>
          <img className="CategoryPhoto" src={src3} alt="Jewellary" />
        </div>
      </div>
    </div>
  );
}

export default Shop;
