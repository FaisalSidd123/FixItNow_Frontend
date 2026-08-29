import React, { useState } from "react";
import {
  Sparkles,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Home,
  Zap,
  Wrench,
  Battery,
  FileText,
  Image,
  Video,
  ShieldCheck
} from "lucide-react";

import "./servicerequest.css";

const ServiceRequests = ({ serviceRequests = [] }) => {

  const [selectedRequest, setSelectedRequest] = useState(null);


  const formatValue = (value) => {

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "Not provided";
    }

    return value;
  };


  const formatDate = (date) => {

    if (!date) {
      return "Not provided";
    }

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );
  };


  const formatStatus = (status) => {

    if (!status) {
      return "Pending";
    }

    return status
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };


  const getStatusClass = (status) => {

    return `status-badge ${
      status || "pending"
    }`;
  };


  const renderInspectionDetails = (request) => (

    <>
      <DetailSection
        title="Personal Information"
        icon={<User size={16} />}
      >

        <DetailItem
          label="Full Name"
          value={request.full_name}
        />

        <DetailItem
          label="Phone"
          value={request.phone}
        />

        <DetailItem
          label="Email"
          value={request.email}
        />

      </DetailSection>


      <DetailSection
        title="Property Information"
        icon={<Home size={16} />}
      >

        <DetailItem
          label="Property Type"
          value={request.property_type}
        />

        <DetailItem
          label="Street Address"
          value={request.street_address}
        />

        <DetailItem
          label="City"
          value={request.city}
        />

        <DetailItem
          label="Province / State"
          value={request.province}
        />

        <DetailItem
          label="Postal Code"
          value={request.postal_code}
        />

      </DetailSection>


      <DetailSection
        title="Roof Information"
        icon={<Home size={16} />}
      >

        <DetailItem
          label="Roof Type"
          value={request.roof_type}
        />

        <DetailItem
          label="Roof Access"
          value={request.roof_access}
        />

      </DetailSection>


      <DetailSection
        title="Electricity Information"
        icon={<Zap size={16} />}
      >

        <DetailItem
          label="Electricity Provider"
          value={request.electricity_provider}
        />

        {request.electricity_bill_url && (

          <div className="detail-item">

            <span>Electricity Bill</span>

            <a
              href={request.electricity_bill_url}
              target="_blank"
              rel="noopener noreferrer"
              className="document-link"
            >
              <FileText size={15} />
              View Electricity Bill
            </a>

          </div>

        )}

      </DetailSection>


      <DetailSection
        title="Preferred Schedule"
        icon={<Calendar size={16} />}
      >

        <DetailItem
          label="Preferred Date"
          value={formatDate(request.preferred_date)}
        />

        <DetailItem
          label="Preferred Time"
          value={request.preferred_time}
        />

      </DetailSection>


      <DetailSection
        title="Additional Information"
        icon={<FileText size={16} />}
      >

        <DetailItem
          label="Additional Notes"
          value={request.additional_notes}
        />

      </DetailSection>
    </>

  );


  const renderRepairDetails = (request) => (

    <>

      <DetailSection
        title="Personal Information"
        icon={<User size={16} />}
      >

        <DetailItem
          label="Full Name"
          value={request.full_name}
        />

        <DetailItem
          label="Phone"
          value={request.phone}
        />

        <DetailItem
          label="Email"
          value={request.email}
        />

      </DetailSection>


      <DetailSection
        title="Solar System Information"
        icon={<Zap size={16} />}
      >

        <DetailItem
          label="Installation Type"
          value={request.installation_type}
        />

        <DetailItem
          label="System Size"
          value={request.system_size}
        />

        <DetailItem
          label="System Status"
          value={request.system_status}
        />

      </DetailSection>


      <DetailSection
        title="Problem Information"
        icon={<Wrench size={16} />}
      >

        <DetailItem
          label="Issue Category"
          value={request.issue_category}
        />

        <DetailItem
          label="Problem Description"
          value={request.problem_description}
        />

        <DetailItem
          label="Problem Started"
          value={request.problem_started}
        />

      </DetailSection>


      <DetailSection
        title="Inverter Information"
        icon={<Zap size={16} />}
      >

        <DetailItem
          label="Inverter Brand"
          value={request.inverter_brand}
        />

        <DetailItem
          label="Error Code"
          value={request.inverter_error_code}
        />

      </DetailSection>


      <DetailSection
        title="Battery Information"
        icon={<Battery size={16} />}
      >

        <DetailItem
          label="Battery Installed"
          value={
            request.battery_installed === true
              ? "Yes"
              : request.battery_installed === false
              ? "No"
              : "Not provided"
          }
        />

        <DetailItem
          label="Battery Brand"
          value={request.battery_brand}
        />

        <DetailItem
          label="Battery Issue"
          value={request.battery_issue_description}
        />

      </DetailSection>


      <DetailSection
        title="Service Location"
        icon={<MapPin size={16} />}
      >

        <DetailItem
          label="Address"
          value={request.address}
        />

        <DetailItem
          label="City"
          value={request.city}
        />

        <DetailItem
          label="Preferred Time"
          value={request.preferred_time}
        />

      </DetailSection>


      <DetailSection
        title="Additional Information"
        icon={<FileText size={16} />}
      >

        <DetailItem
          label="Additional Notes"
          value={request.additional_notes}
        />

      </DetailSection>


      {(request.photo_urls?.length > 0 ||
        request.video_url) && (

        <DetailSection
          title="Uploaded Media"
          icon={<Image size={16} />}
        >

          {request.photo_urls?.length > 0 && (

            <div className="uploaded-media">

              {request.photo_urls.map(
                (url, index) => (

                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="media-link"
                  >
                    <Image size={15} />
                    View Photo {index + 1}
                  </a>

                )
              )}

            </div>

          )}


          {request.video_url && (

            <a
              href={request.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="media-link"
            >
              <Video size={15} />
              View Video
            </a>

          )}

        </DetailSection>

      )}

    </>

  );


  const renderAMCDetails = (request) => (

    <>

      <DetailSection
        title="Personal Information"
        icon={<User size={16} />}
      >

        <DetailItem
          label="Full Name"
          value={request.full_name}
        />

        <DetailItem
          label="Phone"
          value={request.phone}
        />

        <DetailItem
          label="Email"
          value={request.email}
        />

      </DetailSection>


      <DetailSection
        title="Solar System Information"
        icon={<Zap size={16} />}
      >

        <DetailItem
          label="Installation Type"
          value={request.installation_type}
        />

        <DetailItem
          label="System Size"
          value={request.system_size}
        />

      </DetailSection>


      <DetailSection
        title="AMC Plan"
        icon={<ShieldCheck size={16} />}
      >

        <DetailItem
          label="Plan"
          value={request.plan}
        />

        <DetailItem
          label="Contract Duration"
          value={request.contract_duration}
        />

        <DetailItem
          label="Contract Start Date"
          value={formatDate(
            request.contract_start_date
          )}
        />

      </DetailSection>


      <DetailSection
        title="Service Location"
        icon={<MapPin size={16} />}
      >

        <DetailItem
          label="Service Address"
          value={request.service_address}
        />

        <DetailItem
          label="City"
          value={request.city}
        />

      </DetailSection>


      <DetailSection
        title="Preferred Schedule"
        icon={<Calendar size={16} />}
      >

        <DetailItem
          label="Preferred Day"
          value={request.preferred_day}
        />

        <DetailItem
          label="Preferred Time"
          value={request.preferred_time}
        />

      </DetailSection>


      <DetailSection
        title="Additional Information"
        icon={<FileText size={16} />}
      >

        <DetailItem
          label="Additional Notes"
          value={request.additional_notes}
        />

      </DetailSection>

    </>

  );


  const renderRequestDetails = (request) => {

    if (request.type === "Inspection Request") {
      return renderInspectionDetails(request);
    }

    if (request.type === "Repair Request") {
      return renderRepairDetails(request);
    }

    if (request.type === "AMC Contract") {
      return renderAMCDetails(request);
    }

    return null;
  };


  return (

    <div className="service-request-section">

      <div className="request-header">
        <Sparkles size={14} />
        <span>MY SERVICE REQUESTS</span>
      </div>


      {serviceRequests.length === 0 ? (

        <div className="empty-request">
          No service requests yet.
        </div>

      ) : (

        <div className="request-list">

          {serviceRequests.map((request) => (

            <div
              className="request-card"
              key={request.id}
              onClick={() =>
                setSelectedRequest(request)
              }
            >

              <div className="request-top">

                <h3>{request.type}</h3>

                <span
                  className={getStatusClass(
                    request.status
                  )}
                >
                  {formatStatus(
                    request.status
                  )}
                </span>

              </div>


              <div className="request-details">

                <p>
                  Request ID: {request.id}
                </p>

                <p>
                  Submitted:{" "}
                  {formatDate(
                    request.created_at ||
                    request.date
                  )}
                </p>

                <p>
                  Status:{" "}
                  {formatStatus(
                    request.status
                  )}
                </p>

              </div>


              <div className="request-view-details">
                View Full Details →
              </div>

            </div>

          ))}

        </div>

      )}


      {/* =========================
          FULL DETAILS MODAL
      ========================= */}

      {selectedRequest && (

        <div
          className="request-modal-overlay"
          onClick={() =>
            setSelectedRequest(null)
          }
        >

          <div
            className="request-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="request-modal-header">

              <div>

                <span className="modal-label">
                  SERVICE REQUEST
                </span>

                <h2>
                  {selectedRequest.type}
                </h2>

                <p>
                  Request ID:{" "}
                  {selectedRequest.id}
                </p>

              </div>


              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedRequest(null)
                }
              >
                <X size={20} />
              </button>

            </div>


            <div className="modal-status-row">

              <span
                className={getStatusClass(
                  selectedRequest.status
                )}
              >
                {formatStatus(
                  selectedRequest.status
                )}
              </span>

              <span>
                Submitted{" "}
                {formatDate(
                  selectedRequest.created_at ||
                  selectedRequest.date
                )}
              </span>

            </div>


            <div className="request-full-details">

              {renderRequestDetails(
                selectedRequest
              )}

            </div>


            <div className="request-modal-footer">

              <button
                className="modal-close-action"
                onClick={() =>
                  setSelectedRequest(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
};


/* =========================================
   DETAIL COMPONENTS
========================================= */

const DetailSection = ({
  title,
  icon,
  children
}) => (

  <div className="detail-section">

    <div className="detail-section-header">

      {icon}

      <h3>{title}</h3>

    </div>

    <div className="detail-grid">
      {children}
    </div>

  </div>

);


const DetailItem = ({
  label,
  value
}) => (

  <div className="detail-item">

    <span className="detail-label">
      {label}
    </span>

    <strong className="detail-value">
      {formatDisplayValue(value)}
    </strong>

  </div>

);


const formatDisplayValue = (value) => {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Not provided";
  }

  return String(value)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

};


export default ServiceRequests;