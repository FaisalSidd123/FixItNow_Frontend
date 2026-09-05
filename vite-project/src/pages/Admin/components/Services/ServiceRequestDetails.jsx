import {
    X,
    Mail,
    Phone,
    CalendarDays,
    MapPin,
    Building2,
    FileText,
    Wrench,
    Clock,
    Home,
    Zap,
    Battery,
    AlertCircle
} from "lucide-react";

import { useState, useEffect } from "react";
import { updateInspectionStatus } from "../../../../api/inspectionApi";
import { updateRepairStatus } from "../../../../api/repairApi";
import { updateAMCStatus } from "../../../../api/amcApi";
import "./ServiceRequestDetails.css";

function ServiceRequestDetails({
    request,
    service,
    onClose
}) {
    if (!request) {
        return null;
    }

    const [currentStatus, setCurrentStatus] = useState(request.status || "Pending");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (request) {
            setCurrentStatus(request.status || "Pending");
        }
    }, [request]);

    const handleStatusChange = async (newStatus) => {
        setIsUpdating(true);
        try {
            if (service === "inspection") {
                await updateInspectionStatus(request.id, newStatus);
            } else if (service === "repair") {
                await updateRepairStatus(request.id, newStatus);
            } else if (service === "amc") {
                await updateAMCStatus(request.id, newStatus);
            }
            setCurrentStatus(newStatus);
            request.status = newStatus;
        } catch (err) {
            alert("Failed to update status: " + err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const serviceNames = {
        inspection: "Inspection",
        repair: "Repair",
        amc: "AMC"
    };

    const formatValue = (value) => {
        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "—";
        }

        return String(value)
            .replaceAll("_", " ")
            .replace(/\b\w/g, char => char.toUpperCase());
    };

    const DetailItem = ({
        icon: Icon,
        label,
        value
    }) => (
        <div className="service-detail-item">

            <Icon size={15} />

            <div>
                <span>{label}</span>

                <strong>
                    {formatValue(value)}
                </strong>
            </div>

        </div>
    );

    return (
        <div className="service-details-overlay">

            <div className="service-details-panel">

                {/* HEADER */}

                <div className="service-details-header">

                    <div>
                        <span className="service-details-label">
                            {serviceNames[service]} Request
                        </span>

                        <h2>
                            {request.full_name}
                        </h2>
                    </div>

                    <button
                        className="service-details-close"
                        onClick={onClose}
                    >
                        <X size={19} />
                    </button>

                </div>


                {/* REQUEST STATUS & UPDATE SELECTOR */}
                <div className="service-details-status" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                        <span>Status: </span>
                        <strong className={`status-${currentStatus}`} style={{ marginLeft: "8px" }}>
                            {formatValue(currentStatus)}
                        </strong>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)" }}>Update: </span>
                        <select
                            value={String(currentStatus).toLowerCase()}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            disabled={isUpdating}
                            style={{
                                background: "#111827",
                                color: "#ffffff",
                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                borderRadius: "8px",
                                padding: "6px 12px",
                                fontSize: "13px",
                                cursor: "pointer"
                            }}
                        >
                            <option value="pending">Pending</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>


                {/* CONTACT INFORMATION */}

                <div className="service-details-section">

                    <h3>
                        Contact Information
                    </h3>

                    <div className="service-details-grid">

                        <DetailItem
                            icon={Mail}
                            label="Email"
                            value={request.email}
                        />

                        <DetailItem
                            icon={Phone}
                            label="Phone"
                            value={request.phone}
                        />

                    </div>

                </div>


                {/* INSPECTION */}

                {service === "inspection" && (

                    <div className="service-details-section">

                        <h3>
                            Inspection Information
                        </h3>

                        <div className="service-details-grid">

                            <DetailItem
                                icon={Home}
                                label="Property Type"
                                value={request.property_type}
                            />

                            <DetailItem
                                icon={Home}
                                label="Roof Type"
                                value={request.roof_type}
                            />

                            <DetailItem
                                icon={Building2}
                                label="Roof Access"
                                value={request.roof_access}
                            />

                            <DetailItem
                                icon={Zap}
                                label="Electricity Provider"
                                value={request.electricity_provider}
                            />

                            <DetailItem
                                icon={CalendarDays}
                                label="Preferred Date"
                                value={request.preferred_date}
                            />

                            <DetailItem
                                icon={Clock}
                                label="Preferred Time"
                                value={request.preferred_time}
                            />

                        </div>

                    </div>

                )}


                {/* REPAIR */}

                {service === "repair" && (

                    <div className="service-details-section">

                        <h3>
                            Repair Information
                        </h3>

                        <div className="service-details-grid">

                            <DetailItem
                                icon={Building2}
                                label="Installation Type"
                                value={request.installation_type}
                            />

                            <DetailItem
                                icon={Zap}
                                label="System Size"
                                value={request.system_size}
                            />

                            <DetailItem
                                icon={AlertCircle}
                                label="Issue Category"
                                value={request.issue_category}
                            />

                            <DetailItem
                                icon={AlertCircle}
                                label="Problem Started"
                                value={request.problem_started}
                            />

                            <DetailItem
                                icon={Wrench}
                                label="System Status"
                                value={request.system_status}
                            />

                            <DetailItem
                                icon={Wrench}
                                label="Inverter Brand"
                                value={request.inverter_brand}
                            />

                            <DetailItem
                                icon={AlertCircle}
                                label="Inverter Error Code"
                                value={request.inverter_error_code}
                            />

                            <DetailItem
                                icon={Battery}
                                label="Battery Installed"
                                value={
                                    request.battery_installed
                                        ? "Yes"
                                        : "No"
                                }
                            />

                            <DetailItem
                                icon={Battery}
                                label="Battery Brand"
                                value={request.battery_brand}
                            />

                            <DetailItem
                                icon={MapPin}
                                label="City"
                                value={request.city}
                            />

                            <DetailItem
                                icon={MapPin}
                                label="Address"
                                value={request.address}
                            />

                            <DetailItem
                                icon={Clock}
                                label="Preferred Time"
                                value={request.preferred_time}
                            />

                        </div>

                    </div>

                )}


                {/* AMC */}

                {service === "amc" && (

                    <div className="service-details-section">

                        <h3>
                            AMC Information
                        </h3>

                        <div className="service-details-grid">

                            <DetailItem
                                icon={Building2}
                                label="Installation Type"
                                value={request.installation_type}
                            />

                            <DetailItem
                                icon={Zap}
                                label="System Size"
                                value={request.system_size}
                            />

                            <DetailItem
                                icon={FileText}
                                label="Plan"
                                value={request.plan}
                            />

                            <DetailItem
                                icon={FileText}
                                label="Contract Duration"
                                value={request.contract_duration}
                            />

                            <DetailItem
                                icon={CalendarDays}
                                label="Contract Start Date"
                                value={request.contract_start_date}
                            />

                            <DetailItem
                                icon={MapPin}
                                label="City"
                                value={request.city}
                            />

                            <DetailItem
                                icon={MapPin}
                                label="Service Address"
                                value={request.service_address}
                            />

                           
                            <DetailItem
                                icon={CalendarDays}
                                label="Preferred Day"
                                value={request.preferred_day}
                            />

                            <DetailItem
                                icon={Clock}
                                label="Preferred Time"
                                value={request.preferred_time}
                            />

                        </div>

                    </div>

                )}


                {/* ADDITIONAL NOTES */}

                {request.additional_notes && (

                    <div className="service-details-section">

                        <h3>
                            Additional Notes
                        </h3>

                        <p className="service-details-notes">
                            {request.additional_notes}
                        </p>

                    </div>

                )}


                {/* REQUEST DATE */}

                <div className="service-details-footer">

                    <span>
                        Request submitted
                    </span>

                    <strong>
                        {new Date(
                            request.created_at
                        ).toLocaleString()}
                    </strong>

                </div>

            </div>

        </div>
    );
}

export default ServiceRequestDetails;