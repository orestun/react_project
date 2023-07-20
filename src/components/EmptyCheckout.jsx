import "../css/index_style.css"
import emptyCart from "../img/empty-cart.png";

const EmptyCheckout = () =>{
    return (
        <div className="nothing_found show">
            <h1>Your checkout is empty, keep shopping</h1>
            <img src={emptyCart} alt="empty cart"/>
        </div>
    )
}

export default EmptyCheckout