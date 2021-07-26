import useFetch from "../hooks/useFetch";
import RenderProducts from "./RenderProducts";

function Products({ match }) {
  console.log(match);
  const id = match.params.id;
  let url = `https://fakestoreapi.com/products/category/${id}`;

  const { items, loading, error } = useFetch(url, id);

  return <RenderProducts Error={error} loader={loading} products={items} />;
}

export default Products;
