import { useState } from "react";
import { X } from "lucide-react";

import { updateProduct } from "../../../../api/productApi";

import "./AddProduct.css";

function EditProduct({
    product,
    onClose,
    onProductUpdated
}) {

  const [formData, setFormData] = useState({
    name: product.name || "",
    category: product.category || "",
    price: product.price ?? "",
    stock: product.stock ?? "",
    description: product.description || ""
});

const [imageFile, setImageFile] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };
const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
        setImageFile(file);
    }
};

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


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


          const productData = new FormData();

productData.append(
    "name",
    formData.name.trim()
);

productData.append(
    "category",
    formData.category
);

productData.append(
    "price",
    formData.price
);

productData.append(
    "stock",
    formData.stock
);

productData.append(
    "description",
    formData.description.trim()
);

if (imageFile) {
    productData.append(
        "image",
        imageFile
    );
}

const updatedProduct = await updateProduct(
    product.id,
    productData
);


            if (onProductUpdated) {
                onProductUpdated(updatedProduct);
            }


            onClose();


        } catch (err) {

            console.error(
                "Edit product error:",
                err
            );

            setError(
                err.message ||
                "Failed to update product."
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
                            Edit Product
                        </h2>

                        <p>
                            Update the product information.
                        </p>

                    </div>


                    <button
                        className="add-product-close"
                        onClick={onClose}
                        aria-label="Close edit product"
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

                    {error && (

                        <div className="add-product-error">
                            {error}
                        </div>

                    )}


                    {/* PRODUCT NAME */}

                    <div className="form-group">

                        <label htmlFor="edit-product-name">
                            Product Name
                        </label>

                        <input
                            id="edit-product-name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </div>


                    {/* CATEGORY */}

                    <div className="form-group">

                        <label htmlFor="edit-product-category">
                            Category
                        </label>

                        <select
                            id="edit-product-category"
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

                            <label htmlFor="edit-product-price">
                                Price
                            </label>

                            <input
                                id="edit-product-price"
                                name="price"
                                type="number"
                                min="0"
                                value={formData.price}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label htmlFor="edit-product-stock">
                                Stock
                            </label>

                            <input
                                id="edit-product-stock"
                                name="stock"
                                type="number"
                                min="0"
                                value={formData.stock}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* IMAGE */}

                    <div className="form-group">

    <label htmlFor="edit-product-image">
        Product Image
    </label>

    <input
        id="edit-product-image"
        name="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
    />

    {product.image && !imageFile && (
        <p className="current-image-text">
            Current image will be kept unless you select a new one.
        </p>
    )}

</div>


                    {/* DESCRIPTION */}

                    <div className="form-group">

                        <label htmlFor="edit-product-description">
                            Description
                        </label>

                        <textarea
                            id="edit-product-description"
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the product..."
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
                                ? "Saving..."
                                : "Save Changes"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditProduct;