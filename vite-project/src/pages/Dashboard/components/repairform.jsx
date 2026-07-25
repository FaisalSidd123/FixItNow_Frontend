import React from "react";
import "./RepairForm.css";


const RepairForm = ({
bookingData,
handleBookingChange,
setShowBookingForm,
handleSubmitBooking,
setDashboardView
}) => {


return (

<div className="booking-form-card">


<h2>
🔧 Repair Request
</h2>


<form 
className="booking-form"
onSubmit={handleSubmitBooking}
>



{/* Customer Information */}

<h3>
 Customer Information
</h3>


<div className="form-group">

<label>
Full Name
</label>

<input
name="name"
value={bookingData.name || ""}
onChange={handleBookingChange}
/>


</div>



<div className="form-group">

<label>
Phone Number
</label>

<input
name="phone"
placeholder="Enter phone number"
value={bookingData.phone || ""}
onChange={handleBookingChange}
/>

</div>




<div className="form-group">

<label>
Email
</label>


<input

name="email"

value={bookingData.email || ""}

onChange={handleBookingChange}

/>


</div>






{/* Installation Details */}


<h3>
Solar Installation Details
</h3>


<div className="radio-group">


<label>
<input
type="radio"
name="installationType"
value="residential"
onChange={handleBookingChange}
/>

Residential
</label>



<label>

<input

type="radio"

name="installationType"

value="commercial"

onChange={handleBookingChange}

/>

Commercial

</label>



<label>

<input

type="radio"

name="installationType"

value="industrial"

onChange={handleBookingChange}

/>

Industrial

</label>


</div>





<div className="form-group">

<label>
System Size
</label>


<select
name="systemSize"
onChange={handleBookingChange}
>

<option value="">Select System Size</option>
<option value="3kw">3 kW</option>
<option value="5kw">5 kW</option>
<option value="10kw">10 kW</option>
<option value="15kw_plus">15+ kW</option>
<option value="unknown">Unknown</option>


</select>


</div>







{/* Problem Information */}


<h3>
 Problem Information
</h3>



<div className="form-group">

<label>
Issue Category
</label>


<select
name="issueCategory"
onChange={handleBookingChange}
>


<option value="">Select Issue</option>
<option value="inverter_issue">Inverter Issue</option>
<option value="low_power_generation">Low Power Generation</option>
<option value="no_power_output">No Power Output</option>
<option value="solar_panel_damage">Solar Panel Damage</option>
<option value="battery_issue">Battery Issue</option>
<option value="electrical_wiring_problem">Electrical Wiring Problem</option>
<option value="monitoring_app_problem">Monitoring App Problem</option>
<option value="other">Other</option>


</select>


</div>





<div className="form-group">

<label>
Problem Description
</label>


<textarea

name="problemDescription"

placeholder="Describe the issue"

onChange={handleBookingChange}

/>


</div>






<div className="form-group">

<label>
When Did The Problem Start?
</label>


<select
name="problemStarted"
onChange={handleBookingChange}
>


<option value="today">
Today
</option>

<option value="few_days_ago">
Few days ago
</option>

<option value="more_than_a_week">
More than a week ago
</option>

<option value="not_sure">
Not sure
</option>


</select>

</div>







<h3>
System Status
</h3>


<div className="radio-group">


<label>

<input
type="radio"
name="systemStatus"
value="not_working"
onChange={handleBookingChange}
/>

Completely Not Working

</label>



<label>

<input
type="radio"
name="systemStatus"
value="reduced_output"
onChange={handleBookingChange}
/>

Working with Reduced Output

</label>




<label>

<input
type="radio"
name="systemStatus"
value="intermittent"
onChange={handleBookingChange}
/>

Intermittent Problem

</label>


</div>



{/* Equipment */}


<h3>
 Equipment Details
</h3>



<div className="form-group">

<label>
Inverter Brand
</label>


<input

name="inverterBrand"

placeholder="Huawei / Sungrow / Growatt"

onChange={handleBookingChange}

/>


</div>





<div className="form-group">

<label>
Inverter Error Code
</label>


<input

name="errorCode"

placeholder="Example E05"

onChange={handleBookingChange}

/>


</div>







<div className="form-section">

    <h3>Battery Details</h3>

    <label className="field-label">
        Battery Installed?
    </label>

    <div className="radio-group">

        <label className="radio-option">

            <input
                type="radio"
                name="batteryInstalled"
                value="true"
                checked={bookingData.batteryInstalled === "true"}
                onChange={handleBookingChange}
            />

            Yes

        </label>

        <label className="radio-option">

            <input
                type="radio"
                name="batteryInstalled"
                value="false"
                checked={bookingData.batteryInstalled === "false"}
                onChange={handleBookingChange}
            />

            No

        </label>

    </div>

    {bookingData.batteryInstalled === "true" && (

        <>

            <label className="field-label">
                Battery Brand
            </label>

            <select
                name="batteryBrand"
                value={bookingData.batteryBrand}
                onChange={handleBookingChange}
            >

                <option value="">Select Battery Brand</option>

                <option>Tesla</option>
                <option>Huawei</option>
                <option>Dyness</option>
                <option>PylonTech</option>
                <option>Growatt</option>
                <option>Other</option>

            </select>

            <label className="field-label">
                Battery Issue Description
            </label>

            <textarea
                name="batteryIssue"
                value={bookingData.batteryIssue}
                onChange={handleBookingChange}
                placeholder="Describe the battery problem..."
            />

        </>

    )}

</div>







{/* Upload */}

<h3>
 Upload Evidence
</h3>



<label className="file-upload">

Upload Photos

<input
  type="file"
  multiple
  name="images"
  onChange={handleBookingChange}
/>

</label>



<label className="file-upload">

Upload Video (Optional)

<input
  type="file"
  accept="video/*"
  name="video"
  onChange={handleBookingChange}
/>

</label>






{/* Location */}

<h3>
 Location Details
</h3>



<input
name="serviceAddress"
placeholder="Service Address"
onChange={handleBookingChange}
/>


<input
name="city"
placeholder="City"
onChange={handleBookingChange}
/>



<input
name="location"
placeholder="Google Map Location"
onChange={handleBookingChange}
/>







{/* Visit */}


<h3>
 Technician Visit Preference
</h3>


<input

type="date"

name="preferredDate"

onChange={handleBookingChange}

/>



<select
name="preferredTime"
onChange={handleBookingChange}
>
<option value="">Preferred Time</option>
<option value="morning">Morning</option>
<option value="afternoon">Afternoon</option>
<option value="evening">Evening</option>
</select>


<h3>
 Additional Notes
</h3>


<textarea

name="notes"

placeholder="Anything else technician should know?"

onChange={handleBookingChange}

/>

<h3>
 Confirmation
</h3>


<label className="checkbox-row">

<input

type="checkbox"

name="informationConfirmed"

checked={bookingData.informationConfirmed}

onChange={handleBookingChange}

/>

I confirm information is correct.

</label>



<label className="checkbox-row">

<input

type="checkbox"

name="termsAccepted"

checked={bookingData.termsAccepted}

onChange={handleBookingChange}

/>

I agree additional charges may apply after diagnosis.

</label>






<div className="booking-actions">


<button
type="button"
className="back-btn"
onClick={() => setDashboardView("details")}
>

← Back

</button>



<button

className="submit-booking-btn"

type="submit"

>

Submit Repair Request

</button>


</div>





</form>


</div>

)


}


export default RepairForm;