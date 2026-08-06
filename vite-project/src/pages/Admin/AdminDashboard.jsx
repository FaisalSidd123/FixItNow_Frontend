import "./AdminDashboard.css";
import logo from "../../assets/FixItNow Logo.png";
import StatCard from "./components/overview/StatCard";
import SalesChart from "./components/overview/SalesChart";
import CustomerChart from "./components/overview/CustomerChart";
import ServiceChart from "./components/overview/ServiceChart";
import RecentActivity from "./components/overview/RecentActivity";
import { useState } from "react";
import CustomerStats from "./components/customers/CustomerStats";
import CustomerToolbar from "./components/customers/CustomerToolbar";
import CustomerTable from "./components/customers/CustomerTable";
import CustomerPagination from "./components/customers/CustomerPagination";
import CustomerDetails from "./components/customers/CustomerDetails";
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
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("overview");
    const [statusFilter, setStatusFilter] = useState("All");
 
    const customers = [
    {
        id: 1,
        name: "Ali Khan",
        email: "ali.khan@example.com",
        phone: "+92 300 1234567",
        services: 4,
        joined: "Aug 02, 2026",
        status: "Active"
    },
    {
        id: 2,
        name: "Sara Ahmed",
        email: "sara.ahmed@example.com",
        phone: "+92 301 7654321",
        services: 2,
        joined: "Aug 01, 2026",
        status: "Active"
    },
    {
        id: 3,
        name: "Hamza Ali",
        email: "hamza.ali@example.com",
        phone: "+92 302 9876543",
        services: 6,
        joined: "Jul 28, 2026",
        status: "Active"
    },
    {
        id: 4,
        name: "Ayesha Khan",
        email: "ayesha.khan@example.com",
        phone: "+92 303 4567890",
        services: 1,
        joined: "Jul 25, 2026",
        status: "Pending"
    },
    {
        id: 5,
        name: "Usman Raza",
        email: "usman.raza@example.com",
        phone: "+92 304 1122334",
        services: 3,
        joined: "Jul 21, 2026",
        status: "Active"
    },
    {
        id: 6,
        name: "Maham Shah",
        email: "maham.shah@example.com",
        phone: "+92 305 5566778",
        services: 2,
        joined: "Jul 18, 2026",
        status: "Inactive"
    }
];
const filteredCustomers = customers.filter((customer) => {

    const search = searchTerm.toLowerCase();

    const matchesSearch =
        customer.name.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search) ||
        customer.phone.includes(search);

    const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

    return matchesSearch && matchesStatus;
});
   
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

                    <button className="nav-item">
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
        <>
            {/* =========================
                CUSTOMERS
            ========================= */}

            <div className="overview-heading">

                <div>

                    <h2>Customers</h2>

                    <p className="content-subtitle">
                        Manage and view all FixItNow customers.
                    </p>

                </div>

            </div>


            {/* CUSTOMER STATISTICS */}

            <CustomerStats />


            {/* CUSTOMER SEARCH / CONTROLS */}

            <CustomerToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
    onStatusFilterChange={setStatusFilter}
            />


            {/* CUSTOMER TABLE */}

            <CustomerTable
                customers={filteredCustomers}
                onCustomerSelect={setSelectedCustomer}
            />


            {/* PAGINATION */}

            <CustomerPagination />

        </>
    )}

</section>
<CustomerDetails
    customer={selectedCustomer}
    onClose={() => setSelectedCustomer(null)}
/>

            </main>

        </div>
    );
}

export default AdminDashboard;