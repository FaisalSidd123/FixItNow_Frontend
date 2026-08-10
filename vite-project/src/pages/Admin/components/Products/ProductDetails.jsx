
import { X, Pencil } from "lucide-react";
import "./ProductDetails.css";

function ProductDetails({ product, closeDetails }) {

    if (!product) {
        return null;
    }

    return (
        <div
            className="product-details-overlay"
            onClick={closeDetails}
        >

            <div
                className="product-details-card"
                onClick={(e) => e.stopPropagation()}
            >

                {/* CLOSE BUTTON */}
                <button
                    className="close-details"
                    onClick={closeDetails}
                    aria-label="Close product details"
                >
                    <X size={20} />
                </button>


                {/* PRODUCT IMAGE */}
                {product.image && (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="details-image"
                    />
                )}


                {/* PRODUCT NAME */}
                <h2>
                    {product.name}
                </h2>


                {/* PRODUCT INFORMATION */}
                <div className="details-info">

                    <p>
                        Category:
                        <span>
                            {product.category || "—"}
                        </span>
                    </p>


                    <p>
                        Price:
                        <span>
                            Rs {Number(product.price || 0).toLocaleString()}
                        </span>
                    </p>


                    <p>
                        Stock:
                        <span>
                            {product.stock ?? 0}
                        </span>
                    </p>


                    <p>
                        Status:
                        <span>
                            {product.status || "—"}
                        </span>
                    </p>

                </div>


                {/* DESCRIPTION */}
                {product.description && (
                    <div className="product-description">

                        <h3>
                            Description
                        </h3>

                        <p>
                            {product.description}
                        </p>

                    </div>
                )}


                {/* EDIT BUTTON */}
                <button className="edit-product-btn">

                    <Pencil size={17} />

                    Edit Product

                </button>

            </div>

        </div>
    );
}

export default ProductDetails;

