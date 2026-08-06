import {
    X,
    Mail,
    Phone,
    CalendarDays,
    Wrench,
    User,
    Clock
} from "lucide-react";

import "./CustomerDetails.css";

function CustomerDetails({ customer, onClose }) {

    if (!customer) {
        return null;
    }

    return (
        <div className="customer-details-overlay" onClick={onClose}>

            <aside
                className="customer-details-drawer"
                onClick={(e) => e.stopPropagation()}
            >

                {/* HEADER */}

                <div className="customer-details-header">

                    <div>
                        <span className="customer-details-label">
                            CUSTOMER DETAILS
                        </span>

                        <h2>
                            {customer.name}
                        </h2>
                    </div>

                    <button
                        className="customer-details-close"
                        onClick={onClose}
                        aria-label="Close customer details"
                    >
                        <X size={18} />
                    </button>

                </div>


                {/* PROFILE */}

                <div className="customer-details-profile">

                    <div className="customer-details-avatar">

                        {customer.name
                            .split(" ")
                            .map(word => word[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        }

                    </div>

                    <div>

                        <strong>
                            {customer.name}
                        </strong>

                        <span>
                            Customer ID #{customer.id}
                        </span>

                    </div>

                </div>


                {/* STATUS */}

                <div className="customer-details-status">

                    <span
                        className={`customer-status ${customer.status.toLowerCase()}`}
                    >
                        <span className="status-dot"></span>
                        {customer.status}
                    </span>

                </div>


                {/* INFORMATION */}

                <div className="customer-details-section">

                    <h3>
                        Contact Information
                    </h3>

                    <div className="customer-detail-row">

                        <Mail size={16} />

                        <div>
                            <span>Email</span>
                            <strong>{customer.email}</strong>
                        </div>

                    </div>


                    <div className="customer-detail-row">

                        <Phone size={16} />

                        <div>
                            <span>Phone</span>
                            <strong>{customer.phone}</strong>
                        </div>

                    </div>

                </div>


                {/* ACCOUNT INFORMATION */}

                <div className="customer-details-section">

                    <h3>
                        Account Information
                    </h3>

                    <div className="customer-detail-row">

                        <CalendarDays size={16} />

                        <div>
                            <span>Joined</span>
                            <strong>{customer.joined}</strong>
                        </div>

                    </div>


                    <div className="customer-detail-row">

                        <Wrench size={16} />

                        <div>
                            <span>Service Requests</span>
                            <strong>{customer.services}</strong>
                        </div>

                    </div>

                </div>


                {/* ACTIVITY */}

                <div className="customer-details-section">

                    <h3>
                        Account Activity
                    </h3>

                    <div className="customer-detail-row">

                        <Clock size={16} />

                        <div>
                            <span>Last Activity</span>
                            <strong>Today</strong>
                        </div>

                    </div>

                </div>


                {/* FOOTER */}

                <div className="customer-details-footer">

                    <button className="customer-details-email">

                        <Mail size={15} />

                        Email Customer

                    </button>

                </div>

            </aside>

        </div>
    );
}

export default CustomerDetails;