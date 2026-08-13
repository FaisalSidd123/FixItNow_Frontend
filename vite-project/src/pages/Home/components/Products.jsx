import { useEffect, useState } from "react";
import { fetchPublicProducts } from "../../../api/productApi";
import { useNavigate } from "react-router-dom";
import "./Products.css";
function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
const navigate = useNavigate();
    useEffect(() => {

        const loadProducts = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await fetchPublicProducts();

                setProducts(data);

            } catch (err) {

                console.error("Public products fetch error:", err);

                setError(
                    err.message ||
                    "Unable to load products."
                );

            } finally {

                setLoading(false);

            }

        };

        loadProducts();

    }, []);

    if (loading) {
        return (
            <section className="products-section">
                <div className="products-container">
                    <p>Loading products...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="products-section">
                <div className="products-container">
                    <p>{error}</p>
                </div>
            </section>
        );
    }
// if (products.length === 0) {
    return (
        <section className="products-section">

            <div className="products-container">

                <div className="products-heading">

                    <p className="products-eyebrow">
                        OUR PRODUCTS
                    </p>

                    <h2>
                        Quality Products for
                        <span> Your Solar Needs</span>
                    </h2>

                    <p className="products-intro">
                        Explore our range of reliable solar products
                        designed to deliver efficient and dependable
                        energy solutions.
                    </p>

                </div>

                <div className="products-grid">

                  {products.slice(0, 6).map((product) => (

                        <article
                            className="product-card"
                            key={product.id}
                        >

                            <div className="product-image-wrapper">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />

                            </div>

                            <div className="product-card-content">

                                <p className="product-category">
                                    {product.category}
                                </p>

                                <h3>
                                    {product.name}
                                </h3>

                                {product.description && (
                                    <p className="product-description">
                                        {product.description}
                                    </p>
                                )}

                                <div className="product-card-bottom">

                                    <span className="product-price">
                                        Rs. {Number(product.price).toLocaleString()}
                                    </span>

                                    <span className="product-stock">
                                        {Number(product.stock) > 0
                                            ? "Available"
                                            : "Out of Stock"}
                                    </span>

                                </div>

                                <button
                                    type="button"
                                    className="product-details-btn"
                                >
                                    View Details
                                </button>

                            </div>

                        </article>

                    ))}

                </div>
                <div className="products-view-all">
   <button
    type="button"
    className="products-view-all-btn"
    onClick={() => navigate("/products")}
>
    View All Products
</button>
</div>

            </div>

        </section>
    );
}
// }

export default Products;