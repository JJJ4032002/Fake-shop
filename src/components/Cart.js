import React, { useState } from "react";
import { Link } from "react-router-dom";

function Cart({ arr, title, price, photo, quantity, indId, clickCart, sym }) {
  let TotalPrice = 0;
  console.log(arr);
  if (arr.length > 0) {
    TotalPrice = arr.reduce((total, e) => {
      return total + e.num * Number(e.Price);
    }, 0);
    TotalPrice = Math.round(TotalPrice * 10) / 10;
  } else {
    TotalPrice = 0;
  }

  return (
    <div className="CartContainer">
      <div className="LinksAndPrice">
        <div className="LinksCartItems">
          <Link className="CategoryLinks" to="/Product/men's clothing">
            <p className="CartLinks">Men's Page</p>
          </Link>
          <Link className="CategoryLinks" to="/Product/women's clothing">
            <p className="CartLinks">Women's Page</p>
          </Link>
          <Link className="CategoryLinks" to="/Product/electronics">
            <p className="CartLinks">Electronics Page</p>
          </Link>
        </div>
        <div className="LinksCartItems">
          <p>Price</p>
          <span>{TotalPrice}</span>
        </div>
      </div>
      {arr.length > 0 ? (
        <div className="CartItemsContainer">
          {arr.map((e) => {
            return (
              <div ref={indId} key={e.Id} id={e.Id} className="CartItem">
                <div className="imgDiv">
                  <h4 className="CartItemHead" ref={title}>
                    {e.Title}
                  </h4>
                  <img ref={photo} className="CartImage" src={e.Photo} alt="" />
                </div>
                <div className="imgDiv">
                  <button onClick={clickCart} className="CartBtn">
                    -
                  </button>
                  <span ref={quantity}>{e.num}</span>
                  <button onClick={clickCart} className="CartBtn">
                    +
                  </button>
                </div>

                <h3 ref={price} className="imgDiv">
                  {e.Price}
                </h3>
              </div>
            );
          })}
        </div>
      ) : (
        <h1 className="CartHead">The Cart is Empty</h1>
      )}
    </div>
  );
}

export default Cart;
