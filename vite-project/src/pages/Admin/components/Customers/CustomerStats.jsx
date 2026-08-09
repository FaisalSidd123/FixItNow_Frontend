import {
    Users,
    UserCheck,
    UserPlus,
    Clock
} from "lucide-react";

import "./CustomerStats.css";

function CustomerStats({ customers = [] }) {

    const totalCustomers = customers.length;

    // For now, every registered user is considered active
    // because your users table does not have a status column.
    const activeCustomers = customers.length;

    // Users created during the current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const newCustomers = customers.filter((customer) => {

        if (!customer.created_at) return false;

        const createdDate = new Date(customer.created_at);

        return (
            createdDate.getMonth() === currentMonth &&
            createdDate.getFullYear() === currentYear
        );

    }).length;


    // We don't have a pending request field in users.
    // This will be connected later with service requests.
    const pendingRequests = 0;


    const stats = [

        {
            title: "Total Customers",
            value: totalCustomers,
            description: "All registered customers",
            icon: Users
        },

        {
            title: "Active Customers",
            value: activeCustomers,
            description: "Currently active",
            icon: UserCheck
        },

        {
            title: "New Customers",
            value: newCustomers,
            description: "This month",
            icon: UserPlus
        },

        {
            title: "Pending Requests",
            value: pendingRequests,
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

                            <p>
                                {stat.title}
                            </p>

                            <h3>
                                {stat.value}
                            </h3>

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