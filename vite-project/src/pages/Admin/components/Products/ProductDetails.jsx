import { X, Pencil } from "lucide-react";
import "./ProductDetails.css";


function ProductDetails({product, closeDetails}) {


    return (

        <div className="product-details-overlay">


            <div className="product-details-card">


                <button 
                    className="close-details"
                    onClick={closeDetails}
                >

                    <X size={20}/>

                </button>



                <img
                    src={product.image}
                    alt={product.name}
                    className="details-image"
                />



                <h2>
                    {product.name}
                </h2>


                <div className="details-info">

                    <p>
                        Category:
                        <span>{product.category}</span>
                    </p>


                    <p>
                        Price:
                        <span>Rs {product.price}</span>
                    </p>


                    <p>
                        Stock:
                        <span>{product.stock}</span>
                    </p>


                    <p>
                        Status:
                        <span>{product.status}</span>
                    </p>


                </div>



                <button className="edit-product-btn">

                    <Pencil size={17}/>

                    Edit Product

                </button>


            </div>


        </div>

    );

}


export default ProductDetails;