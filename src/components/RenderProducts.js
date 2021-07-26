import React from "react";

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
              <img className="RenderImage" src={e.image} alt="Product" />
              <p>{e.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RenderProducts;
