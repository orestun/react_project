import "../css/index_style.css"
import image from "../img/no-photo.png"
import favourite from "../img/favourite_icon.png"

const Card = (cardData, expiration)=>{
    return (
        <div className="card">
            <a className="main_image_link" href="#">
                <img className="main_image" src={image} alt="main_image"/>
            </a>
            <div className="card_info">
                <div className="card_info_row">
                    <h3 className="checkout_name">${cardData.name}</h3>
                    <a href="#">
                        <img className="favourite_icon" src={favourite} alt="favourite"
                             onClick="clickOnFavourite(this); return false"/>
                    </a>
                </div>
                <div className="card_info_row">
                    <p className="checkout_description">${cardData.description}</p>
                    <p className="expiration">${expiration}</p>
                </div>
                <div className="card_info_row last_row">
                    <h3 className="price">${cardData.price}$</h3>
                    <a href="#" className="button">Add to cart</a>
                </div>
            </div>
        </div>
        )
}
export default Card;