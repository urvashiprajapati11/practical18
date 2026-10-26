
import { useEffect, useState } from "react";
import "./EditProduct.css";

function EditProduct({ product, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title ?? "",
        price: String(product.price ?? ""),
        category: product.category ?? "",
        description: product.description ?? "",
      });
    }
  }, [product]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!product) return;

    const price = Number(formData.price);

    if (
      !formData.title.trim() ||
      !formData.category.trim() ||
      !formData.description.trim() ||
      formData.price.trim() === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      return;
    }

    setSaving(true);

    try {
      await onUpdate({
        ...product,
        title: formData.title.trim(),
        price,
        category: formData.category.trim(),
        description: formData.description.trim(),
      });
    } finally {
      setSaving(false);
    }
  }

  if (!product) {
    return (
      <section className="edit-panel empty-panel">
        <h2>Edit Product</h2>
        <p>Select a product from the list to edit its details.</p>
      </section>
    );
  }

  return (
    <section className="edit-panel">
      <h2>Edit Product</h2>
      <p className="form-subtitle">
        Product ID: {product.id}
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Product Name</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Price ($)</label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <div className="form-actions">
          <button
            type="submit"
            className="update-button"
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Product"}
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditProduct;
