import ProductStats from "./ProductStats";
import ProductToolbar from "./ProductToolbar";
import ProductTable from "./ProductTable";

import ProductPagination from "./ProductPagination";
import { useState } from "react";

import ProductDetails from "./ProductDetails";

import "./ProductPage.css";


function ProductPage() {

const [selectedProduct, setSelectedProduct] = useState(null);
    const products = [

        {
            id: 1,
            name: "Solar Panel 550W",
            category: "Panels",
            price: 25000,
            stock: 20,
            status: "In Stock",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276"
        },


        {
            id: 2,
            name: "Solar Battery 200Ah",
            category: "Battery",
            price: 45000,
            stock: 5,
            status: "Low Stock",
            image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4"
        },


        {
            id: 3,
            name: "Solar Inverter",
            category: "Inverter",
            price: 60000,
            stock: 0,
            status: "Out of Stock",
            image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634"
        }

    ];



    return (

        <div className="product-page">


            <ProductStats 
                products={products}
            />


            <ProductToolbar />


            <ProductTable 
                products={products}
                 setSelectedProduct={setSelectedProduct}
            />
{
    selectedProduct && (

        <ProductDetails
            product={selectedProduct}
            closeDetails={() => setSelectedProduct(null)}
        />

    )
}

            <ProductPagination />


        </div>

    );

}


export default ProductPage;