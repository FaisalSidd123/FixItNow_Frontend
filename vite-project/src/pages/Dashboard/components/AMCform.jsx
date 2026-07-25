
import React, { useState } from "react";
import "./AMCForms.css";



const AMCform = ({
  bookingData,
  handleBookingChange,
  handleSubmitBooking,
   setDashboardView
}) => {

 
    console.log("AMC FORM LOADED");
    const [agreementAccepted, setAgreementAccepted] = useState(false);
const [termsAccepted, setTermsAccepted] = useState(false);
const [extraChargesAccepted, setExtraChargesAccepted] = useState(false);

  return (


    <div className="booking-card">

      <div className="booking-header">

        <h2>Annual Maintenance Contract</h2>

        <p>
          Complete the information below to purchase your AMC plan.
        </p>

      </div>

      <form
        className="booking-form"
        onSubmit={handleSubmitBooking}
      >

        {/* Customer Information */}

        <div className="form-section">

          <h3>Customer Information</h3>

          <div className="form-grid">

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={bookingData.name}
                onChange={handleBookingChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={bookingData.phone}
                onChange={handleBookingChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={bookingData.email}
                onChange={handleBookingChange}
              />
            </div>

          </div>

        </div>

        {/* Solar Installation */}

        <div className="form-section">

          <h3>Solar Installation</h3>

          <div className="form-grid">

            

            <div className="form-group">

              <label>Installation Type</label>

              <select
                name="installationType"
                value={bookingData.installationType}
                onChange={handleBookingChange}
              >

                <option value="">
                  Select
                </option>

                <option value="residential">
                  Residential
                </option>

                <option value="commercial">
                  Commercial
                </option>

                <option value="industrial">
                  Industrial
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>System Size</label>

              <select
                name="systemSize"
                value={bookingData.systemSize}
                onChange={handleBookingChange}
              >

                <option value="">
                  Select
                </option>

                <option value="3kw">3 KW</option>

                <option value="5kw">5 KW</option>

                <option value="10kw">10 KW</option>

                <option value="15kw_plus">15 KW+</option>

                <option value="unknown">Don't Know</option>

              </select>

            </div>

          </div>

        </div>
{/* AMC Plan */}

<div className="form-section">

  <h3>Select AMC Plan</h3>

  <div className="plan-grid">

    <label className="plan-card">

      <input
        type="radio"
        name="amcPlan"
        value="basic"
        checked={bookingData.amcPlan === "basic"}
        onChange={handleBookingChange}
      />

      <h4>Basic Plan</h4>

      <span className="plan-price">
        PKR 15,000 / Year
      </span>

      <ul>

        <li>✓ 2 Maintenance Visits</li>
        <li>✓ Panel Cleaning</li>
        <li>✓ System Inspection</li>
        <li>✓ Battery Check</li>
        <li>✕ Priority Support</li>
        <li>1 Performance Report</li>

      </ul>

    </label>


    <label className="plan-card featured">

      <input
        type="radio"
        name="amcPlan"
        value="premium"
        checked={bookingData.amcPlan === "premium"}
        onChange={handleBookingChange}
      />

      <div className="recommended-badge">
        MOST POPULAR
      </div>

      <h4>Premium Plan</h4>

      <span className="plan-price">
        PKR 25,000 / Year
      </span>

      <ul>

        <li>✓ 4 Maintenance Visits</li>
        <li>✓ Panel Cleaning</li>
        <li>✓ System Inspection</li>
        <li>✓ Battery Check</li>
        <li>✓ Priority Support</li>
        <li>4 Performance Reports</li>

      </ul>

    </label>


    <label className="plan-card">

      <input
        type="radio"
        name="amcPlan"
        value="enterprise"
        checked={bookingData.amcPlan === "enterprise"}
        onChange={handleBookingChange}
      />

      <h4>Enterprise</h4>

      <span className="plan-price">
        Custom Quote
      </span>

      <ul>

        <li>✓ Unlimited Visits</li>
        <li>✓ Priority Support</li>
        <li>✓ Emergency Visits</li>
        <li>✓ Dedicated Engineer</li>
        <li>✓ Unlimited Reports</li>

      </ul>

    </label>

  </div>

</div>

{/* Contract Details */}

<div className="form-section">

  <h3>Contract Details</h3>

  <div className="form-grid">

    <div className="form-group">

      <label>Contract Duration</label>

      <input
        type="text"
        value="12 Months"
        readOnly
      />

    </div>

    <div className="form-group">

      <label>Contract Starts From</label>

      <input
        type="date"
        name="startDate"
        value={bookingData.startDate}
        onChange={handleBookingChange}
      />

    </div>

  </div>

</div>

{/* Service Location */}

<div className="form-section">

<h3>Service Location</h3>

<div className="form-grid">

<div className="form-group">

<label>Service Address</label>

<input
type="text"
name="address"
value={bookingData.address}
onChange={handleBookingChange}
/>

</div>

<div className="form-group">

<label>City</label>

<input
type="text"
name="city"
value={bookingData.city}
onChange={handleBookingChange}
/>

</div>

<div className="form-group">

<label>Google Map Location</label>

<input
type="text"
name="location"
placeholder="Paste Google Maps link"
value={bookingData.location}
onChange={handleBookingChange}
/>

</div>

</div>

</div>

{/* Preferred Visit */}

<div className="form-section">

<h3>Preferred Maintenance Schedule</h3>

<div className="form-grid">

<div className="form-group">

<label>Preferred Day</label>

<select
name="preferredDay"
value={bookingData.preferredDay}
onChange={handleBookingChange}
>

<option value="">Select</option>

<option value="monday">Monday</option>
<option value="tuesday">Tuesday</option>
<option value="wednesday">Wednesday</option>
<option value="thursday">Thursday</option>
<option value="friday">Friday</option>
<option value="saturday">Saturday</option>

</select>

</div>

<div className="form-group">

<label>Preferred Time</label>

<select
name="preferredTime"
value={bookingData.preferredTime}
onChange={handleBookingChange}
>

<option value="">Select</option>

<option value="morning">Morning (9-12)</option>

<option value="afternoon">Afternoon (12-3)</option>

<option value="evening">Evening (3-6)</option>

</select>

</div>

</div>

</div>

<div className="form-section">

<h3>Additional Notes</h3>

<textarea

name="notes"

rows="5"

placeholder="Anything our maintenance team should know?"

value={bookingData.notes}

onChange={handleBookingChange}

/>

</div>
{/* Agreement Section */}

<div className="amc-section">

<h3>
Agreement & Confirmation
</h3>


<div className="agreement-box">


<label>
  <input
    type="checkbox"
    name="informationConfirmed"
    checked={bookingData.informationConfirmed}
    onChange={handleBookingChange}
  />
  I confirm that the provided solar system information is correct.
</label>

<label>
  <input
    type="checkbox"
    name="termsAccepted"
    checked={bookingData.termsAccepted}
    onChange={handleBookingChange}
  />
  I agree to the AMC terms and conditions.
</label>

<label>
  <input
    type="checkbox"
    name="chargesUnderstood"
    checked={bookingData.chargesUnderstood}
    onChange={handleBookingChange}
  />
  I understand that additional charges may apply for replacement parts.
</label>


</div>


</div>
{/* Purchase Summary */}

<div className="amc-summary">


<h3>
AMC Purchase Summary
</h3>


<div className="summary-item">

<span>
Selected Plan
</span>

<strong>
{bookingData.amcPlan|| "Not Selected"}
</strong>

</div>



<div className="summary-item">

<span>
Contract Duration
</span>

<strong>
12 Months
</strong>

</div>



<div className="summary-item">

<span>
Maintenance Visits
</span>

{
bookingData.amcPlan=== "Premium"
?
"4 Visits / Year"
:
bookingData.amcPlan === "Basic"
?
"2 Visits / Year"
:
"Customized"
}

</div>



<div className="summary-item">

<span>
Priority Support
</span>

{
bookingData.amcPlan === "Basic"
?
"Not Included"
:
"Included"
}

</div>



<div className="summary-total">

<span>
Total Amount
</span>

{
bookingData.amcPlan === "Premium"
?
"PKR 25,000"
:
bookingData.amcPlan === "Basic"
?
"PKR 15,000"
:
"Contact Sales"
}


</div>


</div>

<button

className="activate-amc-btn"
disabled={
  !bookingData.informationConfirmed ||
  !bookingData.termsAccepted ||
  !bookingData.chargesUnderstood
}

>
Activate AMC Contract

</button>
<div className="details-navigation">

<button
type="button"
className="back-btn"
onClick={() => setDashboardView("details")}
>

← Back

</button>

</div>

      </form>

    </div>

  );

};

export default AMCform;