import {
    MoreHorizontal,
    Mail,
    Phone
} from "lucide-react";

import "./CustomerTable.css";

function CustomerTable({ customers, onCustomerSelect }) {

    const getInitials = (name) => {

        if (!name) return "CU";

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


    return (

        <div className="customer-table-container">

            {/* Desktop Table */}

            <div className="customer-table-wrapper">

                <table className="customer-table">

                    <thead>

                        <tr>

                            <th>Customer</th>

                            <th>Contact</th>

                            <th>Services</th>

                            <th>Joined</th>

                            <th>Status</th>

                            <th></th>

                        </tr>

                    </thead>


                    <tbody>

                        {customers.map((customer) => {

                            const name =
                                customer.display_name || "Unnamed Customer";

                            return (

                                <tr key={customer.id}>

                                    {/* CUSTOMER */}

                                    <td>

                                        <div className="customer-name-cell">

                                            <div className="customer-avatar">

                                                {getInitials(name)}

                                            </div>


                                            <div className="customer-name-info">

                                                <strong>
                                                    {name}
                                                </strong>

                                                <span>
                                                    ID #{customer.id}
                                                </span>

                                            </div>

                                        </div>

                                    </td>


                                    {/* CONTACT */}

                                    <td>

                                        <div className="customer-contact">

                                            <div>

                                                <Mail
                                                    size={13}
                                                    strokeWidth={1.8}
                                                />

                                                <span>
                                                    {customer.email || "—"}
                                                </span>

                                            </div>


                                            <div>

                                                <Phone
                                                    size={13}
                                                    strokeWidth={1.8}
                                                />

                                                <span>
                                                    {customer.phone || "Not provided"}
                                                </span>

                                            </div>

                                        </div>

                                    </td>


                                    {/* SERVICES */}

                                    <td>

                                        <span className="customer-services">

                                            —

                                        </span>

                                    </td>


                                    {/* JOINED */}

                                    <td>

                                        <span className="customer-joined">

                                            {formatDate(customer.created_at)}

                                        </span>

                                    </td>


                                    {/* STATUS */}

                                    <td>

                                        <span className="customer-status active">

                                            <span className="status-dot"></span>

                                            Active

                                        </span>

                                    </td>


                                    {/* ACTION */}

                                    <td>

                                        <button
                                            className="customer-action-btn"
                                            aria-label={`View ${name}`}
                                            onClick={() =>
                                                onCustomerSelect(customer)
                                            }
                                        >

                                            <MoreHorizontal
                                                size={18}
                                                strokeWidth={1.8}
                                            />

                                        </button>

                                    </td>

                                </tr>

                            );

                        })}

                    </tbody>

                </table>

            </div>


            {/* Mobile Cards */}

            <div className="customer-mobile-list">

                {customers.map((customer) => {

                    const name =
                        customer.display_name || "Unnamed Customer";

                    return (

                        <div
                            className="customer-mobile-card"
                            key={customer.id}
                        >

                            <div className="mobile-card-header">

                                <div className="customer-name-cell">

                                    <div className="customer-avatar">

                                        {getInitials(name)}

                                    </div>


                                    <div className="customer-name-info">

                                        <strong>
                                            {name}
                                        </strong>

                                        <span>
                                            ID #{customer.id}
                                        </span>

                                    </div>

                                </div>


                                <button
                                    className="customer-action-btn"
                                    aria-label={`View ${name}`}
                                    onClick={() =>
                                        onCustomerSelect(customer)
                                    }
                                >

                                    <MoreHorizontal
                                        size={18}
                                        strokeWidth={1.8}
                                    />

                                </button>

                            </div>


                            <div className="mobile-card-contact">

                                <div>

                                    <Mail
                                        size={13}
                                        strokeWidth={1.8}
                                    />

                                    <span>
                                        {customer.email || "—"}
                                    </span>

                                </div>


                                <div>

                                    <Phone
                                        size={13}
                                        strokeWidth={1.8}
                                    />

                                    <span>
                                        {customer.phone || "Not provided"}
                                    </span>

                                </div>

                            </div>


                            <div className="mobile-card-details">

                                <div>

                                    <span>Services</span>

                                    <strong>
                                        —
                                    </strong>

                                </div>


                                <div>

                                    <span>Joined</span>

                                    <strong>
                                        {formatDate(customer.created_at)}
                                    </strong>

                                </div>


                                <div>

                                    <span>Status</span>

                                    <strong className="customer-status active">

                                        <span className="status-dot"></span>

                                        Active

                                    </strong>

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}

export default CustomerTable;