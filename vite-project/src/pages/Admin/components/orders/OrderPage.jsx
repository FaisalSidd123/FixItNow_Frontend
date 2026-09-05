import { useEffect, useState } from "react";
import { fetchAdminOrders, updateOrderStatus } from "../../../../api/orderApi";
import { ShoppingBag, Truck, Calendar, User, Phone, MapPin, Loader } from "lucide-react";
import "./OrderPage.css";

function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await fetchAdminOrders();
            setOrders(data);
        } catch (err) {
            console.error("Error loading admin orders:", err);
            setError(err.message || "Failed to load orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setUpdatingId(orderId);
            await updateOrderStatus(orderId, newStatus);
            // Update status locally in state
            setOrders(prev => prev.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (err) {
            console.error("Error updating order status:", err);
            alert(err.message || "Failed to update order status.");
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return (
            <div className="admin-orders-loading">
                <Loader className="spinner" />
                <p>Loading orders catalogue...</p>
            </div>
        );
    }

    return (
        <div className="admin-orders-page">
            <div className="orders-header">
                <div>
                    <h2>Orders Catalogue</h2>
                    <p className="subtitle">Track customer orders, shipments, and inventory distribution.</p>
                </div>
                <div className="orders-count-badge">
                    <ShoppingBag size={16} />
                    <span>{orders.length} Active Orders</span>
                </div>
            </div>

            {error && <div className="orders-error-alert">{error}</div>}

            {orders.length === 0 ? (
                <div className="orders-empty-state">
                    <h3>No orders found</h3>
                    <p>Orders placed by clients will show up here automatically.</p>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.id} className="admin-order-card">
                            {/* Top row: ID, Date, Status */}
                            <div className="order-card-header">
                                <div className="order-id-meta">
                                    <h3>Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                                    <span className="order-date">
                                        <Calendar size={13} />
                                        {new Date(order.created_at).toLocaleString()}
                                    </span>
                                </div>
                                <div className="order-status-control">
                                    {updatingId === order.id ? (
                                        <span className="updating-loader">Updating...</span>
                                    ) : (
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`status-select ${order.status.toLowerCase()}`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    )}
                                </div>
                            </div>

                            {/* Middle section: Items, shipping details */}
                            <div className="order-card-body">
                                {/* Items list */}
                                <div className="order-body-items">
                                    <h4>Purchased Items</h4>
                                    <div className="items-list">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="item-row">
                                                <img src={item.image} alt={item.name} className="item-thumb" />
                                                <div className="item-info">
                                                    <span className="item-name">{item.name}</span>
                                                    <span className="item-pricing">
                                                        Rs. {Number(item.price).toLocaleString()} x {item.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="order-total-amount">
                                        <span>Total Amount Paid:</span>
                                        <strong>Rs. {Number(order.total_amount).toLocaleString()}</strong>
                                    </div>
                                </div>

                                {/* Shipping information */}
                                <div className="order-body-shipping">
                                    <h4>Recipient Details</h4>
                                    <div className="shipping-info-grid">
                                        <div className="info-detail-item">
                                            <User size={14} className="info-icon" />
                                            <div>
                                                <span>Customer</span>
                                                <strong>{order.shipping_name}</strong>
                                                <small className="email-small">{order.email}</small>
                                            </div>
                                        </div>

                                        <div className="info-detail-item">
                                            <Phone size={14} className="info-icon" />
                                            <div>
                                                <span>Contact</span>
                                                <strong>{order.phone}</strong>
                                            </div>
                                        </div>

                                        <div className="info-detail-item">
                                            <MapPin size={14} className="info-icon" />
                                            <div>
                                                <span>Delivery Address</span>
                                                <strong>{order.shipping_address}</strong>
                                            </div>
                                        </div>

                                        <div className="info-detail-item">
                                            <Truck size={14} className="info-icon" />
                                            <div>
                                                <span>Dispatch Method</span>
                                                <strong>{order.payment_method}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderPage;
