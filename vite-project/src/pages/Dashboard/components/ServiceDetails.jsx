import React from "react";
import { Sparkles } from "lucide-react";
import "./ServiceDetails.css";


const ServiceDetails = ({
  selectedService,
  services,
  serviceDetails,
  setDashboardView
}) => {


if(!selectedService){

return(

<div className="dash-split-card right-panel">

<div className="card-top-header">
    

<div className="header-badge">

<Sparkles size={12}/>

<span>
SERVICE DETAILS
</span>

</div>

</div>

   

<div className="empty-service-state">

<h2>
Select a Service
</h2>

<p>
Choose a service from the left side to view details.
</p>


</div>


</div>

)

}



const service = services.find(
item=>item.id===selectedService
);


const details = serviceDetails[selectedService];



return(

<div className="dash-split-card right-panel">


<div className="card-top-header">

<div className="header-badge">

<Sparkles size={12}/>

<span>
SERVICE DETAILS
</span>

</div>

</div>



<h2>
{service?.title}
</h2>


<p>
{service?.description}
</p>




<div className="service-details-card">



{/* OVERVIEW */}

{
details?.overview &&

<div className="detail-section">

<h3>
Service Overview
</h3>

<p className="overview-text">

{details.overview}

</p>


</div>

}





{/* BENEFITS */}

{
details?.benefits?.length > 0 &&

<div className="detail-section">


<h3>

{
selectedService==="amc"
?
"Why Choose AMC?"
:
"Why Book This Service?"
}

</h3>



<div className={
selectedService==="amc"
?
"benefits-grid"
:
""
}>


{

details.benefits.map((item,index)=>


selectedService==="amc"

?

<div
className="benefit-card"
key={index}
>


<div className="benefit-icon">

{item.icon}

</div>


<h4>

{item.title}

</h4>


<p>

{item.desc}

</p>


</div>



:

<ul key={index}>

<li>
✓ {item}
</li>

</ul>



)

}



</div>


</div>

}





{/* INCLUDED */}

{
details?.includes?.length >0 &&


<div className="detail-section">


<h3>
What's Included
</h3>


<ul>

{

details.includes.map(
(item,index)=>(

<li key={index}>
✓ {item}
</li>

)

)

}


</ul>


</div>

}






{/* PROBLEMS */}

{
details?.problems?.length >0 &&


<div className="detail-section">


<h3>
Common Problems We Handle
</h3>



<div className="problem-grid">


{

details.problems.map(
(item,index)=>(

<div
className="problem-card"
key={index}
>

{item}

</div>


)

)


}


</div>


</div>


}







{/* REPAIR PROCESS */}

{
details?.repairProcess?.length >0 &&


<div className="detail-section">


<h3>
Repair Process
</h3>


<ol className="process-list">


{

details.repairProcess.map(
(item,index)=>(

<li key={index}>

<span>
{index+1}
</span>


{item}


</li>

)

)

}


</ol>


</div>


}







{/* AMC MAINTENANCE PLANS */}

{
details?.maintenancePlans?.length >0 &&


<div className="detail-section">


<h3>
Maintenance Plans
</h3>



<div className="maintenance-plans">


{

details.maintenancePlans.map(
(plan,index)=>(


<div
className={
plan.recommended
?
"plan-card recommended-plan"
:
"plan-card"
}

key={index}
>


{
plan.recommended &&

<div className="recommended-badge">

Recommended

</div>

}



<h4>
{plan.name}
</h4>


<span>
{plan.visits}
</span>


<p>
{plan.description}
</p>


<ul>

{

plan.features.map(
(feature,i)=>(

<li key={i}>
✓ {feature}
</li>

)

)

}

</ul>


</div>


)

)

}


</div>



</div>


}







{/* COMPARISON TABLE */}

{
details?.comparison?.length>0 &&


<div className="detail-section">


<h3>
Plan Comparison
</h3>


<div className="comparison-wrapper">


<table className="amc-table">


<thead>

<tr>

<th>
Feature
</th>

<th>
Basic
</th>

<th>
Premium
</th>

<th>
Enterprise
</th>

</tr>

</thead>


<tbody>


{

details.comparison.map(
(row,index)=>(

<tr key={index}>


<td>
{row.feature}
</td>


<td>
{row.basic}
</td>


<td>
{row.premium}
</td>


<td>
{row.enterprise}
</td>


</tr>

)

)


}


</tbody>


</table>


</div>


</div>


}







{/* ELIGIBILITY */}

{
details?.eligibility?.length>0 &&


<div className="detail-section">

<h3>
Eligibility
</h3>


<ul>

{

details.eligibility.map(
(item,index)=>(

<li key={index}>
✓ {item}
</li>

)

)

}


</ul>


</div>

}






{/* TERMS */}

{
details?.terms?.length>0 &&


<div className="detail-section">


<h3>
Terms & Conditions
</h3>


<ul>

{

details.terms.map(
(item,index)=>(

<li key={index}>
{item}
</li>

)

)

}

</ul>


</div>


}





{/* FAQ */}

{
details?.faq?.length>0 &&


<div className="detail-section">


<h3>
Frequently Asked Questions
</h3>


{

details.faq.map(
(item,index)=>(


<div
className="faq-item"
key={index}
>


<strong>
{item.q}
</strong>


<p>
{item.a}
</p>


</div>


)

)


}


</div>


}








{/* REQUIREMENTS */}

{
details?.requirements?.length>0 &&


<div className="detail-section">


<h3>
What Customer Should Prepare
</h3>


<ul>

{

details.requirements.map(
(item,index)=>(

<li key={index}>
✓ {item}
</li>

)

)

}


</ul>


</div>


}







{/* WARRANTY */}

{
details?.warranty?.length>0 &&


<div className="detail-section">


<h3>
Warranty Support
</h3>


<ul>

{

details.warranty.map(
(item,index)=>(

<li key={index}>
✓ {item}
</li>

)

)

}


</ul>


</div>


}








{/* CHARGES */}

{
details?.charges?.length>0 &&


<div className="detail-section">


<h3>
Service Charges
</h3>


<ul>

{

details.charges.map(
(item,index)=>(

<li key={index}>
{item}
</li>

)

)

}


</ul>


</div>


}








{/* SUMMARY */}

<div className="service-summary">


{

details?.duration &&

<div className="summary-row">

<span>
Duration
</span>


<strong>
{details.duration}
</strong>


</div>

}



{

details?.price &&

<div className="summary-row">

<span>
Charges
</span>


<strong>
{details.price}
</strong>


</div>

}



</div>







{/* BUTTON */}

<button

className="book-now-btn"

onClick={()=>


selectedService==="amc"

?

setDashboardView("amcplans")

:

setDashboardView("booking")


}

>

{

selectedService==="amc"

?
"Choose Plan"
:
"Book Now"

}


</button>



<div className="details-navigation">

<button
type="button"
className="details-back-btn"
onClick={() => setDashboardView("services")}
>

← Back to Services

</button>

</div>

</div>


</div>


)


}


export default ServiceDetails;