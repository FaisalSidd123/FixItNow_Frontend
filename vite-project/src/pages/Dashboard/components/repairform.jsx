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



<div className="form-group">

<label>
Existing Installation
</label>


<select
name="installation"
onChange={handleBookingChange}
>

<option>
Select Installation
</option>

<option>
Solar System #001
</option>

<option>
Solar System #002
</option>


</select>

</div>





<div className="radio-group">


<label>
<input
type="radio"
name="installationType"
value="Residential"
onChange={handleBookingChange}
/>

Residential
</label>



<label>

<input

type="radio"

name="installationType"

value="Commercial"

onChange={handleBookingChange}

/>

Commercial

</label>



<label>

<input

type="radio"

name="installationType"

value="Industrial"

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

<option>
Don't Know
</option>

<option>
3 KW
</option>

<option>
5 KW
</option>

<option>
10 KW
</option>

<option>
15 KW+
</option>


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


<option>
Select Problem
</option>


<option>
Inverter Issue
</option>


<option>
Low Power Generation
</option>


<option>
No Power Output
</option>


<option>
Solar Panel Damage
</option>


<option>
Battery Issue
</option>


<option>
Electrical Wiring Problem
</option>


<option>
Monitoring App Problem
</option>


<option>
Other
</option>


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


<option>
Today
</option>

<option>
Few days ago
</option>

<option>
More than a week ago
</option>

<option>
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
value="Not Working"
onChange={handleBookingChange}
/>

Completely Not Working

</label>



<label>

<input
type="radio"
name="systemStatus"
value="Reduced Output"
onChange={handleBookingChange}
/>

Working with Reduced Output

</label>




<label>

<input
type="radio"
name="systemStatus"
value="Intermittent"
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
                value="Yes"
                checked={bookingData.batteryInstalled === "Yes"}
                onChange={handleBookingChange}
            />

            Yes

        </label>

        <label className="radio-option">

            <input
                type="radio"
                name="batteryInstalled"
                value="No"
                checked={bookingData.batteryInstalled === "No"}
                onChange={handleBookingChange}
            />

            No

        </label>

    </div>

    {bookingData.batteryInstalled === "Yes" && (

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
name="address"
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


<option>
Morning 9 AM - 12 PM
</option>


<option>
Afternoon 12 PM - 3 PM
</option>


<option>
Evening 3 PM - 6 PM
</option>


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

/>

I confirm information is correct.

</label>



<label className="checkbox-row">

<input

type="checkbox"

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