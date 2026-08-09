import {
    X,
    Mail,
    Phone,
    CalendarDays,
    Wrench,
    Clock,
    ShieldCheck
} from "lucide-react";

import "./CustomerDetails.css";

function CustomerDetails({ customer, onClose }) {

    if (!customer) {
        return null;
    }


    const name =
        customer.display_name || "Unnamed Customer";


    const getInitials = (name) => {

        return name
            .split(" ")
            .filter(Boolean)
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

    };


    const formatDate = (date) => {

        if (!date) return "—";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
        });

    };


    const formatDateTime = (date) => {

        if (!date) return "—";

        return new Date(date).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        });

    };


    return (

        <div
            className="customer-details-overlay"
            onClick={onClose}
        >

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
                            {name}
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

                        {getInitials(name)}

                    </div>


                    <div>

                        <strong>
                            {name}
                        </strong>

                        <span>
                            Customer ID #{customer.id}
                        </span>

                    </div>

                </div>


                {/* STATUS */}

                <div className="customer-details-status">

                    <span className="customer-status active">

                        <span className="status-dot"></span>

                        Active

                    </span>

                </div>


                {/* CONTACT INFORMATION */}

                <div className="customer-details-section">

                    <h3>
                        Contact Information
                    </h3>


                    <div className="customer-detail-row">

                        <Mail size={16} />

                        <div>

                            <span>
                                Email
                            </span>

                            <strong>
                                {customer.email || "—"}
                            </strong>

                        </div>

                    </div>


                    <div className="customer-detail-row">

                        <Phone size={16} />

                        <div>

                            <span>
                                Phone
                            </span>

                            <strong>
                                Not provided
                            </strong>

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

                            <span>
                                Joined
                            </span>

                            <strong>
                                {formatDate(customer.created_at)}
                            </strong>

                        </div>

                    </div>


                    <div className="customer-detail-row">

                        <ShieldCheck size={16} />

                        <div>

                            <span>
                                Account Role
                            </span>

                            <strong>
                                {customer.role || "user"}
                            </strong>

                        </div>

                    </div>


                    <div className="customer-detail-row">

                        <Wrench size={16} />

                        <div>

                            <span>
                                Service Requests
                            </span>

                            <strong>
                                —
                            </strong>

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

                            <span>
                                Last Updated
                            </span>

                            <strong>
                                {formatDateTime(customer.updated_at)}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* FOOTER */}

                <div className="customer-details-footer">

                    <button
                        className="customer-details-email"
                        onClick={() => {
                            if (customer.email) {
                                window.location.href =
                                    `mailto:${customer.email}`;
                            }
                        }}
                    >

                        <Mail size={15} />

                        Email Customer

                    </button>

                </div>

            </aside>

        </div>

    );

}

export default CustomerDetails;