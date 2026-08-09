import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import "./SalesChart.css";

const salesData = [
    { month: "Jan", sales: 420000 },
    { month: "Feb", sales: 510000 },
    { month: "Mar", sales: 480000 },
    { month: "Apr", sales: 620000 },
    { month: "May", sales: 710000 },
    { month: "Jun", sales: 680000 },
    { month: "Jul", sales: 820000 },
    { month: "Aug", sales: 910000 },
];


function SalesChart() {

    return (

        <div className="sales-chart-card">

            <div className="chart-header">

                <div>
                    <h3>Sales Overview</h3>

                    <p>
                      Monthly sales performance
                    </p>
                </div>

                <div className="chart-total">
                    <span>Total Sales</span>
                    <strong>Rs. 5.15M</strong>
                </div>

            </div>


            <div className="sales-chart">

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart
                        data={salesData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                        }}
                    >

                        <defs>

                            <linearGradient
                                id="salesGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="0%"
                                    stopColor="#D4AF37"
                                    stopOpacity={0.3}
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#D4AF37"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>


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
                            tickFormatter={(value) =>
                                `${value / 1000}k`
                            }
                        />


                        <Tooltip
                            contentStyle={{
                                background: "#161616",
                                border: "1px solid rgba(212,175,55,0.25)",
                                borderRadius: "10px",
                                color: "#ffffff",
                            }}
                            formatter={(value) => [
                                `Rs. ${value.toLocaleString()}`,
                                "Sales",
                            ]}
                        />


                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#D4AF37"
                            strokeWidth={2}
                            fill="url(#salesGradient)"
                            dot={false}
                            activeDot={{
                                r: 5,
                            }}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>

    );
}


export default SalesChart;