import {
    UserPlus,
    Wrench,
    Package
} from "lucide-react";

import "./RecentActivity.css"



function RecentActivity({ activities }) {

    return (
        <div className="recent-activity-card">

            <div className="activity-header">

                <div>
                    <h3>Recent Activity</h3>

                    <p>
                        Latest activity on FixItNow
                    </p>
                </div>

                <button className="view-all-btn">
                    View All
                </button>

            </div>


            <div className="activity-list">

                {activities.slice(0, 5).map((activity, index) => (
                    <div
                        className="activity-item"
                        key={index}
                    >

     <div
    className={`activity-icon ${activity.type}`}
>
    {activity.type === "customer" && (
        <UserPlus size={17} strokeWidth={1.8} />
    )}

    {activity.type === "service" && (
        <Wrench size={17} strokeWidth={1.8} />
    )}

    {activity.type === "product" && (
        <Package size={17} strokeWidth={1.8} />
    )}
</div>


                        <div className="activity-details">

                            <strong>
                                {activity.title}
                            </strong>

                            <span>
                                {activity.description}
                            </span>

                        </div>


                        <span className="activity-time">
                            {activity.time}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}


export default RecentActivity;