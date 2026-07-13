import React from "react";
import { Sparkles } from "lucide-react";
import "./servicerequest.css";

const ServiceRequests = ({ serviceRequests }) => {
  return (

    <div className="service-request-section">

      <div className="request-header">
        <Sparkles size={14}/>
        <span>MY SERVICE REQUESTS</span>
      </div>

      {serviceRequests.length === 0 ? (

        <div className="empty-request">
          No service requests yet.
        </div>

      ) : (

        <div className="request-list">

          {serviceRequests.map((request)=>(

            <div
              className="request-card"
              key={request.id}
            >

              <div className="request-top">

                <h3>{request.type}</h3>

                <span className="status-badge scheduled">
                  {request.status}
                </span>

              </div>

              <div className="request-details">

                <p>Request ID: {request.id}</p>

                <p>Date: {request.date}</p>

                <p>Engineer: {request.technician}</p>

                <p>Cost: {request.cost}</p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
};

export default ServiceRequests;