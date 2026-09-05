
import ServiceCards from "./ServiceCards";
import { useState ,useEffect} from "react";
import { getAllInspections } from "../../../../api/inspectionApi";
import { getAllRepairs } from "../../../../api/repairApi";
import { getAllAMCContracts } from "../../../../api/amcApi";
import ServiceRequests from "./ServiceRequests";
import ServiceRequestDetails from "./ServiceRequestDetails";
import "./ServicePage.css";

function ServicePage() {
const [selectedRequest, setSelectedRequest] = useState(null);
const [selectedService, setSelectedService] = useState(null);
const [serviceData, setServiceData] = useState({
    inspection: [],
    repair: [],
    amc: []
});

const [loading, setLoading] = useState(true);
useEffect(() => {

    const loadServices = async () => {

        try {

            setLoading(true);

            const [
                inspectionResponse,
                repairResponse,
                amcResponse
            ] = await Promise.all([
                getAllInspections(),
                getAllRepairs(),
                getAllAMCContracts()
            ]);

            setServiceData({
                inspection: inspectionResponse.data || [],
                repair: repairResponse.data || [],
                amc: amcResponse.data || []
            });

        } catch (error) {

            console.error(
                "Failed to load service requests:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    loadServices();

}, []);
    return (
        <div className="service-page">

            <div className="overview-heading">

    <div>

        <h2>Services</h2>

        <p className="content-subtitle">
            Manage and view all FixItNow service requests.
        </p>

    </div>

</div>
<ServiceCards
    onServiceSelect={(service) => {
        setSelectedService(service);
        setSelectedRequest(null);
    }}
    serviceData={serviceData}
    loading={loading}
/>
<ServiceRequests
    selectedService={selectedService}
    serviceData={serviceData}
    onRequestSelect={setSelectedRequest}
/>
<ServiceRequestDetails
    request={selectedRequest}
    service={selectedService}
    onClose={() => setSelectedRequest(null)}
/>
        </div>
    );
}

export default ServicePage;