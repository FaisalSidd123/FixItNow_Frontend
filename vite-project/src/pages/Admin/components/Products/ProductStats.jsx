import "./ProductStats.css";

function ProductStats({products}) {

    const stats = [
        {
            title: "Total Products",
            value: 120
        },
        {
            title: "Total Stock",
            value: 450
        },
        {
            title: "Low Stock",
            value: 12
        },
        {
            title: "Out of Stock",
            value: 5
        }
    ];


    return (
        <div className="product-stats">

            {stats.map((item, index) => (

                <div 
                    className="product-stat-card"
                    key={index}
                >

                    <h3>{item.title}</h3>

                    <p>{item.value}</p>

                </div>

            ))}

        </div>
    );
}

export default ProductStats;