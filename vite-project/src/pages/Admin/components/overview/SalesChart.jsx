import { useEffect, useState } from "react";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import { fetchSalesSummary } from "../../../../api/orderApi";

import "./SalesChart.css";


function SalesChart() {

    const [salesData, setSalesData] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadSalesData = async () => {

            try {

                const data = await fetchSalesSummary();

                setSalesData(data.salesData || []);
                setTotalSales(data.totalSales || 0);

            } catch (error) {

                console.error("Failed to load sales data:", error);

            } finally {

                setLoading(false);

            }

        };


        loadSalesData();

    }, []);


    const formatTotalSales = (amount) => {

        if (amount >= 1000000) {
            return `Rs. ${(amount / 1000000).toFixed(2)}M`;
        }

        if (amount >= 1000) {
            return `Rs. ${(amount / 1000).toFixed(1)}K`;
        }

        return `Rs. ${amount.toLocaleString()}`;

    };


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

                    <strong>
                        {loading
                            ? "Loading..."
                            : formatTotalSales(totalSales)
                        }
                    </strong>

                </div>

            </div>


            <div className="sales-chart">

                {loading ? (

                    <div className="chart-loading">
                        Loading sales data...
                    </div>

                ) : (

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
                                    `Rs. ${Number(value).toLocaleString()}`,
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

                )}

            </div>

        </div>

    );

}


export default SalesChart;