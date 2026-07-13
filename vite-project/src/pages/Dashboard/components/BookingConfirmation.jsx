import React from "react";
import { CheckCircle } from "lucide-react";
import "./BookingConfirmation.css";


const BookingConfirmation = ({
latestBooking,
setDashboardView
}) => {


return (

<div className="confirmation-card">


<CheckCircle size={60}/>


<h2>
Booking Confirmed!
</h2>


<p>
Your service request has been successfully submitted.
</p>


<div className="confirmation-details">


<p>
<strong>
Request ID:
</strong>

{latestBooking.id}

</p>
{
latestBooking?.contractType && (

<div className="confirmation-contract">

  <h3>AMC Contract Activated Successfully 🎉</h3>

  <div className="confirmation-grid">

    <div>
      <span>Plan</span>
      <strong>{latestBooking.contractType}</strong>
    </div>

    <div>
      <span>Status</span>
      <strong>{latestBooking.contractStatus}</strong>
    </div>

    <div>
      <span>Start Date</span>
      <strong>{latestBooking.startDate}</strong>
    </div>

    <div>
      <span>Duration</span>
      <strong>{latestBooking.endDate}</strong>
    </div>

  </div>

</div>

)
}

<p>
<strong>
Service:
</strong>

{latestBooking.type}

</p>


<p>
<strong>
Date:
</strong>

{
new Date(latestBooking.date).toLocaleDateString(
"en-US",
{
weekday:"long",
year:"numeric",
month:"long",
day:"numeric"
}
)
}

</p>


<p>
<strong>
Status:
</strong>

{latestBooking.status}

</p>


</div>



<button

onClick={()=>setDashboardView("services")}

>

Go To Dashboard

</button>


</div>


);


};


export default BookingConfirmation;