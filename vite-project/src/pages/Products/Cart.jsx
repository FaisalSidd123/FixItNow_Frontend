import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ShoppingCart,
    Trash2,
    Minus,
    Plus
} from "lucide-react";

import { useCart } from "../../contexts/CartContext";

import "./Cart.css";

function Cart() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity
    } = useCart();

    const navigate = useNavigate();
const handleContinueShopping = () => {
    navigate("/products");
};
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    const shippingFee =
        subtotal === 0
            ? 0
            : subtotal > 15000
            ? 0
            : 250;

    const totalAmount = subtotal + shippingFee;

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            updateQuantity(
                item.id,
                item.quantity - 1
            );
        }
    };

    const handleIncrease = (item) => {
        if (item.quantity < Number(item.stock)) {
            updateQuantity(
                item.id,
                item.quantity + 1
            );
        }
    };

    const handleCheckout = () => {
        navigate("/checkout", {
            state: {
                items: cartItems
            }
        });
    };

    if (cartItems.length === 0) {
        return (
            <main className="cart-page">

                <div className="cart-empty">

                    <ShoppingCart
                        size={52}
                        className="cart-empty-icon"
                    />

                    <h1>Your Cart is Empty</h1>

                    <p>
                        Looks like you haven't added
                        any products yet.
                    </p>
<button
    type="button"
    className="cart-shop-btn"
    onClick={handleContinueShopping}
>
    <ArrowLeft size={17} />
    Browse Products
</button>

                </div>

            </main>
        );
    }

    return (
        <main className="cart-page">

            <div className="cart-container">

              <button
    type="button"
    className="cart-back-link"
    onClick={handleContinueShopping}
>
    <ArrowLeft size={17} />
    Continue Shopping
</button>

                <h1>Your Shopping Cart</h1>

                <div className="cart-layout">

                    {/* Cart Items */}
                    <section className="cart-items-section">

                        {cartItems.map((item) => (

                            <article
                                className="cart-item"
                                key={item.id}
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="cart-item-image"
                                />

                                <div className="cart-item-info">

                                    <span className="cart-item-category">
                                        {item.category}
                                    </span>

                                    <h2>
                                        {item.name}
                                    </h2>

                                    <span className="cart-item-price">
                                        Rs.{" "}
                                        {Number(
                                            item.price
                                        ).toLocaleString()}
                                    </span>

                                </div>

                                {/* Quantity */}
                                <div className="cart-quantity-controls">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDecrease(item)
                                        }
                                        disabled={
                                            item.quantity <= 1
                                        }
                                    >
                                        <Minus size={16} />
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleIncrease(item)
                                        }
                                        disabled={
                                            item.quantity >=
                                            Number(item.stock)
                                        }
                                    >
                                        <Plus size={16} />
                                    </button>

                                </div>

                                {/* Item total + remove */}
                                <div className="cart-item-actions">

                                    <strong>
                                        Rs.{" "}
                                        {(
                                            Number(item.price) *
                                            item.quantity
                                        ).toLocaleString()}
                                    </strong>

                                    <button
                                        type="button"
                                        className="cart-remove-btn"
                                        onClick={() =>
                                            removeFromCart(item.id)
                                        }
                                        aria-label={`Remove ${item.name}`}
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>

                            </article>

                        ))}

                    </section>

                    {/* Order Summary */}
                    <aside className="cart-summary">

                        <h2>Order Summary</h2>

                        <div className="cart-summary-row">

                            <span>
                                Subtotal
                            </span>

                            <span>
                                Rs.{" "}
                                {subtotal.toLocaleString()}
                            </span>

                        </div>

                        <div className="cart-summary-row">

                            <span>
                                Shipping
                            </span>

                            <span>
                                {shippingFee === 0
                                    ? "Free"
                                    : `Rs. ${shippingFee}`}
                            </span>

                        </div>

                        <div className="cart-summary-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                Rs.{" "}
                                {totalAmount.toLocaleString()}
                            </strong>

                        </div>

                        <button
                            type="button"
                            className="cart-checkout-btn"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>

                    </aside>

                </div>

            </div>

        </main>
    );
}

export default Cart;