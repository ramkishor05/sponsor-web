import MediaCard from "../../views/cust/orders/Product";
import ProductGrid from "./ProductGrid";

const ProductGrids= (props)=>{
    const {items}= props;
    return (
        <section>
           <div className="row">
                {
                    items.map(item=>
                        <div className="col-md-4 col-sm-3 col-lg-3 mb-1 mb-lg-0 py-1">
                            <MediaCard item={item} {...props}/>
                        </div>
                    )
                }
            </div>
          </section>
        )
    }
    
    export default ProductGrids;