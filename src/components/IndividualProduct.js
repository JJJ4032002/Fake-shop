import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
function IndividualProduct({ click, title, price, photo, quantity, indId }) {
  let match = useRouteMatch();
  let id = match.params.id;
  let url = `https://fakestoreapi.com/products/${id}`;

  const { items, loading, error } = useFetch(url, id);
  console.log(items);
  const [num, setNum] = useState(0);

  return (
    <div className="IndividualContainer">
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error...</h1>}

      <div
        ref={indId}
        id={items.id}
        key={items.id}
        className="IndividualFlexContainer"
      >
        <img
          ref={photo}
          id="individualImage"
          className="IndividualItemDetails"
          src={items.image}
          alt="Item"
        />
        <div className="IndividualItemDetails">
          <h2 ref={title}>{items.title}</h2>
          <h3 className="indH3Head">Description</h3>
          <p className="IndividualPara">{items.description}</p>
          <h3 className="indH3Head">Price</h3>
          <p ref={price} className="IndividualPara">
            {items.price}
          </p>

          <input
            ref={quantity}
            type="number"
            value={num}
            onChange={(e) => {
              setNum(e.target.value);
            }}
            min="0"
          />
          <button className="CartBtn" onClick={click}>
            Add to Cart
          </button>
          <Link to={`/Product/${items.category}`}>
            <p>Back</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IndividualProduct;
