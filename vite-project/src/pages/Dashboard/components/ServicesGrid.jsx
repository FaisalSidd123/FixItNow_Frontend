import React from "react";
import { ArrowRight, Clock3, BadgeCheck } from "lucide-react";
import "./ServicesGrid.css";

const ServicesGrid = ({
  services,
  selectedService,
  handleServiceSelect,
}) => {
    console.log("Services received:", services);
console.log("Selected service:", selectedService);
  return (
    <div className="services-section">


      <div className="services-grid">

        {services.map((service) => (

          <div
            key={service.id}
            className={`dashboard-service-card ${
              selectedService === service.id ? "active" : ""
            } ${service.id === "amc" ? "featured-card" : ""}`}
            onClick={() => handleServiceSelect(service.id)}
          >

            <div className="service-top">

              <div className="service-icon">
                {service.icon}
              </div>

              <span className="service-badge">
                {service.badge}
              </span>

            </div>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

            <div className="service-meta">

              <div className="meta-item">
                <Clock3 size={16} />
                <span>{service.duration}</span>
              </div>

              <div className="meta-item">
                <BadgeCheck size={16} />
                <span>{service.feature}</span>
              </div>

            </div>

            <div className="service-footer">

              <span className="service-price">
                {service.price}
              </span>

              <button className="details-btn">

                View Details

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ServicesGrid;