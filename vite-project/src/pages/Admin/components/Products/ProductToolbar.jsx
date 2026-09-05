import { useState } from "react";
import {
    Search,
    Filter,
    ArrowUpDown,
       Plus
} from "lucide-react";

import "./ProductToolbar.css";

function ProductToolbar({
    searchTerm,
    onSearchChange,
    categoryFilter,
    onCategoryFilterChange,
    sortOption,
    onSortChange,
      onAddProduct
}) {

    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const categories = [
        "All",
        "Panels",
        "Battery",
        "Inverter"
    ];

    const sortOptions = [
        "Newest",
        "Name A-Z",
        "Name Z-A",
        "Price Low",
        "Price High",
        "Stock Low",
        "Stock High"
    ];

    return (
        <div className="product-toolbar">

            {/* SEARCH */}

            <div className="product-search">

                <Search
                    size={17}
                    strokeWidth={1.8}
                />

                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    autoComplete="off"
                />

            </div>


            {/* ACTIONS */}

            <div className="product-toolbar-actions">


                {/* CATEGORY FILTER */}

                <div className="product-filter-wrapper">

                    <button
                        className="product-filter-btn"
                        onClick={() =>
                            setFilterOpen(!filterOpen)
                        }
                    >

                        <Filter
                            size={16}
                            strokeWidth={1.8}
                        />

                        <span>
                            {categoryFilter === "All"
                                ? "Filter"
                                : categoryFilter}
                        </span>

                    </button>


                    {filterOpen && (

                        <div className="product-filter-menu">

                            {categories.map((category) => (

                                <button
                                    key={category}
                                    className={
                                        categoryFilter === category
                                            ? "selected"
                                            : ""
                                    }
                                    onClick={() => {

                                        onCategoryFilterChange(
                                            category
                                        );

                                        setFilterOpen(false);

                                    }}
                                >
                                    {category === "All"
                                        ? "All Products"
                                        : category}
                                </button>

                            ))}

                        </div>

                    )}

                </div>

               {/* SORT */}

<div className="product-sort-wrapper">

    <button
        className="product-sort-btn"
        onClick={() =>
            setSortOpen(!sortOpen)
        }
    >

        <ArrowUpDown
            size={16}
            strokeWidth={1.8}
        />

        <span>Sort</span>

    </button>


    {sortOpen && (

        <div className="product-sort-menu">

            {sortOptions.map((option) => (

                <button
                    key={option}
                    className={
                        sortOption === option
                            ? "selected"
                            : ""
                    }
                    onClick={() => {

                        onSortChange(option);

                        setSortOpen(false);

                    }}
                >
                    {option}
                </button>

            ))}

        </div>

    )}

</div>


{/* ADD PRODUCT */}

<button
    className="add-product-btn"
    onClick={onAddProduct}
>

    <Plus
        size={16}
        strokeWidth={1.8}
    />

    <span>
        Add Product
    </span>

</button>

              
  </div>
            </div>


    );
}

export default ProductToolbar;