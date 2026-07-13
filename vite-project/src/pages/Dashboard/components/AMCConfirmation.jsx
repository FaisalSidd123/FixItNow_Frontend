import React from "react";
import "./AMCConfirmation.css";

const AMCConfirmation = ({ bookingData, latestBooking,
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
            AMC-{Math.floor(10000 + Math.random()*90000)}
          </strong>
        </div>


        <div className="contract-row">
          <span>Customer</span>
          <strong>
            {bookingData.name}
          </strong>
        </div>


        <div className="contract-row">
          <span>Selected Plan</span>
          <strong>
            {bookingData.amcPlan}
          </strong>
        </div>



        <div className="contract-row">
          <span>Duration</span>
          <strong>
            12 Months
          </strong>
        </div>



        <div className="contract-row">
          <span>Maintenance Visits</span>

          <strong>

          {
            bookingData.amcPlan === "Premium"
            ?
            "4 Visits / Year"
            :
            bookingData.amcPlan === "Basic"
            ?
            "2 Visits / Year"
            :
            "Customized"

          }

          </strong>

        </div>


<div className="contract-row">
  <span>Start Date</span>
  <strong>{latestBooking?.startDate || "-"}</strong>
</div>

<div className="contract-row">
  <span>Next Maintenance</span>
  <strong>{latestBooking?.nextMaintenance || "-"}</strong>
</div>

        <div className="contract-row">

          <span>Status</span>

          <strong className="active-status">
            Active ✓
          </strong>

        </div>


      </div>



      <button
      className="dashboard-btn"
      onClick={()=>setDashboardView("services")}
      >

      Back to Dashboard

      </button>


    </div>

  );

};


export default AMCConfirmation;