import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ProductPagination.css";


function ProductPagination() {

    return (

        <div className="product-pagination">


            <button className="pagination-btn">

                <ChevronLeft size={18}/>

                Previous

            </button>



            <div className="pagination-pages">

                <button className="active-page">
                    1
                </button>

                <button>
                    2
                </button>

                <button>
                    3
                </button>

            </div>



            <button className="pagination-btn">

                Next

                <ChevronRight size={18}/>

            </button>


        </div>

    );

}


export default ProductPagination;