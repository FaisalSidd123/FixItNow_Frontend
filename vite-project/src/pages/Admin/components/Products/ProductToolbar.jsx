import { Search, Filter, Plus } from "lucide-react";
import "./ProductToolbar.css";


function ProductToolbar() {

    return (

        <div className="product-toolbar">


            <div className="product-search">

                <Search size={18}/>

                <input 
                    type="text"
                    placeholder="Search products..."
                />

            </div>



            <div className="product-filters">


                <select>

                    <option>
                        All Categories
                    </option>

                    <option>
                        Panels
                    </option>

                    <option>
                        Batteries
                    </option>

                    <option>
                        Inverters
                    </option>

                </select>



                <select>

                    <option>
                        All Stock
                    </option>

                    <option>
                        In Stock
                    </option>

                    <option>
                        Low Stock
                    </option>

                    <option>
                        Out of Stock
                    </option>

                </select>


            </div>




            <button className="add-product-btn">

                <Plus size={18}/>

                Add Product

            </button>


        </div>

    );

}


export default ProductToolbar;