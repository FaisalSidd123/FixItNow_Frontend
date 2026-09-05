import {
    ChevronLeft,
    ChevronRight
} from "lucide-react";

import "./CustomerPagination.css";

function CustomerPagination({
    currentPage,
    totalPages,
    totalCustomers,
    startIndex,
    endIndex,
    onPageChange
}) {

    return (

        <div className="customer-pagination">

            <span className="pagination-info">

                Showing{" "}
                {totalCustomers === 0 ? 0 : startIndex + 1}
                –
                {endIndex}
                {" "}of{" "}
                {totalCustomers} customers

            </span>


            <div className="pagination-controls">

                {/* PREVIOUS */}

                <button
                    className="pagination-btn"
                    aria-label="Previous page"
                    onClick={() =>
                        onPageChange(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                >

                    <ChevronLeft
                        size={16}
                        strokeWidth={1.8}
                    />

                </button>


                {/* PAGE NUMBERS */}

                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((page) => (

                    <button
                        key={page}
                        className={`pagination-page ${
                            currentPage === page
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            onPageChange(page)
                        }
                    >

                        {page}

                    </button>

                ))}


                {/* NEXT */}

                <button
                    className="pagination-btn"
                    aria-label="Next page"
                    onClick={() =>
                        onPageChange(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                >

                    <ChevronRight
                        size={16}
                        strokeWidth={1.8}
                    />

                </button>

            </div>

        </div>

    );

}

export default CustomerPagination;