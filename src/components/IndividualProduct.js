import React from "react";
import { useRouteMatch } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
function IndividualProduct() {
  let match = useRouteMatch();
  let id = match.params.id;
  let url = `https://fakestoreapi.com/products/${id}`;

  const { items, loading, error } = useFetch(url, id);
  console.log(items);

  return (
    <div className="IndividualContainer">
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error...</h1>}

      <div key={items.id} className="IndividualFlexContainer">
        <img
          id="individualImage"
          className="IndividualItemDetails"
          src={items.image}
          alt="Item"
        />
        <div className="IndividualItemDetails">
          <h2>{items.title}</h2>
          <h3 className="indH3Head">Description</h3>
          <p className="IndividualPara">{items.description}</p>
          <h3 className="indH3Head">Price</h3>
          <p className="IndividualPara">{items.price}</p>
          <Link to={`/Product/${items.category}`}>
            <p>Back</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IndividualProduct;
