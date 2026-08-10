import { useState } from "react";
import { X } from "lucide-react";

import { createProduct } from "../../../../api/productApi";

import "./AddProduct.css";

function AddProduct({ onClose, onProductAdded }) {

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: "",
        description: ""
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        // Basic frontend validation

        if (
            !formData.name.trim() ||
            !formData.category ||
            formData.price === "" ||
            formData.stock === ""
        ) {

            setError(
                "Please fill in all required fields."
            );

            return;
        }


        try {

            setSaving(true);


            const newProduct = await createProduct({

                name: formData.name.trim(),

                category: formData.category,

                price: Number(formData.price),

                stock: Number(formData.stock),

                image: formData.image.trim() || null,

                description:
                    formData.description.trim() || null

            });


            // Tell ProductPage that a product was added

            if (onProductAdded) {
                onProductAdded(newProduct);
            }


            // Close modal

            onClose();


        } catch (err) {

            console.error(
                "Add product error:",
                err
            );

            setError(
                err.message ||
                "Failed to add product."
            );

        } finally {

            setSaving(false);

        }

    };


    return (

        <div
            className="add-product-overlay"
            onClick={onClose}
        >

            <div
                className="add-product-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                {/* HEADER */}

                <div className="add-product-header">

                    <div>

                        <span className="add-product-label">
                            PRODUCT MANAGEMENT
                        </span>

                        <h2>
                            Add Product
                        </h2>

                        <p>
                            Add a new product to your inventory.
                        </p>

                    </div>


                    <button
                        className="add-product-close"
                        onClick={onClose}
                        aria-label="Close add product"
                        type="button"
                    >

                        <X size={18} />

                    </button>

                </div>


                {/* FORM */}

                <form
                    className="add-product-form"
                    onSubmit={handleSubmit}
                >

                    {/* ERROR */}

                    {error && (

                        <div className="add-product-error">
                            {error}
                        </div>

                    )}


                    {/* PRODUCT NAME */}

                    <div className="form-group">

                        <label htmlFor="product-name">
                            Product Name
                        </label>

                        <input
                            id="product-name"
                            name="name"
                            type="text"
                            placeholder="e.g. Solar Panel 550W"
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </div>


                    {/* CATEGORY */}

                    <div className="form-group">

                        <label htmlFor="product-category">
                            Category
                        </label>

                        <select
                            id="product-category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >

                            <option value="" disabled>
                                Select category
                            </option>

                            <option value="Panels">
                                Panels
                            </option>

                            <option value="Battery">
                                Battery
                            </option>

                            <option value="Inverter">
                                Inverter
                            </option>

                        </select>

                    </div>


                    {/* PRICE + STOCK */}

                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="product-price">
                                Price
                            </label>

                            <input
                                id="product-price"
                                name="price"
                                type="number"
                                min="0"
                                placeholder="25000"
                                value={formData.price}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="product-stock">
                                Stock
                            </label>

                            <input
                                id="product-stock"
                                name="stock"
                                type="number"
                                min="0"
                                placeholder="20"
                                value={formData.stock}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* IMAGE */}

                    <div className="form-group">

                        <label htmlFor="product-image">
                            Product Image
                        </label>

                        <input
                            id="product-image"
                            name="image"
                            type="text"
                            placeholder="Paste image URL"
                            value={formData.image}
                            onChange={handleChange}
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-group">

                        <label htmlFor="product-description">
                            Description
                        </label>

                        <textarea
                            id="product-description"
                            name="description"
                            rows="4"
                            placeholder="Describe the product..."
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>

                    </div>


                    {/* ACTIONS */}

                    <div className="add-product-actions">

                        <button
                            type="button"
                            className="cancel-product-btn"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="save-product-btn"
                            disabled={saving}
                        >

                            {saving
                                ? "Adding..."
                                : "Add Product"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default AddProduct;