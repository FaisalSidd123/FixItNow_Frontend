import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import "./CustomerChart.css";
const customerData = [
    { month: "Jan", customers: 28 },
    { month: "Feb", customers: 35 },
    { month: "Mar", customers: 31 },
    { month: "Apr", customers: 42 },
    { month: "May", customers: 48 },
    { month: "Jun", customers: 44 },
    { month: "Jul", customers: 56 },
    { month: "Aug", customers: 64 },
];


function CustomerChart() {

    return (

        <div className="customer-chart-card">

            <div className="chart-header">

                <div>
                    <h3>New Customers</h3>

                    <p>
                        Customer growth
                    </p>
                </div>

                <div className="chart-total">
                    <span>This Month</span>
                    <strong>64</strong>
                </div>

            </div>


            <div className="customer-chart">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={customerData}
                        margin={{
                            top: 10,
                            right: 5,
                            left: -20,
                            bottom: 0,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.06)"
                            vertical={false}
                        />


                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#666",
                                fontSize: 11,
                            }}
                        />


                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#666",
                                fontSize: 11,
                            }}
                        />


                        <Tooltip
                            cursor={{
                                fill: "rgba(212,175,55,0.05)",
                            }}
                            contentStyle={{
                                background: "#161616",
                                border: "1px solid rgba(212,175,55,0.25)",
                                borderRadius: "10px",
                                color: "#ffffff",
                            }}
                            formatter={(value) => [
                                value,
                                "Customers",
                            ]}
                        />


                        <Bar
                            dataKey="customers"
                            fill="#D4AF37"
                            radius={[5, 5, 0, 0]}
                            barSize={18}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );
}


export default CustomerChart;