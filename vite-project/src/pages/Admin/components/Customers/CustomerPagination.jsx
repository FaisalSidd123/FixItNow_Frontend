import {
    ChevronLeft,
    ChevronRight
} from "lucide-react";

import "./CustomerPagination.css";

function CustomerPagination() {

    return (
        <div className="customer-pagination">

            <span className="pagination-info">
                Showing 1–6 of 1,248 customers
            </span>

            <div className="pagination-controls">

                <button
                    className="pagination-btn"
                    aria-label="Previous page"
                >
                    <ChevronLeft
                        size={16}
                        strokeWidth={1.8}
                    />
                </button>

                <button className="pagination-page active">
                    1
                </button>

                <button className="pagination-page">
                    2
                </button>

                <button className="pagination-page">
                    3
                </button>

                <button className="pagination-page">
                    4
                </button>

                <button className="pagination-page">
                    5
                </button>

                <button
                    className="pagination-btn"
                    aria-label="Next page"
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