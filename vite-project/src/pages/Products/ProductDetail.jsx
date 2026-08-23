import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ShoppingCart,
    Zap,
    Package,
    Tag,
    CheckCircle2
} from "lucide-react";

import { fetchPublicProductById } from "../../api/productApi";
import { useAuth } from "../../contexts/AuthContext";
import "./ProductDetail.css";

function ProductDetail() {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        if (product && quantity < Number(product.stock)) {
            setQuantity(quantity + 1);
        }
    };

    const handleBuyNow = () => {
        if (!userLoggedIn) {
            navigate("/signin", { state: { from: `/products/${productId}` } });
            return;
        }
        navigate("/checkout", { state: { product, quantity } });
    };

    useEffect(() => {

        const loadProduct = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await fetchPublicProductById(productId);

                setProduct(data);

            } catch (err) {

                console.error(
                    "Product detail fetch error:",
                    err
                );

                setError(
                    err.message ||
                    "Unable to load product."
                );

            } finally {

                setLoading(false);

            }

        };

        loadProduct();

    }, [productId]);


    if (loading) {

        return (
            <main className="product-detail-page">
                <div className="product-detail-status">
                    <div className="product-detail-spinner"></div>
                    <p>Loading product...</p>
                </div>
            </main>
        );

    }


    if (error || !product) {

        return (
            <main className="product-detail-page">

                <div className="product-detail-status">

                    <h2>
                        {error || "Product not found."}
                    </h2>

                    <Link
                        to="/products"
                        className="back-products-btn"
                    >
                        <ArrowLeft size={17} />
                        Back to Products
                    </Link>

                </div>

            </main>
        );

    }


    const isAvailable = Number(product.stock) > 0;


    return (
        <main className="product-detail-page">

            <div className="product-detail-container">

                {/* Breadcrumb / Back */}
                <Link
                    to="/products"
                    className="product-detail-back"
                >
                    <ArrowLeft size={17} />
                    Back to Products
                </Link>


                {/* Main Product Area */}
                <section className="product-detail-main">

                    {/* =========================
                        LEFT — PRODUCT IMAGE
                    ========================== */}

                    <div className="product-detail-gallery">

                        <div className="product-detail-image">

                            <img
                                src={product.image}
                                alt={product.name}
                            />

                        </div>

                    </div>


                    {/* =========================
                        RIGHT — PRODUCT INFO
                    ========================== */}

                    <div className="product-detail-info">

                        <span className="product-detail-category">
                            {product.category}
                        </span>


                        <h1>
                            {product.name}
                        </h1>


                        <div className="product-detail-rating">
                            <span className="stars">
                                ★★★★★
                            </span>

                            <span>
                                Product Rating
                            </span>
                        </div>


                        <div className="product-detail-price">
                            Rs. {Number(product.price).toLocaleString()}
                        </div>


                        {product.description && (
                            <p className="product-detail-description">
                                {product.description}
                            </p>
                        )}


                        {/* Product Meta */}
                        <div className="product-detail-meta">

                            <div className="product-meta-item">

                                <span className="meta-icon">
                                    <Tag size={17} />
                                </span>

                                <div>
                                    <span className="meta-label">
                                        Category
                                    </span>

                                    <strong>
                                        {product.category}
                                    </strong>
                                </div>

                            </div>


                            <div className="product-meta-item">

                                <span className="meta-icon">
                                    <Package size={17} />
                                </span>

                                <div>
                                    <span className="meta-label">
                                        Availability
                                    </span>

                                    <strong
                                        className={
                                            isAvailable
                                                ? "available"
                                                : "unavailable"
                                        }
                                    >
                                        {isAvailable
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </strong>
                                </div>

                            </div>

                        </div>


                        {/* Stock information */}
                        {isAvailable && (
                            <div className="product-stock-info">

                                <CheckCircle2 size={17} />

                                <span>
                                    {product.stock} units available
                                </span>

                            </div>
                        )}

                        {/* Quantity Selector */}
                        {isAvailable && (
                            <div className="product-quantity-selector">
                                <span className="quantity-label">Quantity:</span>
                                <div className="quantity-controls">
                                    <button
                                        type="button"
                                        onClick={handleDecrement}
                                        className="qty-btn"
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="qty-value">{quantity}</span>
                                    <button
                                        type="button"
                                        onClick={handleIncrement}
                                        className="qty-btn"
                                        disabled={quantity >= Number(product.stock)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}


                        {/* Actions */}
                        <div className="product-detail-actions">

                            <button
                                type="button"
                                className="product-cart-btn"
                                disabled={!isAvailable}
                            >
                                <ShoppingCart size={18} />
                                Add to Cart
                            </button>


                            <button
                                type="button"
                                className="product-buy-btn"
                                disabled={!isAvailable}
                                onClick={handleBuyNow}
                            >
                                <Zap size={18} />
                                Buy Now
                            </button>

                        </div>

                    </div>

                </section>



            </div>

        </main>
    );
}

export default ProductDetail;