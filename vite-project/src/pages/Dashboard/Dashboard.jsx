import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doSignOut } from '../../firebase/auth';
import ServicesGrid from "./components/ServicesGrid";
import ServiceDetails from "./components/ServiceDetails";
import InspectionForm from "./components/inspectionform";
import ServiceRequests from "./components/servicerequest";
import BookingConfirmation from "./components/BookingConfirmation";
import RepairForm from "./components/repairform";
import AMCForm from "./components/AMCform";
import AMCConfirmation from "./components/AMCConfirmation";
import { useEffect } from "react";
import { submitInspection } from "../../api/inspectionApi";
import { submitRepair } from '../../api/repairApi';
import { submitAmc } from "../../api/amcApi";
import { getRepairs } from "../../api/repairApi";
import { getInspections } from "../../api/inspectionApi";
import { getAMCs,submitAMC } from "../../api/amcApi";

// import AMCPlans from "./components/AMCPlans";

import {
  Sun,
  Battery,
  Zap,
  TrendingUp,
  Cpu,
  LogOut,
  CheckCircle,
  Calendar,
  Wrench,
  Clock,
  CalendarRange,
  User,
  AlertCircle,
  Sparkles,
    Search,
  ShieldCheck,
  ArrowRight,
  Clock3,

} from 'lucide-react';
import './Dashboard.css';


