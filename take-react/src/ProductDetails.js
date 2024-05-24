import { Link, useParams } from "react-router-dom";

export const ProductDetails = ({ products }) => {
  const params = useParams();
  const id = parseInt(params.id);
  const filteredProducts = products.filter((product) => product.id === id);
  if (filteredProducts.length === 0) {
    return null;
  }
  const product = filteredProducts[0];
  return (
    <div>
      <div>
        <h1>{product.title}</h1>
        <p>Category: {product.category}</p>
        <p>Brand: {product.brand}</p>
        <p>Description: {product.description}</p>
        <p>Price: {product.price}</p>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <Link to="/">Back to product list</Link>
      </div>
    </div>
  );
};
