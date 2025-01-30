import { Button } from "@material-ui/core";

const ProductGrid= (props)=>{
    const {item, addToCart, buyNow}= props;
    return (
        <div className="card">
            <div className="d-flex justify-content-between p-3">
                <p className="lead mb-0">{item.title}</p>
                <div
                className="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                style={{width: '35px', height: '35px'}}>
                <p className="text-white mb-0 small">x4</p>
                </div>
            </div>
            <img src={item.logoUrl} width={100} height={100}
                className="card-img-top" alt="Laptop" />
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <p className="small"><a href="#!" className="text-muted">Laptops</a></p>
                    <p className="small text-danger"><s>{item.retailPrice.price}</s></p>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0 justify-content-between" style={{maxInlineSize: '60%'}}>{item.name}</h5>
                    <h5 className="text-dark mb-0">{item.retailPrice.price}</h5>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted mb-0">Available: <span className="fw-bold">6</span></p>
                </div>
                <div className="d-flex justify-content-between mb-2">
                        <Button className="btn btn-outline-primary" type="button">
                            Add to cart
                        </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductGrid;