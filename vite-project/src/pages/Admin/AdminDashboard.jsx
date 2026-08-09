import "./AdminDashboard.css";
import logo from "../../assets/FixItNow Logo.png";
import StatCard from "./components/overview/StatCard";
import SalesChart from "./components/overview/SalesChart";
import CustomerChart from "./components/overview/CustomerChart";
import ServiceChart from "./components/overview/ServiceChart";
import RecentActivity from "./components/overview/RecentActivity";
import { useState } from "react";
import CustomerPage from "./components/customers/CustomerPage";
import ProductPage from "./components/products/ProductPage";
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

                    <button className="nav-item">
                       <Wrench size={19} strokeWidth={1.8} />
                        <span>Services</span>
                    </button>

                </nav>

                <div className="sidebar-bottom">

                    <button className="nav-item">
                       <Settings size={19} strokeWidth={1.8} />
                        <span>Settings</span>
                    </button>

                    <button className="nav-item logout">
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

                       <div className="admin-search">
                      <Search size={17} />
    
                         <input
                        type="text"
                            placeholder="Search..."

                            />
                            </div>

                       <button
    className="notification-btn"
    aria-label="Notifications"
>
    <Bell size={18} />

    <span className="notification-dot"></span>
</button>

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

    {activeTab === "overview" && (
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
                    value="248"
                    change="↑ 8.4%"
                    description="vs last month"
                    icon={
                        <Users
                            size={19}
                            strokeWidth={1.8}
                        />
                    }
                />

                <StatCard
                    title="Products Sold"
                    value="386"
                    change="↑ 15.2%"
                    description="vs last month"
                    icon={
                        <Package
                            size={19}
                            strokeWidth={1.8}
                        />
                    }
                />

                <StatCard
                    title="Service Requests"
                    value="124"
                    change="18"
                    description="pending requests"
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

                <CustomerChart />

            </div>


            {/* SECONDARY OVERVIEW */}

            <div className="secondary-content-grid">

                <ServiceChart />

                <RecentActivity />

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

</section>


            </main>

        </div>
    );
}

export default AdminDashboard;