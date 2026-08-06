import {
    Users,
    UserCheck,
    UserPlus,
    Clock
} from "lucide-react";

import "./CustomerStats.css";

function CustomerStats() {

    const stats = [
        {
            title: "Total Customers",
            value: "1,248",
            description: "All registered customers",
            icon: Users
        },
        {
            title: "Active Customers",
            value: "1,102",
            description: "Currently active",
            icon: UserCheck
        },
        {
            title: "New Customers",
            value: "86",
            description: "This month",
            icon: UserPlus
        },
        {
            title: "Pending Requests",
            value: "24",
            description: "Awaiting action",
            icon: Clock
        }
    ];

    return (
        <div className="customer-stats-grid">

            {stats.map((stat) => {

                const Icon = stat.icon;

                return (
                    <div
                        className="customer-stat-card"
                        key={stat.title}
                    >

                        <div className="customer-stat-icon">
                            <Icon
                                size={19}
                                strokeWidth={1.8}
                            />
                        </div>

                        <div className="customer-stat-content">

                            <p>{stat.title}</p>

                            <h3>{stat.value}</h3>

                            <span>
                                {stat.description}
                            </span>

                        </div>

                    </div>
                );

            })}

        </div>
    );
}

export default CustomerStats;