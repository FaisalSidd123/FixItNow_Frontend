import { useState } from "react";
import {
    Search,
    Filter,
    ArrowUpDown,
} from "lucide-react";

import "./CustomerToolbar.css";

function CustomerToolbar({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    sortOrder,
    onSortChange
}) {
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <div className="customer-toolbar">

            {/* Search */}
            <div className="customer-search">

                <Search
                    size={17}
                    strokeWidth={1.8}
                />

<input
    id="customer-search"
    name="customer-search"
    type="text"
    placeholder="Search customers..."
    value={searchTerm}
    onChange={(e) => onSearchChange(e.target.value)}
    autoComplete="off"
/>
            </div>


            {/* Controls */}
            <div className="customer-toolbar-actions">

            <div className="customer-filter-wrapper">

    <button
        className="customer-filter-btn"
        onClick={() => setFilterOpen(!filterOpen)}
    >

        <Filter
            size={16}
            strokeWidth={1.8}
        />

        <span>
            {statusFilter === "All"
                ? "Filter"
                : statusFilter}
        </span>

    </button>


    {filterOpen && (
        <div className="customer-filter-menu">

            {["All", "Active", "Pending", "Inactive"].map(
                (status) => (

                    <button
                        key={status}
                        className={
                            statusFilter === status
                                ? "selected"
                                : ""
                        }
                        onClick={() => {
                            onStatusFilterChange(status);
                            setFilterOpen(false);
                        }}
                    >
                        {status === "All"
                            ? "All Customers"
                            : status}
                    </button>

                )
            )}

        </div>
    )}

</div>


                {/* Sort */}
              <button
    className="customer-sort-btn"
    onClick={() =>
        onSortChange(
            sortOrder === "newest"
                ? "oldest"
                : "newest"
        )
    }
>
    <ArrowUpDown
        size={16}
        strokeWidth={1.8}
    />

    <span>
        {sortOrder === "newest"
            ? "Newest"
            : "Oldest"}
    </span>
</button>
             
            </div>

        </div>
    );
}

export default CustomerToolbar;