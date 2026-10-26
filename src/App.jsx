
import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleUpdate(updatedProduct) {
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const data = await response.json();

      // Update the displayed list with the edited values.
      setProducts((previousProducts) =>
        previousProducts.map((product) =>
          product.id === updatedProduct.id
            ? { ...product, ...data, ...updatedProduct }
            : product
        )
      );

      setSelectedProduct(null);
      setMessage("Product updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Product Management System</h1>
        <p>Select and update existing products</p>
      </header>

      <main className="main-content">
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p className="loading">Loading products...</p>
        ) : (
          <div className="content-grid">
            <ProductList
              products={products}
              onEdit={(product) => {
                setSelectedProduct({ ...product });
                setMessage("");
                setError("");
              }}
              selectedId={selectedProduct?.id}
            />

            <EditProduct
              product={selectedProduct}
              onUpdate={handleUpdate}
              onCancel={() => setSelectedProduct(null)}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
