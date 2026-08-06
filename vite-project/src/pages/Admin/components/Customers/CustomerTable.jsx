import {
    MoreHorizontal,
    Mail,
    Phone
} from "lucide-react";

import "./CustomerTable.css";

function CustomerTable({  customers,onCustomerSelect }) {
        


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

                        {customers.map((customer) => (

                            <tr key={customer.id}>

                                {/* CUSTOMER */}

                                <td>

                                    <div className="customer-name-cell">

                                      <div className="customer-avatar">
                                     {customer.name
                                       .split(" ")
                                        .map(word => word[0])
                                        .join("")
                                      .slice(0, 2)
                                        .toUpperCase()
                                           }
                                          </div>

                                        <div className="customer-name-info">

                                            <strong>
                                                {customer.name}
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
                                                {customer.email}
                                            </span>
                                        </div>

                                        <div>
                                            <Phone
                                                size={13}
                                                strokeWidth={1.8}
                                            />
                                            <span>
                                                {customer.phone}
                                            </span>
                                        </div>

                                    </div>

                                </td>


                                {/* SERVICES */}

                                <td>

                                    <span className="customer-services">
                                        {customer.services}
                                    </span>

                                </td>


                                {/* JOINED */}

                                <td>

                                    <span className="customer-joined">
                                        {customer.joined}
                                    </span>

                                </td>


                                {/* STATUS */}

                                <td>

                                    <span
                                        className={`customer-status ${customer.status.toLowerCase()}`}
                                    >

                                        <span className="status-dot"></span>

                                        {customer.status}

                                    </span>

                                </td>


                                {/* ACTIONS */}

                                <td>

                                  <button
    className="customer-action-btn"
    aria-label={`View ${customer.name}`}
    onClick={() => onCustomerSelect(customer)}
>

                                        <MoreHorizontal
                                            size={18}
                                            strokeWidth={1.8}
                                        />

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>


            {/* Mobile Cards */}

            <div className="customer-mobile-list">

                {customers.map((customer) => (

                    <div
                        className="customer-mobile-card"
                        key={customer.id}
                    >

                        <div className="mobile-card-header">

                            <div className="customer-name-cell">

                               <div className="customer-avatar">
    {customer.name
        .split(" ")
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    }
</div>

                                <div className="customer-name-info">

                                    <strong>
                                        {customer.name}
                                    </strong>

                                    <span>
                                        ID #{customer.id}
                                    </span>

                                </div>

                            </div>

<button
    className="customer-action-btn"
    aria-label={`View ${customer.name}`}
    onClick={() => onCustomerSelect(customer)}
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
                                    {customer.email}
                                </span>
                            </div>

                            <div>
                                <Phone
                                    size={13}
                                    strokeWidth={1.8}
                                />

                                <span>
                                    {customer.phone}
                                </span>
                            </div>

                        </div>


                        <div className="mobile-card-details">

                            <div>
                                <span>Services</span>
                                <strong>
                                    {customer.services}
                                </strong>
                            </div>

                            <div>
                                <span>Joined</span>
                                <strong>
                                    {customer.joined}
                                </strong>
                            </div>

                            <div>

                                <span>Status</span>

                                <strong
                                    className={`customer-status ${customer.status.toLowerCase()}`}
                                >
                                    <span className="status-dot"></span>
                                    {customer.status}
                                </strong>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default CustomerTable;