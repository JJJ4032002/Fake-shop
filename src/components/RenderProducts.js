import React from "react";
import { Link } from "react-router-dom";
function RenderProducts({ products, Error, loader }) {
  console.log(products);
  return (
    <div className="RenderProducts">
      {loader && <h1>Loading...</h1>}
      {Error && <h1>Error...</h1>}
      <div className="Render">
        {products.map((e) => {
          return (
            <div key={e.id} className="IndRender">
              <Link to={`/Product/Individual/${e.id}`}>
                <img className="RenderImage" src={e.image} alt="Product" />
                <p className="RenderPara">{e.title}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RenderProducts;
