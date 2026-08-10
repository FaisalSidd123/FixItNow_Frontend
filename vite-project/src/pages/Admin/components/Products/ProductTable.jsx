import { MoreHorizontal } from "lucide-react";

import "./ProductTable.css";


const getStockStatus = (stock) => {

    const quantity = Number(stock || 0);

    if (quantity === 0) {
        return "Out of Stock";
    }

    if (quantity <= 10) {
        return "Low Stock";
    }

    return "In Stock";
};


function ProductTable({ products, setSelectedProduct }) {

    if (!products || products.length === 0) {

        return (
            <div className="product-empty">
                No products found.
            </div>
        );

    }


    return (

        <div className="product-table-container">

            <div className="product-table-wrapper">

                <table className="product-table">

                    <thead>

                        <tr>

                            <th>Product</th>

                            <th>Category</th>

                            <th>Price</th>

                            <th>Stock</th>

                            <th>Status</th>

                            <th></th>

                        </tr>

                    </thead>


                    <tbody>

                        {products.map((product) => {

                            const status =
                                getStockStatus(product.stock);

                            return (

                                <tr key={product.id}>

                                    {/* PRODUCT */}

                                    <td>

                                        <div className="product-name-cell">

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="product-image"
                                            />

                                            <div className="product-name-info">

                                                <strong>
                                                    {product.name}
                                                </strong>

                                                <span>
                                                    ID #{product.id}
                                                </span>

                                            </div>

                                        </div>

                                    </td>


                                    {/* CATEGORY */}

                                    <td>

                                        <span className="product-category">
                                            {product.category}
                                        </span>

                                    </td>


                                    {/* PRICE */}

                                    <td>

                                        <span className="product-price">
                                            Rs.{" "}
                                            {Number(
                                                product.price || 0
                                            ).toLocaleString()}
                                        </span>

                                    </td>


                                    {/* STOCK */}

                                    <td>

                                        <span className="product-stock">
                                            {product.stock}
                                        </span>

                                    </td>


                                    {/* STATUS */}

                                    <td>

                                        <span
                                            className={`product-status ${
                                                status
                                                    .toLowerCase()
                                                    .replace(
                                                        /\s+/g,
                                                        "-"
                                                    )
                                            }`}
                                        >

                                            <span className="status-dot"></span>

                                            {status}

                                        </span>

                                    </td>


                                    {/* ACTION */}

                                    <td>

                                        <button
                                            className="product-action-btn"
                                            aria-label={`View ${product.name}`}
                                            onClick={() =>
                                                setSelectedProduct(product)
                                            }
                                        >

                                            <MoreHorizontal
                                                size={18}
                                                strokeWidth={1.8}
                                            />

                                        </button>

                                    </td>

                                </tr>

                            );

                        })}

                    </tbody>

                </table>

            </div>

        </div>

    );
}


export default ProductTable;