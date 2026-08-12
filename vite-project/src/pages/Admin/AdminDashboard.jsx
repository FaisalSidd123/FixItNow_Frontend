import "./AdminDashboard.css";
import logo from "../../assets/FixItNow Logo.png";
import StatCard from "./components/overview/StatCard";
import SalesChart from "./components/overview/SalesChart";
import CustomerChart from "./components/overview/CustomerChart";
import ServiceChart from "./components/overview/ServiceChart";
import RecentActivity from "./components/overview/RecentActivity";
import { useState,useEffect } from "react";
import { getOverview } from "../../api/overviewService";
import CustomerPage from "./components/customers/CustomerPage";
import ProductPage from "./components/products/ProductPage";
import ServicePage from "./components/Services/ServicePage";
import NotificationDropdown from "./components/overview/NotificationDropdown";
import {doSignOut } from "../../firebase/auth";
import {
    LayoutDashboard,
    Users,
    Package,
    Wrench,
    Settings,
    LogOut,
    Menu, Search, Bell, CircleDollarSign
} from "lucide-react";

function AdminDashboard() {
   
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dateRange, setDateRange] = useState("Last 30 Days");
    const [activeTab, setActiveTab] = useState("overview");
   
 const [overviewData, setOverviewData] = useState(null);
const [overviewLoading, setOverviewLoading] = useState(true);
const [overviewError, setOverviewError] = useState("");

