import {
    Users,
    Mail,
    Phone,
    CalendarDays,
    ChevronRight
} from "lucide-react";

import "./ServiceRequests.css";

function ServiceRequests({
    selectedService,
    serviceData,
    onRequestSelect
}) {

    if (!selectedService) {
        return null;
    }

    const requests =
        serviceData[selectedService] || [];

    const serviceNames = {
        inspection: "Inspection",
        repair: "Repair",
        amc: "AMC"
    };

    return (
        <section className="service-requests">

            <div className="service-requests-header">

                <div>
                    <h2>
                        {serviceNames[selectedService]} Requests
                    </h2>

                    <p>
                        Customers who requested this service
                    </p>
                </div>

                <div className="service-requests-count">
                    <Users size={16} />
                    <span>
                        {requests.length}
                    </span>
                </div>

            </div>

            {requests.length === 0 ? (

                <div className="service-empty-state">

                    <Users size={32} />

                    <h3>
                        No requests yet
                    </h3>

                    <p>
                        No customers have requested this
                        service yet.
                    </p>

                </div>

            ) : (

                <div className="service-request-list">

                    {/* TABLE HEADER */}

                    <div className="service-request-table-header">

                        <span>
                            Customer
                        </span>

                        <span>
                            Contact
                        </span>

                        <span>
                            Requested
                        </span>

                        <span>
                        </span>

                    </div>

                    {/* REQUESTS */}

                    {requests.map((request) => (

                        <button
                            className="service-request-row"
                            key={request.id}
                          onClick={() => {
    console.log("SELECTED SERVICE REQUEST:", request);
    onRequestSelect(request);
}}
                        >

                            <div className="request-customer">

                                <div className="service-request-avatar">
                                    {request.full_name
                                        ?.charAt(0)
                                        ?.toUpperCase()
                                    }
                                </div>

                                <div>
                                    <h3>
                                        {request.full_name}
                                    </h3>

                                    <span>
                                        Customer
                                    </span>
                                </div>

                            </div>

                            <div className="request-contact">

                                <span>
                                    <Mail size={14} />
                                    {request.email}
                                </span>

                                <span>
                                    <Phone size={14} />
                                    {request.phone}
                                </span>

                            </div>

                            <div className="request-date">

                                <CalendarDays size={14} />

                                <span>
                                    {new Date(
                                        request.created_at
                                    ).toLocaleDateString()}
                                </span>

                            </div>

                            <div className="request-arrow">

                                <ChevronRight
                                    size={18}
                                />

                            </div>

                        </button>

                    ))}

                </div>

            )}

        </section>
    );
}

export default ServiceRequests;