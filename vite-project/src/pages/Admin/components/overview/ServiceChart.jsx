import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

import "./ServiceChart.css";
const serviceData = [
    {
        name: "Completed",
        value: 68,
    },
    {
        name: "In Progress",
        value: 32,
    },
    {
        name: "Pending",
        value: 18,
    },
    {
        name: "Cancelled",
        value: 6,
    },
];


function ServiceChart() {

    return (

        <div className="service-chart-card">

            <div className="chart-header">

                <div>
                    <h3>Service Requests</h3>

                    <p>
                        Current request status
                    </p>
                </div>

                <div className="chart-total">
                    <span>Total Requests</span>
                    <strong>124</strong>
                </div>

            </div>


            <div className="service-chart-content">

                <div className="service-pie">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie
                                data={serviceData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="82%"
                                paddingAngle={3}
                                stroke="none"
                            >

                                <Cell fill="#D4AF37" />
                                <Cell fill="#8C7A3B" />
                                <Cell fill="#555555" />
                                <Cell fill="#292929" />

                            </Pie>


                            <Tooltip
                                contentStyle={{
                                    background: "#161616",
                                    border: "1px solid rgba(212,175,55,0.25)",
                                    borderRadius: "10px",
                                    color: "#ffffff",
                                }}
                            />

                        </PieChart>

                    </ResponsiveContainer>


                    <div className="pie-center">

                        <strong>124</strong>

                        <span>Total</span>

                    </div>

                </div>


                <div className="service-legend">

                    {serviceData.map((service, index) => (

                        <div
                            className="service-legend-item"
                            key={service.name}
                        >

                            <div className="legend-label">

                                <span
                                    className={`legend-dot legend-${index}`}
                                ></span>

                                <span>
                                    {service.name}
                                </span>

                            </div>

                            <strong>
                                {service.value}
                            </strong>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );
}


export default ServiceChart;