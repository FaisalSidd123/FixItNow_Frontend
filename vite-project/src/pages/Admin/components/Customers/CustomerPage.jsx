import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";

import CustomerStats from "./CustomerStats";
import CustomerToolbar from "./CustomerToolbar";
import CustomerTable from "./CustomerTable";
import CustomerPagination from "./CustomerPagination";
import CustomerDetails from "./CustomerDetails";

import "./CustomerPage.css";

function CustomerPage() {
const { currentUser } = useAuth();
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("newest");

    const [currentPage, setCurrentPage] = useState(1);

const customersPerPage = 6;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

useEffect(() => {

    const fetchCustomers = async () => {

        if (!currentUser) {
            setError("Admin user is not authenticated.");
            setLoading(false);
            return;
        }

        try {

            setLoading(true);
            setError("");

            const token = await currentUser.getIdToken();

            const response = await fetch(
                "http://localhost:5000/api/users/customers",
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {

                const errorData = await response.json().catch(() => ({}));

                throw new Error(
                    errorData.error || "Failed to fetch customers"
                );

            }

            const data = await response.json();

            console.log("Customers received:", data);

            setCustomers(data.customers || []);

        } catch (err) {

            console.error("Customer fetch error:", err);

            setError(err.message || "Unable to load customers.");

        } finally {

            setLoading(false);

        }

    };

    fetchCustomers();

}, [currentUser]);


    const filteredCustomers = customers.filter((customer) => {

        const search = searchTerm.toLowerCase();

        const name = customer.display_name || "";
        const email = customer.email || "";

        const matchesSearch =
            name.toLowerCase().includes(search) ||
            email.toLowerCase().includes(search);
const matchesStatus =
    statusFilter === "All";

        return matchesSearch && matchesStatus;

    });
    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const dateA = new Date(a.created_at || 0);
    const dateB = new Date(b.created_at || 0);

    if (sortOrder === "newest") {
        return dateB - dateA;
    }

    if (sortOrder === "oldest") {
        return dateA - dateB;
    }

    return 0;
});
useEffect(() => {
    setCurrentPage(1);
}, [searchTerm, statusFilter, sortOrder]);

   const totalCustomers = sortedCustomers.length;

const totalPages = Math.ceil(
    totalCustomers / customersPerPage
);

const startIndex =
    (currentPage - 1) * customersPerPage;

const endIndex = Math.min(
    startIndex + customersPerPage,
    totalCustomers
);

const paginatedCustomers =
    sortedCustomers.slice(
        startIndex,
        endIndex
    );

    if (loading) {

        return (
            <div className="customer-loading">
                Loading customers...
            </div>
        );

    }


    if (error) {

        return (
            <div className="customer-error">
                {error}
            </div>
        );

    }


    return (

        <>

            <div className="overview-heading">

                <div>

                    <h2>Customers</h2>

                    <p className="content-subtitle">
                        Manage and view all FixItNow customers.
                    </p>

                </div>

            </div>


            <CustomerStats
                customers={customers}
            />


          <CustomerToolbar
    searchTerm={searchTerm}
    onSearchChange={setSearchTerm}
    statusFilter={statusFilter}
    onStatusFilterChange={setStatusFilter}
    sortOrder={sortOrder}
    onSortChange={setSortOrder}
/>


            <CustomerTable
    customers={paginatedCustomers}
    onCustomerSelect={setSelectedCustomer}
/>


            <CustomerPagination
    currentPage={currentPage}
    totalPages={totalPages}
    totalCustomers={totalCustomers}
    startIndex={startIndex}
    endIndex={endIndex}
    onPageChange={setCurrentPage}
/>


            <CustomerDetails
                customer={selectedCustomer}
                onClose={() => setSelectedCustomer(null)}
            />

        </>

    );

}

export default CustomerPage;