const [notificationsOpen, setNotificationsOpen] = useState(false);
useEffect(() => {

    const loadOverview = async () => {

        try {

            setOverviewLoading(true);
            setOverviewError("");

            const data = await getOverview();

            setOverviewData(data);

        } catch (error) {

            console.error(
                "Failed to load overview:",
                error
            );

            setOverviewError(
                error.message ||
                "Failed to load overview data"
            );

        } finally {

            setOverviewLoading(false);

        }

    };

    loadOverview();

}, []);

    return (
        <div className="admin-dashboard">

            {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

                <div className="admin-logo">
    <img src={logo} alt="FixItNow" />
    <p>ADMIN PANEL</p>
</div>
               

                <nav className="admin-nav">

                    <button
    className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
    onClick={() => {
        setActiveTab("overview");
        setSidebarOpen(false);
    }}
>
    <LayoutDashboard size={19} strokeWidth={1.8} />
    <span>Overview</span>
</button>


                   <button
    className={`nav-item ${activeTab === "customers" ? "active" : ""}`}
    onClick={() => {
        setActiveTab("customers");
        setSidebarOpen(false);
    }}
>
    <Users size={19} strokeWidth={1.8} />
    <span>Customers</span>
</button>
<button
    className={`nav-item ${activeTab === "products" ? "active" : ""}`}
    onClick={() => {
        setActiveTab("products");
        setSidebarOpen(false);
    }}
>
    <Package size={19} strokeWidth={1.8} />
    <span>Products</span>
</button>

                  <button
    className={`nav-item ${
        activeTab === "services" ? "active" : ""
    }`}
    onClick={() => setActiveTab("services")}
>
    <Wrench size={19} strokeWidth={1.8} />
    <span>Services</span>
</button>

                </nav>

                <div className="sidebar-bottom">

                   

                  <button
    className="nav-item logout"
    onClick={async () => {
        try {
            await doSignOut();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }}
>
    <LogOut size={19} strokeWidth={1.8} />
    <span>Logout</span>
</button>
                </div>

            </aside>

{sidebarOpen && (
    <div
        className="sidebar-overlay"
        onClick={() => setSidebarOpen(false)}
    ></div>
)}
            {/* Main Area */}
            <main className="admin-main">

                {/* Topbar */}
                <header className="admin-topbar">
   <button
    className="mobile-menu-btn"
    onClick={() => setSidebarOpen(!sidebarOpen)}
    aria-label="Open navigation"
>
    <Menu size={20} />
</button>
                    <div>
                        <h1>Overview</h1>
                        <p>Welcome back, Admin</p>
                    </div>

                    <div className="topbar-right">

                      

         <div className="notification-wrapper">

    <button
        className="notification-btn"
        aria-label="Notifications"
        onClick={() =>
            setNotificationsOpen((prev) => !prev)
        }
    >
        <Bell size={18} />

        {overviewData?.recentActivity?.length > 0 && (
            <span className="notification-dot"></span>
        )}
    </button>

    {notificationsOpen && (
        <NotificationDropdown
            notifications={
                overviewData?.recentActivity || []
            }
        />
    )}

</div>
                        <div className="admin-profile">

                            <div className="profile-avatar">
                                A
                            </div>

                            <div className="profile-info">
                                <strong>Admin User</strong>
                                <span>Administrator</span>
                            </div>

                        </div>

                    </div>

                </header>


                {/* Dashboard Content */}
    

  <section className="admin-content">
{activeTab === "overview" && overviewLoading && (
    <div className="overview-loading">
        Loading overview...
    </div>
)}

{activeTab === "overview" && overviewError && (
    <div className="overview-error">
        {overviewError}
    </div>
)}
    {activeTab === "overview" &&
    !overviewLoading &&
    !overviewError &&
    overviewData && (
        <>
            {/* =========================
                OVERVIEW
            ========================= */}

            <div className="overview-heading">

                <div>
                    <h2>Good to see you again</h2>

                    <p className="content-subtitle">
                        Here's what's happening with FixItNow today.
                    </p>
                </div>

                <div className="date-filter">

                    <span>Period</span>

                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                    >
                        <option value="Last 7 Days">
                            Last 7 Days
                        </option>

                        <option value="Last 30 Days">
                            Last 30 Days
                        </option>

                        <option value="Last 3 Months">
                            Last 3 Months
                        </option>

                        <option value="Last 6 Months">
                            Last 6 Months
                        </option>

                        <option value="This Year">
                            This Year
                        </option>
                    </select>

                </div>

            </div>


            {/* STATISTICS */}

            <div className="stats-grid">

                <StatCard
                    title="Total Sales"
                    value="Rs. 1.24M"
                    change="↑ 12.5%"
                    description="vs last month"
                    icon={
                        <CircleDollarSign
                            size={19}
                            strokeWidth={1.8}
                        />
                    }
                />

                <StatCard
    title="New Customers"
    value={overviewData?.stats?.customers ?? 0}
    change=""
    description="total customers"
    icon={
        <Users
            size={19}
            strokeWidth={1.8}
        />
    }
/>

<StatCard
    title="Products"
    value={overviewData?.stats?.products ?? 0}
    change=""
    description="total products"
    icon={
        <Package
            size={19}
            strokeWidth={1.8}
        />
    }
/>

<StatCard
    title="Service Requests"
    value={overviewData?.stats?.serviceRequests ?? 0}
    change=""
    description="total requests"
    icon={
        <Wrench
            size={19}
            strokeWidth={1.8}
        />
    }
/>
            </div>


            {/* CHARTS */}

            <div className="charts-grid">

                <SalesChart />

     <CustomerChart
    data={overviewData?.customerChart?.monthly}
    thisMonth={overviewData?.customerChart?.thisMonth}
/>

            </div>


            {/* SECONDARY OVERVIEW */}

            <div className="secondary-content-grid">

             <ServiceChart
    serviceChart={overviewData?.serviceChart}
/>

               <RecentActivity
    activities={overviewData?.recentActivity || []}
/>

            </div>
        </>
    )}


   {activeTab === "customers" && (
    <CustomerPage />
)}

    {activeTab === "products" && (
    <>
        <ProductPage />
    </>
)}

{activeTab === "services" && <ServicePage />}
</section>


            </main>

        </div>
    );
}

export default AdminDashboard;