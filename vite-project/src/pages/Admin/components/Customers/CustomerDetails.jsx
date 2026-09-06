import { useState, useEffect } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import {
    X,
    Mail,
    Phone,
    CalendarDays,
    Wrench,
    Clock,
    ShieldCheck,
    ShoppingBag,
    FileText,
    CheckCircle2
} from "lucide-react";

import "./CustomerDetails.css";

function CustomerDetails({ customer, onClose }) {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState("services"); // services, orders, info
    const [activity, setActivity] = useState({
        repairs: [],
        inspections: [],
        amc: [],
        orders: []
    });
    const [loadingActivity, setLoadingActivity] = useState(true);

    useEffect(() => {
        if (!customer || !currentUser) return;
        const fetchActivity = async () => {
            setLoadingActivity(true);
            try {
                const token = await currentUser.getIdToken();
                const res = await fetch(`https://fixitnowbackend-production.up.railway.app/api/users/customers/${customer.id}/details`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setActivity({
                        repairs: data.repairs || [],
                        inspections: data.inspections || [],
                        amc: data.amc || [],
                        orders: data.orders || []
                    });
                }
            } catch (err) {
                console.error("Error fetching customer activity:", err);
            } finally {
                setLoadingActivity(false);
            }
        };
        fetchActivity();
    }, [customer, currentUser]);

    if (!customer) return null;

    const name = customer.display_name || "Unnamed Customer";
    const totalServicesCount = activity.repairs.length + activity.inspections.length + activity.amc.length;

    const getInitials = (nameStr) => {
        if (!nameStr) return "CU";
        return nameStr
            .split(" ")
            .filter(Boolean)
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    return (
        <div className="customer-modal-backdrop" onClick={onClose}>
            <div className="customer-modal-box" onClick={(e) => e.stopPropagation()}>
                
                {/* MODAL HEADER */}
                <div className="customer-modal-header">
                    <div className="customer-header-left">
                        <div className="customer-modal-avatar">{getInitials(name)}</div>
                        <div>
                            <h2>{name}</h2>
                            <p className="customer-modal-sub">{customer.email || "No Email"} • ID #{customer.id}</p>
                        </div>
                    </div>
                    <button className="customer-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* MODAL NAVIGATION TABS */}
                <div className="customer-modal-tabs">
                    <button 
                        className={`modal-tab ${activeTab === "services" ? "active" : ""}`} 
                        onClick={() => setActiveTab("services")}
                    >
                        <Wrench size={16} /> Services Availed ({totalServicesCount})
                    </button>
                    <button 
                        className={`modal-tab ${activeTab === "orders" ? "active" : ""}`} 
                        onClick={() => setActiveTab("orders")}
                    >
                        <ShoppingBag size={16} /> Product Orders ({activity.orders.length})
                    </button>
                    <button 
                        className={`modal-tab ${activeTab === "info" ? "active" : ""}`} 
                        onClick={() => setActiveTab("info")}
                    >
                        <ShieldCheck size={16} /> Profile & Account Info
                    </button>
                </div>

                {/* MODAL CONTENT */}
                <div className="customer-modal-content">
                    {loadingActivity ? (
                        <div className="activity-loading">Loading customer details...</div>
                    ) : (
                        <>
                            {/* TAB 1: SERVICES AVAILED */}
                            {activeTab === "services" && (
                                <div className="services-tab-panel">
                                    {totalServicesCount === 0 ? (
                                        <div className="tab-empty">No services (Repairs, Inspections, or AMC) requested by this customer.</div>
                                    ) : (
                                        <div className="activity-cards-grid">
                                            {/* INSPECTIONS */}
                                            {activity.inspections.map((insp) => (
                                                <div key={insp.id} className="activity-item-card inspection-border">
                                                    <div className="card-top">
                                                        <span className="type-tag tag-inspection">Inspection</span>
                                                        <span className={`status-badge ${insp.status?.toLowerCase()}`}>{insp.status}</span>
                                                    </div>
                                                    <div className="card-body">
                                                        <p><strong>Property:</strong> {insp.property_type || "N/A"} ({insp.roof_type || "Roof"})</p>
                                                        <p><strong>Preferred Date:</strong> {insp.preferred_date || "N/A"} @ {insp.preferred_time || "N/A"}</p>
                                                        <p><strong>Address:</strong> {insp.street_address || insp.city || "N/A"}</p>
                                                        {insp.additional_notes && <p className="notes">"{insp.additional_notes}"</p>}
                                                    </div>
                                                    <div className="card-foot">Requested: {new Date(insp.created_at).toLocaleDateString()}</div>
                                                </div>
                                            ))}

                                            {/* REPAIRS */}
                                            {activity.repairs.map((rep) => (
                                                <div key={rep.id} className="activity-item-card repair-border">
                                                    <div className="card-top">
                                                        <span className="type-tag tag-repair">Repair ({rep.issue_category})</span>
                                                        <span className={`status-badge ${rep.status?.toLowerCase()}`}>{rep.status}</span>
                                                    </div>
                                                    <div className="card-body">
                                                        <p><strong>Problem Description:</strong> {rep.problem_description}</p>
                                                        <p><strong>Installation:</strong> {rep.installation_type || "Solar"} | <strong>Inverter:</strong> {rep.inverter_brand || "N/A"}</p>
                                                        <p><strong>Address:</strong> {rep.address || "N/A"}, {rep.city || ""}</p>
                                                        {rep.additional_notes && <p className="notes">"{rep.additional_notes}"</p>}
                                                    </div>
                                                    <div className="card-foot">Requested: {new Date(rep.created_at).toLocaleDateString()}</div>
                                                </div>
                                            ))}

                                            {/* AMC CONTRACTS */}
                                            {activity.amc.map((contract) => (
                                                <div key={contract.id} className="activity-item-card amc-border">
                                                    <div className="card-top">
                                                        <span className="type-tag tag-amc">AMC Contract ({contract.plan})</span>
                                                        <span className={`status-badge ${contract.status?.toLowerCase()}`}>{contract.status}</span>
                                                    </div>
                                                    <div className="card-body">
                                                        <p><strong>Duration:</strong> {contract.contract_duration} | <strong>Starts:</strong> {contract.contract_start_date}</p>
                                                        <p><strong>System Size:</strong> {contract.system_size || "N/A"}</p>
                                                        <p><strong>Service Address:</strong> {contract.service_address || "N/A"}</p>
                                                    </div>
                                                    <div className="card-foot">Submitted: {new Date(contract.created_at).toLocaleDateString()}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* TAB 2: PRODUCT ORDERS */}
                            {activeTab === "orders" && (
                                <div className="orders-tab-panel">
                                    {activity.orders.length === 0 ? (
                                        <div className="tab-empty">No product orders placed by this customer yet.</div>
                                    ) : (
                                        <div className="activity-cards-grid">
                                            {activity.orders.map((ord) => (
                                                <div key={ord.id} className="activity-item-card order-border">
                                                    <div className="card-top">
                                                        <span className="type-tag tag-order">Order #{ord.id.slice(0, 8).toUpperCase()}</span>
                                                        <span className={`status-badge ${ord.status?.toLowerCase()}`}>{ord.status}</span>
                                                    </div>
                                                    <div className="card-body">
                                                        <p className="order-price"><strong>Total Amount:</strong> Rs. {Number(ord.total_amount).toLocaleString()}</p>
                                                        <p><strong>Payment Method:</strong> {ord.payment_method}</p>
                                                        <p><strong>Shipping Address:</strong> {ord.shipping_address}</p>
                                                        <div className="order-items-list">
                                                            <strong>Items Purchased:</strong>
                                                            <ul>
                                                                {Array.isArray(ord.items) && ord.items.map((item, idx) => (
                                                                    <li key={idx}>{item.name} (x{item.quantity}) - Rs. {Number(item.price).toLocaleString()}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="card-foot">Ordered: {new Date(ord.created_at).toLocaleDateString()}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* TAB 3: PROFILE INFO */}
                            {activeTab === "info" && (
                                <div className="info-tab-panel">
                                    <div className="info-grid">
                                        <div className="info-card">
                                            <Mail size={16} />
                                            <div>
                                                <span>Email Address</span>
                                                <strong>{customer.email || "Not Provided"}</strong>
                                            </div>
                                        </div>
                                        <div className="info-card">
                                            <Phone size={16} />
                                            <div>
                                                <span>Phone Number</span>
                                                <strong>{customer.phone || "Not Provided"}</strong>
                                            </div>
                                        </div>
                                        <div className="info-card">
                                            <CalendarDays size={16} />
                                            <div>
                                                <span>Account Created</span>
                                                <strong>{customer.created_at ? new Date(customer.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "—"}</strong>
                                            </div>
                                        </div>
                                        <div className="info-card">
                                            <ShieldCheck size={16} />
                                            <div>
                                                <span>Role</span>
                                                <strong>{customer.role || "user"}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* MODAL FOOTER */}
                <div className="customer-modal-footer">
                    {customer.email && (
                        <button className="btn-email-customer" onClick={() => window.location.href = `mailto:${customer.email}`}>
                            <Mail size={15} /> Send Email to {customer.email}
                        </button>
                    )}
                    <button className="btn-close-modal" onClick={onClose}>Close</button>
                </div>

            </div>
        </div>
    );
}

export default CustomerDetails;