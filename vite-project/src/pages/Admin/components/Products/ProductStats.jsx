import "./ProductStats.css";

function ProductStats({ products = [] }) {

    const totalProducts = products.length;

    const totalStock = products.reduce(
        (total, product) =>
            total + Number(product.stock || 0),
        0
    );

    const lowStock = products.filter(
        (product) =>
            Number(product.stock || 0) > 0 &&
            Number(product.stock || 0) <= 10
    ).length;

    const outOfStock = products.filter(
        (product) =>
            Number(product.stock || 0) === 0
    ).length;


    const stats = [
        {
            title: "Total Products",
            value: totalProducts
        },
        {
            title: "Total Stock",
            value: totalStock
        },
        {
            title: "Low Stock",
            value: lowStock
        },
        {
            title: "Out of Stock",
            value: outOfStock
        }
    ];


    return (
        <div className="product-stats">

            {stats.map((item, index) => (

                <div
                    className="product-stat-card"
                    key={index}
                >

                    <h3>
                        {item.title}
                    </h3>

                    <p>
                        {item.value}
                    </p>

                </div>

            ))}

        </div>
    );
}

export default ProductStats;