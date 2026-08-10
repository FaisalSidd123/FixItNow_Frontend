import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ProductPagination.css";

function ProductPagination({
    currentPage,
    totalPages,
    totalProducts,
    productsPerPage,
    onPageChange
}) {

    if (totalProducts === 0) {
        return null;
    }

    const startItem =
        (currentPage - 1) * productsPerPage + 1;

    const endItem =
        Math.min(
            currentPage * productsPerPage,
            totalProducts
        );

    return (
        <div className="product-pagination">

            <span className="pagination-info">
                Showing {startItem}–{endItem} of {totalProducts} products
            </span>


            <div className="pagination-controls">

                <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() =>
                        onPageChange(currentPage - 1)
                    }
                >

                    <ChevronLeft size={17} />

                    Previous

                </button>


                <div className="pagination-pages">

                    {Array.from(
                        { length: totalPages },
                        (_, index) => {

                            const page = index + 1;

                            return (
                                <button
                                    key={page}
                                    className={
                                        currentPage === page
                                            ? "active-page"
                                            : ""
                                    }
                                    onClick={() =>
                                        onPageChange(page)
                                    }
                                >
                                    {page}
                                </button>
                            );

                        }
                    )}

                </div>


                <button
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                        onPageChange(currentPage + 1)
                    }
                >

                    Next

                    <ChevronRight size={17} />

                </button>

            </div>

        </div>
    );
}

export default ProductPagination;