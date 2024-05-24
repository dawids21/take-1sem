import { useEffect, useState } from "react";
import "./App.css";
import { ProductList } from "./ProductList";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProductDetails } from "./ProductDetails";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    // setProducts([
    //   { id: 1, title: "iPhone 14", brand: "Apple" },
    //   { id: 2, title: "iPad Air", brand: "Apple" },
    //   { id: 3, title: "Galaxy A51", brand: "Samsung" },
    // ]);
  }, []);

  const router = createBrowserRouter([
    { path: "/", element: <ProductList products={products} /> },
    { path: "/details/:id", element: <ProductDetails products={products} /> },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route
            path="details/:id"
            element={<ProductDetails products={products} />}
          />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