const Dashboard = () => {
  // const { currentUser } = useAuth();
const { currentUser, loading } = useAuth();
  const navigate = useNavigate();


const [serviceRequests, setServiceRequests] = useState([]);

const [amcContracts, setAmcContracts] = useState([]);

useEffect(() => {

  const fetchRequests = async () => {

    try {

   const repairResponse = await getRepairs();

const inspectionResponse = await getInspections();



const amcResponse = await getAMCs();


// Format repair requests
const formattedRepairs = (repairResponse?.data || []).map((request) => ({
  id: request.id,
  type: "Repair Request",
  date: request.created_at,
  status: request.status || "Pending",
  technician: "Assigning (Pending)",
  cost: "Not Estimated",
}));

// Format inspection requests
const formattedInspections = (inspectionResponse?.data || []).map((request) => ({
  id: request.id,
  type: "Inspection Request",
  date: request.created_at,
  status: request.status || "Pending",
  technician: "Assigning (Pending)",
  cost: "Not Estimated",
}));

const formattedAMCs = (amcResponse?.data || []).map((contract) => ({
  id: contract.id,
  type: "AMC Contract",
  plan: contract.plan || "Standard",
  date: contract.contract_start_date || contract.start_date || contract.created_at,
  status: contract.status || "Active",
  technician: "Assigned Later",
  cost: "Included in Plan",
}));

setServiceRequests([...formattedRepairs, ...formattedInspections]);
setAmcContracts(formattedAMCs);

if (formattedAMCs.length > 0) {
  const latestContract = formattedAMCs[0];
  setActiveAMC((prev) =>
    prev || {
      plan: latestContract.plan,
      status: latestContract.status,
      startDate: latestContract.date,
      nextMaintenance: "To be Scheduled",
      visits:
        latestContract.plan?.toLowerCase() === "premium"
          ? "4 Visits / Year"
          : latestContract.plan?.toLowerCase() === "basic"
          ? "2 Visits / Year"
          : "Customized",
    }
  );
} else {
  setActiveAMC(null);
}
    } catch(error) {

      console.log(error);

    }

  };


  fetchRequests();


}, []);
  // Booking form states
  const [serviceType, setServiceType] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
const [selectedService, setSelectedService] = useState(null);
const [latestBooking, setLatestBooking] = useState(null);
const [dashboardView, setDashboardView] = useState("services");
console.log("Dashboard View:", dashboardView);
console.log("Selected Service:", selectedService);
useEffect(()=>{



},[]);
const [amcActivated,setAmcActivated] = useState(false);

const [activeAMC, setActiveAMC] = useState(null);

const [bookingData, setBookingData] = useState({

  // Personal Information
  name: currentUser?.displayName || '',
  phone: '',
  email: currentUser?.email || '',


  // Property Information
  propertyType: '',
  streetAddress: '',
  city: '',
  province: '',
  postalCode: '',
  


  // Roof Information
  roofType: '',
  floors: '',
  roofAccess: '',


  // Electricity Information
  electricityBill: '',
  electricityProvider: '',
  electricityBillFile: null,


  // Schedule
  preferredDate: '',
  preferredTime: '',


  // Photos
  propertyPhotos: [],


  // Notes
  notes: '',
// AMC form 
  amcPlan: "",

  startDate: "",

address: "",

location: "",

preferredDay: "",

preferredTime: "",


  // Terms
  informationConfirmed: false,
  termsAccepted: false,
installationType:"",
systemSize:"",
amcPlan:"",
startDate:"",
address:"",
city:"",
location:"",
preferredDay:"",
preferredTime:"",

  // Repair Details

installation:'',
installationType:'',
systemSize:'',
issueCategory:'',
problemDescription:'',
problemStarted:'',
systemStatus:'',
inverterBrand:'',
errorCode:'',
batteryInstalled:'',
batteryBrand:'',
batteryIssue:'',
serviceAddress:'',
city:'',
preferredTime:'',
additionalNotes:'',
images:[],
video:null

});



const handleBookingChange = (e) => {
  const { name, value, type, files } = e.target;

  setBookingData(prev => ({
    ...prev,
 [name]:
  type === "checkbox"
    ? e.target.checked
    : type === "file"
      ? (name === "images" ? Array.from(files) : files[0])
      : value
  }));
};

 const handleSubmitBooking = async (e) => {
    e.preventDefault();

  try {

    if (selectedService === "inspection") {

    
const inspectionData = new FormData();

inspectionData.append(
  "full_name",
  bookingData.name
);

inspectionData.append(
  "phone",
  bookingData.phone
);

inspectionData.append(
  "email",
  bookingData.email
);

inspectionData.append(
  "property_type",
  bookingData.propertyType
);

inspectionData.append(
  "roof_type",
  bookingData.roofType
);

inspectionData.append(
  "roof_access",
  bookingData.roofAccess
);


inspectionData.append(
  "electricity_provider",
  bookingData.electricityProvider
);


inspectionData.append(
  "preferred_date",
  bookingData.preferredDate
);

inspectionData.append(
  "preferred_time",
  bookingData.preferredTime
);


inspectionData.append(
  "additional_notes",
  bookingData.notes
);


inspectionData.append(
  "info_confirmed",
  bookingData.informationConfirmed
);


inspectionData.append(
  "terms_agreed",
  bookingData.termsAccepted
);


// Upload file
inspectionData.append(
    "media",
    bookingData.electricityBillFile
);

// Optional frontend validation
if (!bookingData.name || !bookingData.phone || !bookingData.preferredDate) {
  alert("Missing required fields");
  return;
}

console.log(bookingData.electricityBillFile);
      await submitInspection(inspectionData);

    }

    else if (selectedService === "repair") {
console.log("BOOKING DATA:", bookingData);
console.log("PROBLEM STARTED STATE:", bookingData.problemStarted);



const repairData = new FormData();


repairData.append(
  "full_name",
  bookingData.name
);

repairData.append(
  "phone",
  bookingData.phone
);

repairData.append(
  "email",
  bookingData.email
);


repairData.append(
  "installation_type",
  bookingData.installationType
);

repairData.append(
  "system_size",
  bookingData.systemSize
);


repairData.append(
  "issue_category",
  bookingData.issueCategory
);

repairData.append(
  "problem_description",
  bookingData.problemDescription
);

repairData.append(
  "problem_started",
  bookingData.problemStarted
);

repairData.append(
  "system_status",
  bookingData.systemStatus
);


repairData.append(
  "inverter_brand",
  bookingData.inverterBrand
);

repairData.append(
  "inverter_error_code",
  bookingData.errorCode
);


repairData.append(
  "battery_installed",
  bookingData.batteryInstalled
);

repairData.append(
  "battery_brand",
  bookingData.batteryBrand
);

repairData.append(
  "battery_issue_description",
  bookingData.batteryIssue
);


repairData.append(
  "address",
  bookingData.serviceAddress
);

repairData.append(
  "city",
  bookingData.city
);


repairData.append(
  "preferred_time",
  bookingData.preferredTime
);


repairData.append(
  "additional_notes",
  bookingData.additionalNotes
);


repairData.append(
  "info_confirmed",
  bookingData.informationConfirmed
);


repairData.append(
  "charges_may_apply_agreed",
  bookingData.termsAccepted
);
if (bookingData.images) {

  bookingData.images.forEach((image)=>{

    repairData.append(
      "images",
      image
    );

  });

}
if (bookingData.video) {

  repairData.append(
    "video",
    bookingData.video
  );

}

      if (
  !bookingData.name ||
  !bookingData.phone ||
  !bookingData.email ||
  !bookingData.issueCategory ||
  !bookingData.problemDescription ||
  !bookingData.serviceAddress ||
  !bookingData.preferredTime
) {
  alert("Missing required fields");
  return;
}

for (let pair of repairData.entries()) {
  console.log(pair[0], pair[1]);
}
      // await submitRepair(repairData);
      const response = await submitRepair(repairData);


setLatestBooking({
    type:"Repair Request",
    id:response.data.id,
    date:response.data.created_at,
    status:response.data.status || "Pending",
    technician:"Assigning (Pending)",
    cost:"Not Estimated"
});


setDashboardView("serviceRequests");
    }

    else if (selectedService === "amc") {

      const amcData = {
  full_name: bookingData.name,
  phone: bookingData.phone,
  email: bookingData.email,

  installation_type: bookingData.installationType,
  system_size: bookingData.systemSize,

  plan: bookingData.amcPlan.toLowerCase(),

  contract_duration: "12 Months",

  contract_start_date: bookingData.startDate,

  service_address: bookingData.address,
  city: bookingData.city,

  preferred_day: bookingData.preferredDay,
  preferred_time: bookingData.preferredTime,

  additional_notes: bookingData.notes,

  info_confirmed: bookingData.informationConfirmed,
  terms_agreed: bookingData.termsAccepted,
  charges_understood: bookingData.chargesUnderstood
};

console.log(amcData);

const response = await submitAMC(amcData);


console.log("AMC SAVED:", response);

const savedContract = response?.data || {
  plan: amcData.plan,
  status: "Active",
  contract_start_date: amcData.contract_start_date,
};

setAmcContracts((prev) => [
  {
    id: savedContract.id,
    type: "AMC Contract",
    plan: savedContract.plan || "Standard",
    date: savedContract.contract_start_date || savedContract.start_date || bookingData.startDate,
    status: savedContract.status || "Active",
    technician: "Assigned Later",
    cost: "Included in Plan",
  },
  ...prev,
]);

setActiveAMC({
  plan: savedContract.plan || bookingData.amcPlan,
  status: savedContract.status || "Active",
  startDate: savedContract.contract_start_date || bookingData.startDate,
  nextMaintenance: "To be Scheduled",
  visits:
    (savedContract.plan || bookingData.amcPlan || "").toLowerCase() === "premium"
      ? "4 Visits / Year"
      : (savedContract.plan || bookingData.amcPlan || "").toLowerCase() === "basic"
      ? "2 Visits / Year"
      : "Customized",
});

setDashboardView("amcConfirmation");

    }
  
  } catch (error) {

    console.log(error);
    alert(error.message);
    return;

  }

 }


const handleServiceSelect = (id)=>{

setSelectedService(id);

if(id === "amc"){
    setDashboardView("amcplans");
}
else{
    setDashboardView("details");
}
}

// const [serviceRequests, setServiceRequests] = useState([]);
  // Availed services state
  const [availedServices, setAvailedServices] = useState([
    {
      id: 'SRV-9014',
      type: 'Battery Thermal Tuning',
      date: '2026-06-12',
      status: 'Completed',
      technician: 'Faisal Kamal',
      cost: '$140'
    },
    {
      id: 'SRV-8942',
      type: 'Inverter Diagnostic Sweep',
      date: '2026-05-28',
      status: 'Completed',
      technician: 'Kamran Shah',
      cost: '$120'
    },
    {
      id: 'SRV-8821',
      type: 'Thermal Panel Washing',
      date: '2026-04-15',
      status: 'Completed',
      technician: 'Zainab Ali',
      cost: '$85'
    }
  ]);

  // Simulated live telemetry logs
  const telemetryLogs = [
    { time: '05:32 PM', msg: 'Battery bank temperature stabilized at 28.5°C' },
    { time: '04:15 PM', msg: 'System completed peak production period' },
    { time: '02:00 PM', msg: 'Smart grid feedback rate: Optimum (98.4%)' },
    { time: '11:30 AM', msg: 'Automatic inverter ventilation cooling activated' },
    { time: '08:00 AM', msg: 'Grid sync complete. Energy export initiated' }
  ];
const services = [
  {
    id: "inspection",
    title: "Inspection Service",
    icon: <Search size={42} />,
    badge: "Most Requested",
    duration: "45–60 mins",
    feature: "Certified Engineers",
    price: "Starting from PKR 5,000",
    description:
      "Complete inspection of panels, inverter, wiring and system performance."
  },

  {
    id: "repair",
    title: "Repair Service",
    icon: <Wrench size={42} />,
    badge: "Emergency Support",
    duration: "Fast Response",
    feature: "Expert Technicians",
    price: "Starting from PKR 5,000",
    description:
      "Professional diagnosis and repair for all solar system issues."
  },

  {
    id: "amc",
    title: "Annual Maintenance Contract",
    icon: <ShieldCheck size={42} />,
    badge: "Best Value",
    duration: "12 Months",
    feature: "Priority Support",
    price: "Starting from PKR 15,000/year",
    description:
      "Scheduled maintenance with priority support and performance reports."
  }
];
const serviceDetails = {

  inspection: {

  overview:
    "Our certified engineers will visit your property to evaluate its suitability for a solar installation and provide a customized quotation.",

  includes: [
    "Roof inspection",
    "Roof measurements",
    "Structural assessment",
    "Shading analysis",
    "Electrical system inspection",
    "Energy consumption review",
    "Solar system recommendations",
    "Estimated installation cost"
  ],

  benefits: [
    "Determine if your property is suitable for solar.",
    "Get an accurate installation quotation.",
    "Estimate your monthly savings.",
    "Receive system size recommendations.",
    "Discuss all your questions with an engineer."
  ],

  duration: "45–90 Minutes",

  price: "PKR 5,000",

  availability: "Monday – Saturday | 9:00 AM – 5:00 PM"

},


  repair: {

  

  overview:
    "Get professional support for diagnosing and repairing issues with your solar system. Our certified technicians inspect the problem and restore your system's performance.",



  includes: [

    "Complete system diagnosis",

    "Solar panel inspection",

    "Inverter checking",

    "Wiring and connection inspection",

    "Battery testing (if applicable)",

    "Performance analysis",

    "Repair recommendations",

    "Replacement guidance (if required)"

  ],



  problems: [

    "⚡ Low Power Generation",

    "🔌 Inverter Error",

    "🔋 Battery Problem",

    "☀️ Panel Damage",

    "🔧 Wiring Fault",

    "📉 System Shutdown",

    "📱 Monitoring System Issue"

  ],



  repairProcess: [

    "Submit Repair Request",

    "Technician Reviews Issue",

    "Technician Visit Scheduled",

    "Problem Diagnosis",

    "Repair Estimate Provided",

    "Customer Approval",

    "Repair Completed"

  ],



  responseTime:

    "Within 24 hours",



  emergency:

    "Priority support available for emergency cases",



  charges: [

    "Inspection Visit Fee may apply depending on company policy",

    "Repair Charges are calculated after diagnosis"

  ],



  requirements: [

    "Keep inverter accessible",

    "Keep electricity bill available",

    "Keep previous repair records (if available)",

    "Ensure someone is present during technician visit"

  ],



  warranty: [

    "Warranty status will be checked",

    "Eligible repairs may be covered"

  ],



  duration:

    "Depends on issue complexity",



  price:

    "Calculated after diagnosis"

},

  amc:{

overview:"Keep your solar system operating efficiently throughout the year with regular maintenance, priority support, and preventive inspections.",

amcBenefits: [

{
icon: "🛠",
title: "Preventive Maintenance",
desc: "Scheduled maintenance keeps your solar system operating efficiently throughout the year."
},

{
icon: "⚡",
title: "Priority Support",
desc: "AMC customers receive faster response times for service requests."
},

{
icon: "📈",
title: "Better Performance",
desc: "Regular inspections ensure maximum energy production."
},

{
icon: "🔋",
title: "Longer Equipment Life",
desc: "Preventive servicing increases the lifespan of your solar equipment."
},

{
icon: "🛡",
title: "Reduced Breakdowns",
desc: "Identify problems early before they become expensive failures."
},

{
icon: "📄",
title: "Performance Reports",
desc: "Receive detailed reports after every maintenance visit."
}

],

includes:[
"Scheduled maintenance visits",
"Complete system health inspection",
"Solar panel cleaning",
"Inverter inspection",
"Electrical wiring inspection",
"Battery health check",
"Performance testing",
"Loose connection tightening",
"Safety inspection",
"Maintenance report after every visit"
],

maintenancePlans: [

{
name: "Basic Plan",
visits: "2 Visits / Year",
description:
"Suitable for customers who need essential yearly maintenance and system inspection.",
features:[
"Preventive maintenance",
"Panel cleaning",
"System health check"
]

},

{
name: "Premium Plan",
visits: "4 Visits / Year",
recommended:true,
description:
"Recommended plan for maximum performance and faster support.",
features:[
"Quarterly maintenance",
"Priority support",
"Performance reports"
]

},

{
name: "Enterprise Plan",
visits: "Customized Schedule",
description:
"Designed for commercial and industrial solar installations requiring flexible maintenance.",
features:[
"Custom visit schedule",
"Dedicated support",
"Advanced monitoring"
]

}

],

comparison: [

{
feature:"Maintenance Visits",
basic:"2",
premium:"4",
enterprise:"Custom"
},

{
feature:"Panel Cleaning",
basic:"✓",
premium:"✓",
enterprise:"✓"
},

{
feature:"System Inspection",
basic:"✓",
premium:"✓",
enterprise:"✓"
},

{
feature:"Battery Check",
basic:"✓",
premium:"✓",
enterprise:"✓"
},

{
feature:"Priority Support",
basic:"—",
premium:"✓",
enterprise:"✓"
},

{
feature:"Performance Reports",
basic:"1",
premium:"4",
enterprise:"Unlimited"
},

{
feature:"Emergency Visits",
basic:"Paid",
premium:"Discounted",
enterprise:"Included"
}

],
eligibility:[
"Existing Customers",
"Residential",
"Commercial",
"Industrial"
],

terms:[
"Replacement parts are charged separately.",
"Natural disaster damage is not covered.",
"Visits should be scheduled in advance.",
"Missed appointments can be rescheduled."
],

faq:[
{
q:"Can I renew my AMC?",
a:"Yes."
},
{
q:"Can I upgrade later?",
a:"Yes."
},
{
q:"Are spare parts included?",
a:"Only when specified in the selected plan."
}
],

duration:"12 Months"

}




};

  const handleBookService = (e) => {


    e.preventDefault();
    if (!serviceType || !preferredDate) return;

    // Create a new booking
    const newService = {
      id: `SRV-${Math.floor(1000 + Math.random() * 9000)}`,
      type: serviceType,
      date: preferredDate,
      status: 'Scheduled',
      technician: 'Assigning (Pending)',
      cost: '$110 (Est.)'
    };

    setAvailedServices([newService, ...availedServices]);
    setSuccessMessage(`Success! Booking ${newService.id} has been registered.`);

    // Clear inputs
    setServiceType('');
    setPreferredDate('');
    setNotes('');

    // Clear alert after timeout
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const bookingFields = {

  inspection: [
    {
      name: "systemSize",
      label: "Solar System Size (kW)",
      type: "text",
      placeholder: "Example: 10kW"
    },
    {
      name: "installationType",
      label: "Installation Type",
      type: "text",
      placeholder: "Roof / Ground"
    },
    {
      name: "preferredDate",
      label: "Preferred Inspection Date",
      type: "date"
    }
  ],


  repair: [
    {
      name: "problem",
      label: "Describe the Problem",
      type: "textarea",
      placeholder: "Example: Inverter showing error"
    },
    {
      name: "systemStatus",
      label: "Current System Status",
      type: "text",
      placeholder: "Working / Not Working"
    },
    {
      name: "preferredDate",
      label: "Preferred Repair Date",
      type: "date"
    }
  ],


  amc: [
    {
      name: "systemSize",
      label: "Solar System Size",
      type: "text",
      placeholder: "Example: 15kW"
    },
    {
      name: "installationDate",
      label: "Installation Date",
      type: "date"
    },
    {
      name: "maintenanceHistory",
      label: "Previous Maintenance Details",
      type: "textarea",
      placeholder: "Last service details"
    }
  ]

};




if(loading){

    return (

        <div className="dashboard-loading">

            Loading dashboard...

        </div>

    );

}

  return (
    <div className="dashboard-container">
      {/* Welcome Top Banner */}
      <header className="dash-header">
        <div className="dash-welcome">

          <h1>Welcome, {currentUser?.displayName || 'Solar Partner'}</h1>
          <p className="dash-date">
            <Calendar size={14} className="calendar-icon-svg" />
            {currentDate}
          </p>
        </div>

      </header>

      {/* Modern Minimal Stats Row */}
      <div className="dash-stats-row">
        <div className="dash-kpi-card">
          <div className="kpi-icon-wrapper">
            <Zap size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">System Health</span>
            <span className="kpi-val">98% <span className="kpi-trend">Optimum</span></span>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="kpi-icon-wrapper">
            <Wrench size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Services Availed</span>
            <span className="kpi-val">{availedServices.length} <span className="kpi-trend">Total</span></span>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="kpi-icon-wrapper">
            <TrendingUp size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Energy Offset</span>
            <span className="kpi-val">$412.50 <span className="kpi-trend positive">Saved</span></span>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="kpi-icon-wrapper">
            <Battery size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Support SLA</span>
            <span className="kpi-val">Premium <span className="kpi-trend">Gold</span></span>
          </div>
        </div>
      </div>

      {/* Main Services & Booking Interface */}
   {/* Main Services Flow */}

<div className="dashboard-main-area">


{
dashboardView === "services" && (

<ServicesGrid

services={services}

selectedService={selectedService}

handleServiceSelect={handleServiceSelect}

/>

 )
 } 



{
dashboardView === "details" && (

<ServiceDetails

selectedService={selectedService}

services={services}

serviceDetails={serviceDetails}

setDashboardView={setDashboardView}

/>

)
}


{
dashboardView === "booking" && selectedService === "inspection" && (

<InspectionForm

selectedService={selectedService}

services={services}

bookingData={bookingData}

handleBookingChange={handleBookingChange}

setBookingData={setBookingData}

handleSubmitBooking={handleSubmitBooking}

setDashboardView={setDashboardView}

/>

)
}



{
dashboardView === "booking" && selectedService === "repair" && (

<RepairForm

selectedService={selectedService}

bookingData={bookingData}

handleBookingChange={handleBookingChange}

setBookingData={setBookingData}

handleSubmitBooking={handleSubmitBooking}

setDashboardView={setDashboardView}

/>

)
}
{
dashboardView === "amcplans" && (

<AMCForm

bookingData={bookingData}
handleBookingChange={handleBookingChange}
handleSubmitBooking={handleSubmitBooking}
setDashboardView={setDashboardView}

/>

)
}

{
dashboardView === "amcConfirmation" && (
<AMCConfirmation

bookingData={bookingData}

activeAMC={activeAMC}

latestBooking={activeAMC}

setDashboardView={setDashboardView}

/>
)
}

{
dashboardView === "confirmation" && (

<BookingConfirmation

latestBooking={latestBooking}

setDashboardView={setDashboardView}

/>

)

}

{
activeAMC && (

<div className="active-amc-card">

<h3>🛡 Active AMC Contract</h3>

<div className="summary-row">
<span>Plan</span>
<strong>{activeAMC.plan}</strong>
</div>

<div className="summary-row">
<span>Status</span>
<strong>{activeAMC.status}</strong>
</div>

<div className="summary-row">
<span>Maintenance Visits</span>
<strong>{activeAMC.visits}</strong>
</div>

<div className="summary-row">
<span>Start Date</span>
<strong>{activeAMC.startDate}</strong>
</div>

<div className="summary-row">
<span>Next Maintenance</span>
<strong>{activeAMC.nextMaintenance}</strong>
</div>

</div>

)
}
</div>



<div className="service-request-section">
  <ServiceRequests serviceRequests={serviceRequests} />

  <div className="request-header" style={{ marginTop: "1.5rem" }}>
    <Sparkles size={14} />
    <span>MY AMC CONTRACTS</span>
  </div>

  {amcContracts.length === 0 ? (
    <div className="empty-request">No AMC contracts yet.</div>
  ) : (
    <div className="request-list">
      {amcContracts.map((contract) => (
        <div className="request-card" key={contract.id}>
          <div className="request-top">
            <h3>{contract.type}</h3>
            <span className="status-badge scheduled">{contract.status}</span>
          </div>

          <div className="request-details">
            <p>Plan: {contract.plan}</p>
            <p>Date: {new Date(contract.date).toLocaleDateString()}</p>
            <p>Engineer: {contract.technician}</p>
            <p>Cost: {contract.cost}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
          {/* Inline Diagnostic Feed */}
          <div className="diagnostics-feed-section">
            <h3>Live Diagnostics Feed</h3>
            <div className="feed-items">
              {telemetryLogs.map((log, index) => (
                <div key={index} className="feed-item">
                  <span className="feed-time">{log.time}</span>
                  <span className="feed-indicator-dot"></span>
                  <span className="feed-text">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        {/* // </div> */}
      </div>
    
  );
 };

export default Dashboard;
