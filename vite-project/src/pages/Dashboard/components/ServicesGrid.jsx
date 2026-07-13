import React from "react";
import "./ServicesGrid.css";

const ServicesGrid = ({
    services,
    selectedService,
    handleServiceSelect
}) => {

    return (

        <div className="services-grid">

            {services.map((service)=>(

                <div
                    key={service.id}
                    className={`service-card ${
                        selectedService===service.id ? "active":""
                    }`}
                    onClick={()=>handleServiceSelect(service.id)}
                >

                    <div className="service-icon">
                        {service.icon}
                    </div>

                    <div className="service-info">

                        <h3>{service.title}</h3>

                        <p>{service.description}</p>

                        <span className="service-price">
                            {service.price}
                        </span>

                    </div>

                </div>

            ))}

        </div>

    );

};

export default ServicesGrid;