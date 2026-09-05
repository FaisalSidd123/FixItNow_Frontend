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
import { getProductReviews, submitReview } from "../../api/reviewApi";
import { useAuth } from "../../contexts/AuthContext";
import "./ProductDetail.css";
import { useCart } from "../../contexts/CartContext";

function ProductDetail() {
    const { currentUser, userLoggedIn } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [reviews, setReviews] = useState([]);
    const [reviewForm, setReviewForm] = useState({
        author_name: currentUser?.displayName || "",
        rating: 5,
        comment: ""
    });
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        if (currentUser?.displayName && !reviewForm.author_name) {
            setReviewForm(prev => ({ ...prev, author_name: currentUser.displayName }));
        }
    }, [currentUser]);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const data = await getProductReviews(productId);
                setReviews(data);
            } catch (err) {
                console.error("Error loading product reviews:", err);
            }
        };
        if (productId) loadReviews();
    }, [productId]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!reviewForm.author_name || !reviewForm.comment) {
            alert("Please fill in your name and comment.");
            return;
        }
        setSubmittingReview(true);
        try {
            const newRev = await submitReview({
                ...reviewForm,
                product_id: productId,
                author_email: currentUser?.email || ""
            });
            setReviews([newRev, ...reviews]);
            setReviewForm({ author_name: currentUser?.displayName || "", rating: 5, comment: "" });
            alert("Thank you! Your review has been submitted.");
        } catch (err) {
            alert("Failed to submit review: " + err.message);
        } finally {
            setSubmittingReview(false);
        }
    };

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
  const handleAddToCart = () => {
    if (!userLoggedIn) {
        navigate("/signin", {
            state: { from: `/products/${productId}` }
        });
        return;
    }

    addToCart(product, quantity);

    navigate("/cart");
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
    onClick={handleAddToCart}
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

                {/* =========================
                    CUSTOMER REVIEWS SECTION
                ========================== */}
                <section className="product-reviews-section" style={{ marginTop: "40px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "30px" }}>
                    <h2 style={{ fontSize: "1.4rem", color: "#ffffff", marginBottom: "20px" }}>Customer Reviews ({reviews.length})</h2>

                    {/* Review Form */}
                    <form onSubmit={handleReviewSubmit} style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "12px", padding: "20px", marginBottom: "30px" }}>
                        <h3 style={{ fontSize: "1.1rem", color: "#EF9F27", marginBottom: "12px" }}>Write a Review</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                            <div>
                                <label style={{ display: "block", fontSize: "12px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "5px" }}>Your Name</label>
                                <input
                                    type="text"
                                    value={reviewForm.author_name}
                                    onChange={(e) => setReviewForm({ ...reviewForm, author_name: e.target.value })}
                                    required
                                    placeholder="Enter your name"
                                    style={{ width: "100%", background: "#111827", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "8px 12px", color: "#ffffff" }}
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: "12px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "5px" }}>Rating</label>
                                <select
                                    value={reviewForm.rating}
                                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                                    style={{ width: "100%", background: "#111827", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "8px 12px", color: "#ffffff" }}
                                >
                                    <option value={5}>5 Stars ★★★★★</option>
                                    <option value={4}>4 Stars ★★★★☆</option>
                                    <option value={3}>3 Stars ★★★☆☆</option>
                                    <option value={2}>2 Stars ★★☆☆☆</option>
                                    <option value={1}>1 Star ★☆☆☆☆</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label style={{ display: "block", fontSize: "12px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "5px" }}>Your Review</label>
                            <textarea
                                value={reviewForm.comment}
                                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                required
                                rows={3}
                                placeholder="Write your thoughts about this product..."
                                style={{ width: "100%", background: "#111827", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "8px 12px", color: "#ffffff" }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submittingReview}
                            style={{ background: "#EF9F27", color: "#000", border: "none", borderRadius: "8px", padding: "10px 20px", fontWeight: "600", cursor: "pointer" }}
                        >
                            {submittingReview ? "Submitting..." : "Submit Review"}
                        </button>
                    </form>

                    {/* Review List */}
                    {reviews.length === 0 ? (
                        <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "14px" }}>No customer reviews yet. Be the first to review this product!</p>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            {reviews.map((r) => (
                                <div key={r.id} style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "10px", padding: "15px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                                        <strong style={{ color: "#ffffff", fontSize: "14px" }}>{r.author_name}</strong>
                                        <span style={{ color: "#EF9F27", fontSize: "14px" }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                                    </div>
                                    <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "13px", margin: 0 }}>{r.comment}</p>
                                    <small style={{ color: "rgba(255, 255, 255, 0.35)", fontSize: "11px", display: "block", marginTop: "6px" }}>{new Date(r.created_at).toLocaleDateString()}</small>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

export default ProductDetail;