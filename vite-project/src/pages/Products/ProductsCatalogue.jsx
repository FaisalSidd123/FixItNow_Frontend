import { useEffect, useMemo, useState } from "react";
import { Search,ShoppingCart } from "lucide-react";
import { fetchPublicProducts } from "../../api/productApi";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import "./ProductsCatalogue.css";

function Products() {
    const { cartItems } = useCart();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
   

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await fetchPublicProducts();

                setProducts(data);
            } catch (err) {
                console.error("Products page fetch error:", err);

                setError(
                    err.message || "Unable to load products."
                );
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(
                products
                    .map((product) => product.category)
                    .filter(Boolean)
            )
        ];

        return ["All", ...uniqueCategories];
    }, [products]);

    const filteredProducts = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        return products.filter((product) => {
            const matchesSearch =
                !search ||
                product.name?.toLowerCase().includes(search) ||
                product.category?.toLowerCase().includes(search) ||
                product.description?.toLowerCase().includes(search);

            const matchesCategory =
                categoryFilter === "All" ||
                product.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, categoryFilter]);

    if (loading) {
        return (
            <main className="products-page">
                <div className="products-page-loading">
                    Loading products...
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="products-page">
                <div className="products-page-error">
                    {error}
                </div>
            </main>
        );
    }

    return (
        <main className="products-page">

            <section className="products-page-hero">
   <Link
        to="/cart"
        className="products-cart-btn"
        aria-label="View shopping cart"
    >
        <ShoppingCart size={21} />

      {cartItems.length > 0 && (
    <span className="products-cart-badge">
        {cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        )}
    </span>
)}
    </Link>

                <p className="products-page-eyebrow">
                    OUR PRODUCTS
                </p>

                <h1>
                    Explore Our
                    <span> Solar Products</span>
                </h1>

                <p className="products-page-intro">
                    Discover reliable solar products designed to
                    deliver efficient and dependable energy solutions.
                </p>

            </section>

            <section className="products-catalog">

                <div className="products-toolbar">

                    <div className="products-search">

                        <Search size={19} />

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                        />

                    </div>

                    <div className="products-categories">

                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                className={
                                    categoryFilter === category
                                        ? "category-btn active"
                                        : "category-btn"
                                }
                                onClick={() =>
                                    setCategoryFilter(category)
                                }
                            >
                                {category}
                            </button>
                        ))}

                    </div>

                </div>

                {filteredProducts.length === 0 ? (
                    <div className="products-empty">
                        <h3>No products found</h3>

                        <p>
                            Try changing your search or category filter.
                        </p>
                    </div>
                ) : (
                    <div className="products-page-grid">

                        {filteredProducts.map((product) => (

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

                                    <h2>
                                        {product.name}
                                    </h2>

                                    {product.description && (
                                        <p className="product-description">
                                            {product.description}
                                        </p>
                                    )}

                                    <div className="product-card-bottom">

                                        <span className="product-price">
                                            Rs.{" "}
                                            {Number(
                                                product.price
                                            ).toLocaleString()}
                                        </span>

                                        <span className="product-stock">
                                            {Number(product.stock) > 0
                                                ? "Available"
                                                : "Out of Stock"}
                                        </span>

                                    </div>

                                   <Link
    to={`/products/${product.id}`}
    className="product-details-btn"
>
    View Details
</Link>

                                </div>

                            </article>

                        ))}

                    </div>
                )}

            </section>

        </main>
    );
}

export default Products;