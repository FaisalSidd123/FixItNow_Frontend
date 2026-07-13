import React from "react";
import { Sparkles } from "lucide-react";
import "./inspectionform.css";

const InspectionForm = ({
selectedService,
services,
bookingData,
handleBookingChange,
setBookingData,
setDashboardView,
handleSubmitBooking
}) => {

  return (

    <>
    

<form className="booking-form-card">
  <div className="form-container">

<div className="booking-header">
  <Sparkles size={16}/>
  <span>BOOKING REQUEST</span>
</div>

<h2>
  {services.find(
    service => service.id === selectedService
  )?.title}
</h2>

<p>
  Please provide your details and our solar engineer will contact you.
</p>

        <p>
          {
            services.find(
              service => service.id === selectedService
            )?.title
          }
        </p>
       <h3>Personal Information</h3>


<input
type="text"
name="name"
placeholder="Full Name"
value={bookingData.name}
onChange={handleBookingChange}
/>


<input
type="text"
name="phone"
placeholder="Phone Number"
value={bookingData.phone}
onChange={handleBookingChange}
/>


<input
type="email"
name="email"
placeholder="Email Address"
value={bookingData.email}
onChange={handleBookingChange}
/> 
<h3>Property Information</h3>


<select
name="propertyType"
value={bookingData.propertyType}
onChange={handleBookingChange}
>

<option value="">
Property Type
</option>

<option>House</option>
<option>Apartment</option>
<option>Commercial Building</option>
<option>Industrial Building</option>
<option>Farm</option>
<option>Other</option>

</select>


<input
name="streetAddress"
placeholder="Street Address"
value={bookingData.streetAddress}
onChange={handleBookingChange}
/>


<input
name="city"
placeholder="City"
value={bookingData.city}
onChange={handleBookingChange}
/>


<input
name="province"
placeholder="Province / State"
value={bookingData.province}
onChange={handleBookingChange}
/>


<input
name="postalCode"
placeholder="Postal Code (Optional)"
value={bookingData.postalCode}
onChange={handleBookingChange}
/>


<input
name="googleLocation"
placeholder="Google Maps Location Link"
value={bookingData.googleLocation}
onChange={handleBookingChange}
/>
<h3>Roof Information</h3>


<select
name="roofType"
value={bookingData.roofType}
onChange={handleBookingChange}
>

<option>
Roof Type
</option>

<option>Concrete</option>
<option>Metal</option>
<option>Tile</option>
<option>Flat Roof</option>
<option>Sloped Roof</option>
<option>Other</option>

</select>


<select
name="floors"
value={bookingData.floors}
onChange={handleBookingChange}
>

<option>
Number of Floors
</option>

<option>1</option>
<option>2</option>
<option>3+</option>

</select>
<label className="field-label">Roof Access</label>
<label className="radio-option">
  <input
    type="radio"
    name="roofAccess"
    value="Easy"
    checked={bookingData.roofAccess === "Easy"}
    onChange={handleBookingChange}
  />
  <span>Easy</span>
</label>

<label className="radio-option">
  <input
    type="radio"
    name="roofAccess"
    value="Moderate"
    checked={bookingData.roofAccess === "Moderate"}
    onChange={handleBookingChange}
  />
  <span>Moderate</span>
</label>

<label className="radio-option">
  <input
    type="radio"
    name="roofAccess"
    value="Difficult"
    checked={bookingData.roofAccess === "Difficult"}
    onChange={handleBookingChange}
  />
  <span>Difficult</span>
</label>
<h3>Electricity Information</h3>


<input
type="number"
name="electricityBill"
placeholder="Average Monthly Electricity Bill (PKR)"
value={bookingData.electricityBill}
onChange={handleBookingChange}
/>


<label>
Upload Latest Electricity Bill
</label>

<input
type="file"
name="electricityBillFile"
accept="image/*,.pdf"
onChange={(e)=>
setBookingData(prev=>({
 ...prev,
 electricityBillFile:e.target.files[0]
}))
}
/>


<select
name="electricityProvider"
value={bookingData.electricityProvider}
onChange={handleBookingChange}
>

<option value="">
Current Electricity Provider
</option>

<option>LESCO</option>
<option>IESCO</option>
<option>FESCO</option>
<option>K-Electric</option>
<option>Other</option>

</select>
<h3>Preferred Schedule</h3>


<label>
Preferred Date
</label>

<input
type="date"
name="preferredDate"
value={bookingData.preferredDate}
onChange={handleBookingChange}
/>



<select
name="preferredTime"
value={bookingData.preferredTime}
onChange={handleBookingChange}
>

<option value="">
Preferred Time
</option>

<option>
9 AM - 11 AM
</option>

<option>
11 AM - 1 PM
</option>

<option>
2 PM - 4 PM
</option>

<option>
4 PM - 6 PM
</option>


</select>
<h3>Additional Notes</h3>


<textarea

name="notes"

placeholder="
Example:

The roof was renovated last year.

"

value={bookingData.notes}

onChange={handleBookingChange}

/>
<h3>Confirmation</h3>


<label className="checkbox-row">

<input

type="checkbox"

name="informationConfirmed"

checked={bookingData.informationConfirmed}

onChange={(e)=>

setBookingData(prev=>({

...prev,

informationConfirmed:e.target.checked

}))

}

/>

I confirm the provided information is accurate.

</label>



<label className="checkbox-row">

<input

type="checkbox"

name="termsAccepted"

checked={bookingData.termsAccepted}

onChange={(e)=>

setBookingData(prev=>({

...prev,

termsAccepted:e.target.checked

}))

}

/>

I agree to the inspection terms and conditions.

</label>

       




   <div className="booking-actions">

<button
className="back-btn"
onClick={()=>setDashboardView("details")}
>
Back
</button>


<button 
className="submit-booking-btn"
onClick={handleSubmitBooking}
>
Submit Request
</button>

</div>
</div>
      </form>
      
      

    </>

  );

};

export default InspectionForm;