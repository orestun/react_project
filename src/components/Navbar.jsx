import "../css/styles.css"
import logo from "../img/logo1.png"
import favourite from "../img/heart2.png"
import checkout from "../img/shopping_cart.png"
const Navbar = () => {
    return (
        <header>
            <img src={logo} alt="logo" width="60"/>
            <nav>
                <ul>
                    <li><a href="/"><strong>Main</strong></a></li>
                    <li><a href="/add-certificate"><strong>Add new item</strong></a></li>
                    <li><a href="/checkout"><strong>Checkout</strong></a></li>
                </ul>
            </nav>
            <div className="search_field">
                <input id="searchBar" type="search" name="search_certificate" placeholder="Type item name to find..."
                       data-search=""/>
                <select id="searchByCategory" name="category" autoComplete="off">
                    <option value="" selected={true} disabled hidden>Category</option>
                    <option value="sport">Sport</option>
                    <option value="cars">Cars</option>
                    <option value="shop">Shop</option>
                    <option value="education">Education</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="none">none</option>
                </select>
            </div>
            <div className="right_panel">
                <a href="#"><img src={favourite} alt="liked_items"/></a>
                <a href="/checkout"><img src={checkout} alt="checkout"/></a>
                <a href="/login">Login</a>
                <div className="vertical"></div>
                <a href="/sign-up">Sign up</a>
            </div>
        </header>
        );
};

export default Navbar;