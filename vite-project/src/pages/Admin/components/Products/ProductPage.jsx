import { useEffect, useState } from "react";

import { fetchProducts, deleteProduct } from "../../../../api/productApi";
import ProductStats from "./ProductStats";
import ProductToolbar from "./ProductToolbar";
import ProductTable from "./ProductTable";
import ProductPagination from "./ProductPagination";
import ProductDetails from "./ProductDetails";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

import "./ProductPage.css";

function ProductPage() {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    const [addProductOpen, setAddProductOpen] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleProductAdded = (newProduct) => {

    setProducts((previousProducts) => [
        newProduct,
        ...previousProducts
    ]);

};

    const [searchTerm, setSearchTerm] = useState("");
const [categoryFilter, setCategoryFilter] = useState("All");
const [sortOption, setSortOption] = useState("Newest");

const [currentPage, setCurrentPage] = useState(1);

const productsPerPage = 6;
   useEffect(() => {

    const loadProducts = async () => {

        try {

            setLoading(true);
            setError("");

            const products = await fetchProducts();

            console.log("Products received:", products);

            setProducts(products);

        } catch (err) {

            console.error("Product fetch error:", err);

            setError(
                err.message ||
                "Unable to load products."
            );

        } finally {

            setLoading(false);

        }

    };

    loadProducts();

}, []);

const handleEditProduct = (product) => {

    setEditingProduct(product);

    setSelectedProduct(null);

};
const handleDeleteProduct = async (product) => {

    const confirmed = window.confirm(
        `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) {
        return;
    }


    try {

        await deleteProduct(product.id);


        setProducts((previousProducts) =>
            previousProducts.filter(
                (item) => item.id !== product.id
            )
        );


        setSelectedProduct(null);


    } catch (error) {

        console.error(
            "Delete product error:",
            error
        );

        alert(
            error.message ||
            "Failed to delete product."
        );

    }
};

const filteredProducts = products
    .filter((product) => {

        const search = searchTerm.toLowerCase();

        const matchesSearch =
            product.name
                ?.toLowerCase()
                .includes(search) ||
            product.category
                ?.toLowerCase()
                .includes(search);

        const matchesCategory =
            categoryFilter === "All" ||
            product.category === categoryFilter;

        return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {

        switch (sortOption) {

            case "Name A-Z":
                return a.name.localeCompare(b.name);

            case "Name Z-A":
                return b.name.localeCompare(a.name);

            case "Price Low":
                return Number(a.price) - Number(b.price);

            case "Price High":
                return Number(b.price) - Number(a.price);

            case "Stock Low":
                return Number(a.stock) - Number(b.stock);

            case "Stock High":
                return Number(b.stock) - Number(a.stock);

            default:
                return 0;
        }

    });
    const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
);

const startIndex =
    (currentPage - 1) * productsPerPage;

const paginatedProducts =
    filteredProducts.slice(
        startIndex,
        startIndex + productsPerPage
    );
useEffect(() => {
    setCurrentPage(1);
}, [searchTerm, categoryFilter, sortOption]);

    if (loading) {

        return (
            <div className="product-loading">
                Loading products...
            </div>
        );

    }


    if (error) {

        return (
            <div className="product-error">
                {error}
            </div>
        );

    }


    return (

        <div className="product-page">
<div className="overview-heading">
    <div>
        <h2>Products</h2>

        <p className="content-subtitle">
            Manage and view all FixItNow products.
        </p>
    </div>
</div>
            <ProductStats
                products={products}
            />


          <ProductToolbar
    searchTerm={searchTerm}
    onSearchChange={setSearchTerm}
    categoryFilter={categoryFilter}
    onCategoryFilterChange={setCategoryFilter}
    sortOption={sortOption}
    onSortChange={setSortOption}
      onAddProduct={() => setAddProductOpen(true)}
/>


    <ProductTable
    products={paginatedProducts}
    setSelectedProduct={setSelectedProduct}
/>


            {selectedProduct && (

               <ProductDetails
    product={selectedProduct}
    closeDetails={() =>
        setSelectedProduct(null)
    }
    onEdit={handleEditProduct}
    onDelete={handleDeleteProduct}
/>



            )}
            {editingProduct && (

    <EditProduct
        product={editingProduct}

        onClose={() =>
            setEditingProduct(null)
        }

        onProductUpdated={(updatedProduct) => {

            setProducts((previousProducts) =>
                previousProducts.map((product) =>
                    product.id === updatedProduct.id
                        ? updatedProduct
                        : product
                )
            );

        }}
    />

)}
{addProductOpen && (
    <AddProduct
        onClose={() => setAddProductOpen(false)}
        onProductAdded={handleProductAdded}
    />
)}


        <ProductPagination
    currentPage={currentPage}
    totalPages={totalPages}
    totalProducts={filteredProducts.length}
    productsPerPage={productsPerPage}
    onPageChange={setCurrentPage}
/>

        </div>

    );

}

export default ProductPage;