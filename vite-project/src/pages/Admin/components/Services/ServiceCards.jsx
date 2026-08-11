import {
    ClipboardCheck,
    Wrench,
    FileCheck
} from "lucide-react";

import "./ServiceCards.css";

function ServiceCards({
    onServiceSelect,
    serviceData,
    loading
}) {

    const services = [
        {
            id: "inspection",
            name: "Inspection",
            description: "Professional solar system inspection",
            icon: ClipboardCheck
        },
        {
            id: "repair",
            name: "Repair",
            description: "Solar system repair and maintenance",
            icon: Wrench
        },
        {
            id: "amc",
            name: "AMC",
            description: "Annual maintenance contract services",
            icon: FileCheck
        }
    ];

    return (
        <div className="service-cards">

            {services.map((service) => {

                const Icon = service.icon;

                const requestCount =
                    serviceData[service.id]?.length || 0;

                return (
                    <button
                        key={service.id}
                        className="service-card"
                        onClick={() =>
                            onServiceSelect(service.id)
                        }
                    >

                        <div className="service-card-icon">

                            <Icon
                                size={24}
                                strokeWidth={1.7}
                            />

                        </div>

                        <div className="service-card-content">

                            <h2>
                                {service.name}
                            </h2>

                            <p>
                                {service.description}
                            </p>

                           <div className="service-card-footer">

    <span className="service-request-count">
        {loading
            ? "Loading..."
            : `${requestCount} Request${
                requestCount !== 1
                    ? "s"
                    : ""
            }`
        }
    </span>

    <span className="service-card-link">
        View →
    </span>

</div>

                        </div>

                    </button>
                );

            })}

        </div>
    );
}

export default ServiceCards;