import React from "react";
import "./AMCConfirmation.css";

const AMCConfirmation = ({ bookingData, latestBooking,activeAMC,
setDashboardView }) => {

  return (

    <div className="amc-confirmation-card">

      <div className="success-icon">
        ✓
      </div>


      <h2>
        AMC Contract Activated Successfully
      </h2>


      <p className="success-message">

        Thank you for choosing our Annual Maintenance Contract.
        Your solar system is now protected with regular maintenance
        and priority support.

      </p>



      <div className="contract-details">


        <h3>
          Contract Details
        </h3>


        <div className="contract-row">
          <span>Contract ID</span>
          <strong>
 {activeAMC?.id || "-"}
</strong>
        </div>


        <div className="contract-row">
          <span>Customer</span>
          <strong>
        {activeAMC?.full_name || bookingData.name}
          </strong>
        </div>


        <div className="contract-row">
          <span>Selected Plan</span>
          <strong>
            {activeAMC?.plan || bookingData.amcPlan}
          </strong>
        </div>



        <div className="contract-row">
          <span>Duration</span>
          <strong>
            12 Months
          </strong>
        </div>



    


<div className="contract-row">
  <span>Start Date</span>
<strong>
{activeAMC?.contract_start_date || "-"}
</strong>
</div>

<div className="contract-row">
  <span>Next Maintenance</span>
  <strong>
To be Scheduled
</strong>
</div>

        <div className="contract-row">

          <span>Status</span>

            <strong className="active-status">
 {activeAMC?.status || "Pending"}
</strong>
        

        </div>


      </div>



      <button
      className="dashboard-btn"
     onClick={()=>setDashboardView("serviceRequests")}
      >

      Back to Dashboard

      </button>


    </div>

  );

};


export default AMCConfirmation;