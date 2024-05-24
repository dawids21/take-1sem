import { useState } from "react";
import { ProductItem } from "./ProductItem";

export const ProductList = ({ products }) => {
  const [filter, setFilter] = useState("");
  return (
    <div>
      <h1>Product List</h1>
      <label htmlFor="filter">Filter by product title: </label>
      <input
        id="filter"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(filter.toLowerCase())
          )
          .map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              brand={product.brand}
            />
          ))}
      </ul>
    </div>
  );
};
