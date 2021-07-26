import React, { useEffect, useState } from "react";
import RenderProducts from "./RenderProducts";

function Products({ match }) {
  console.log(match);
  const id = match.params.id;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const GetData = async function (id) {
    try {
      const data = await fetch(
        `https://fakestoreapi.com/products/category/${id}`
      );
      const FinData = await data.json();

      setItems(FinData);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    GetData(id);
  }, [id]);
  return <RenderProducts Error={error} loader={loading} products={items} />;
}

export default Products;
