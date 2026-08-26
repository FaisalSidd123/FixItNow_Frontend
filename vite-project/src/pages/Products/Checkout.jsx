import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { createOrder } from "../../api/orderApi";
import { ArrowLeft, CreditCard, Truck, CheckCircle, ShoppingBag } from "lucide-react";
import "./Checkout.css";

function Checkout() {
    const { currentUser } = useAuth();
    const { clearCart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve product details passed from ProductDetail page
  // Support both Buy Now and Cart checkout
const checkoutItem = location.state?.product;
const checkoutQty = location.state?.quantity || 1;

const cartItems = location.state?.items || [];

const checkoutItems = checkoutItem
    ? [
          {
              ...checkoutItem,
              quantity: checkoutQty
          }
      ]
    : cartItems;

    // Form inputs
    const [shippingName, setShippingName] = useState(currentUser?.displayName || "");
    const [shippingAddress, setShippingAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

    // UI States
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [error, setError] = useState("");

   if (checkoutItems.length === 0) {
        return (
            <main className="checkout-page">
                <div className="checkout-empty">
                    <ShoppingBag size={48} className="empty-icon" />
                    <h2>No items in checkout</h2>
                    <p>Select a product from our catalog to place an order.</p>
                    <Link to="/products" className="empty-btn">
                        <ArrowLeft size={16} />
                        View Products
                    </Link>
                </div>
            </main>
        );
    }

   const subtotal = checkoutItems.reduce(
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!shippingName || !shippingAddress || !phone) {
            setError("Please fill in all required shipping fields.");
            return;
        }

        try {
            setIsSubmitting(true);
            setError("");

            const orderData = {
                email: currentUser.email,
                shippingName,
                shippingAddress,
                phone,
                paymentMethod,
                totalAmount,
              items: checkoutItems.map((item) => ({
    id: item.id,
    name: item.name,
    price: Number(item.price),
    quantity: item.quantity,
    image: item.image
}))
            };

          const data = await createOrder(orderData);

if (location.state?.items) {
    clearCart();
}

setOrderSuccess(data.order);
        } catch (err) {
            console.error("Checkout order creation error:", err);
            setError(err.message || "Failed to place your order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderSuccess) {
        return (
            <main className="checkout-page">
                <div className="checkout-success-card">
                    <div className="success-icon-wrapper">
                        <CheckCircle size={52} className="success-icon" />
                    </div>
                    <h1>Order Placed Successfully!</h1>
                    <p className="success-tagline">Thank you for your purchase. Your order is now being processed.</p>

                    <div className="success-details">
                        <div className="detail-row">
                            <span>Order ID:</span>
                            <strong>{orderSuccess.id}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Total Amount:</span>
                            <strong>Rs. {totalAmount.toLocaleString()}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Delivery Address:</span>
                            <span>{orderSuccess.shipping_address}</span>
                        </div>
                    </div>

                    <div className="success-actions">
                        <Link to="/dashboard" className="btn-success-dashboard">
                            Go to Dashboard
                        </Link>
                        <Link to="/products" className="btn-success-shop">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            <div className="checkout-container">
                {/* Back button */}
               <Link
    to={checkoutItem ? `/products/${checkoutItem.id}` : "/cart"}
    className="checkout-back-link"
>
    <ArrowLeft size={16} />
    {checkoutItem ? "Back to Product" : "Back to Cart"}
</Link>

                <h1 className="checkout-title">Checkout Details</h1>

                <div className="checkout-grid">
                    {/* Left: Shipping & Billing Form */}
                    <form onSubmit={handleSubmit} className="checkout-form-panel">
                        <h2>Shipping Information</h2>
                        {error && <div className="checkout-error-alert">{error}</div>}

                        <div className="checkout-form-group">
                            <label htmlFor="shipping-name">Full Name *</label>
                            <input
                                id="shipping-name"
                                type="text"
                                required
                                placeholder="Enter recipient full name"
                                value={shippingName}
                                onChange={(e) => setShippingName(e.target.value)}
                            />
                        </div>

                        <div className="checkout-form-group">
                            <label htmlFor="shipping-email">Email Address</label>
                            <input
                                id="shipping-email"
                                type="email"
                                disabled
                                value={currentUser?.email || ""}
                            />
                            <span className="form-info-text">Linked to your authenticated profile.</span>
                        </div>

                        <div className="checkout-form-group">
                            <label htmlFor="shipping-phone">Phone Number *</label>
                            <input
                                id="shipping-phone"
                                type="tel"
                                required
                                placeholder="e.g. 03001234567"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="checkout-form-group">
                            <label htmlFor="shipping-address">Delivery Address *</label>
                            <textarea
                                id="shipping-address"
                                required
                                placeholder="Enter complete shipping address (House, Street, Area, City)"
                                rows={3}
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                            />
                        </div>

                        <h2 className="payment-heading">Payment Method</h2>
                        <div className="payment-options">
                            <label className={`payment-option-card ${paymentMethod === "Cash on Delivery" ? "active" : ""}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Cash on Delivery"
                                    checked={paymentMethod === "Cash on Delivery"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <div className="payment-card-content">
                                    <Truck size={18} />
                                    <div>
                                        <h4>Cash on Delivery (COD)</h4>
                                        <span>Pay with cash upon delivery</span>
                                    </div>
                                </div>
                            </label>

                            <label className={`payment-option-card ${paymentMethod === "Bank Transfer" ? "active" : ""}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Bank Transfer"
                                    checked={paymentMethod === "Bank Transfer"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <div className="payment-card-content">
                                    <CreditCard size={18} />
                                    <div>
                                        <h4>Bank Transfer</h4>
                                        <span>Transfer directly to our bank account</span>
                                    </div>
                                </div>
                            </label>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="checkout-submit-btn">
                            {isSubmitting ? "Processing Order..." : "Confirm & Place Order"}
                        </button>
                    </form>

                    {/* Right: Summary panel */}
                    <div className="checkout-summary-panel">
                        <h2>Order Summary</h2>

                       {checkoutItems.map((item) => (
    <div
        className="checkout-summary-item"
        key={item.id}
    >
        <img
            src={item.image}
            alt={item.name}
            className="summary-item-img"
        />

        <div className="summary-item-info">
            <h3>{item.name}</h3>

            <span className="summary-item-category">
                {item.category}
            </span>

            <div className="summary-item-pricing">
                <span>
                    Rs. {Number(item.price).toLocaleString()}
                </span>

                <span>
                    Qty: {item.quantity}
                </span>
            </div>
        </div>
    </div>
))}

                        <div className="checkout-totals">
                            <div className="totals-row">
                                <span>Subtotal</span>
                                <span>Rs. {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="totals-row">
                                <span>Shipping Fee</span>
                                <span>{shippingFee === 0 ? "Free" : `Rs. ${shippingFee}`}</span>
                            </div>
                            <div className="totals-row grand-total">
                                <span>Grand Total</span>
                                <span>Rs. {totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Checkout;
