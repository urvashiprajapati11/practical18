
import "./ProductList.css";

function ProductList({ products, onEdit, selectedId }) {
  return (
    <section className="product-list">
      <h2>Existing Products</h2>

      {products.map((product) => (
        <div
          className={`product-card ${
            selectedId === product.id ? "selected" : ""
          }`}
          key={product.id}
        >
          <div className="product-info">
            <h3>{product.title}</h3>
            <p className="product-price">
              ${Number(product.price).toFixed(2)}
            </p>
            <p className="product-category">{product.category}</p>
          </div>

          <button
            className="edit-button"
            onClick={() => onEdit(product)}
          >
            Edit
          </button>
        </div>
      ))}
    </section>
  );
}

export default ProductList;
