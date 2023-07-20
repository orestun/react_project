import "../css/index_style.css"
import sportCategoryImage from "../img/categories/sports.png"
import educationCategoryImage from "../img/categories/education.png"
import shopCategoryImage from "../img/categories/online-shopping.png"
import entertainmentCategoryImage from "../img/categories/popcorn.png"
import carsCategoryImage from "../img/categories/racing-car.png"
import restaurantCategoryImage from "../img/categories/restaurant.png"
import Pagination from "../components/Pagination";
import NothingFound from "../components/NothingFound";
import {useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import image from "../img/no-photo.png";
import favourite from "../img/favourite_icon.png"
import favouriteGreen from "../img/favourite_icon_green.png"
import NavbarWithSearch from "../components/NavbarWithSearchField";
import {useNavigate} from "react-router-dom";


const Certificates =  () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const cardsInOnePage = 12
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, []);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    let page;

    if (params.get("page") === null) {
        page = 1;
    } else {
        page = parseInt(params.get("page"))
    }

    const handleSearch = (query) => {
        setSearch(query)
        navigate('/')
    };

    const handleLocalCheckout = (card) => {
        const oldCheckout = JSON.parse(localStorage.getItem('checkout')) || []
        let newCheckout = oldCheckout
        if(oldCheckout.length === 0){
            newCheckout
                .push({
                    certificate: card,
                    count: 1
                })
        }else{
            let isCertificateIncluded = false
            newCheckout
                .forEach(certificate => certificate.certificate.id === card.id ? isCertificateIncluded = true: '')
            if(isCertificateIncluded){
                newCheckout
                    .forEach(certificate => certificate.certificate.id === card.id ? certificate.count++ : '')
            }else{
                newCheckout
                    .push({
                        certificate: card,
                        count: 1
                    })
            }
        }
        localStorage.setItem('checkout', JSON.stringify(newCheckout))
        console.log(localStorage.getItem('checkout'))
    }

    const countTimeStamp = (createDate, duration)=>{
        const oneDayInMilliseconds = (24 * 60 * 60 * 1000)
        const oneHourInMilliseconds = (60 * 60 * 1000)
        const endDateInMilliseconds = Date.parse(createDate) + convertDaysToMilliseconds(parseInt(duration))
        const expirationInMilliseconds = endDateInMilliseconds - Date.now()
        const days =  Math.floor(expirationInMilliseconds / oneDayInMilliseconds);
        const hours = Math.floor((expirationInMilliseconds - oneDayInMilliseconds * days) / oneHourInMilliseconds)

        return {
            days: days,
            hours: hours
        }

    }

    const convertDaysToMilliseconds = (days)=>{
        return days * 24 * 60 * 60 * 1000
    }

    const handleTimeStampPhrase = (createDate, duration)=>{
        if(createDate === undefined || duration === undefined){
            return ""
        }

        let phrase = "";
        const timeStamp = countTimeStamp(createDate, duration)
        if(timeStamp.days < 0 || (timeStamp.days <= 0 && timeStamp.hours <= 0) ){
            return "passed"
        }
        if(timeStamp.days === 1){
            phrase += "1 day "
        }else if(timeStamp.days === 0){
            if(timeStamp.hours === 1){
                phrase = "1 hour"
            }else{
                phrase = timeStamp.hours + " hours"
            }

        }
        else{
            phrase += timeStamp.days + " days"
        }
        return phrase
    }

    function clickOnFavourite(index){
        let img = index.currentTarget
        if (img.src.includes(favourite)){
            img.src = favouriteGreen
        }else{
            img.src = favourite
        }
    }

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/certificate/all");
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Помилка під час отримання даних з сервера:", error);
        }
    };

    const amountCertificates = data
        .filter((card) => card.name.toLowerCase().includes(search.toLowerCase())
        || card.description.toLowerCase().includes(search.toLowerCase()))
        .length

    return (
        <div>
            <NavbarWithSearch handleChange={handleSearch}></NavbarWithSearch>
            <div>
                <div className="category_container">
                    <div className="categories">
                        <a onClick="showByCategory('sport')">
                            <div className="category">
                                <img src={sportCategoryImage} alt="category_logo"/>
                                <h6>Sport</h6>
                            </div>
                        </a>
                        <a onClick="showByCategory('cars')">
                            <div className="category">
                                <img src={carsCategoryImage} alt="category_logo"/>
                                <h6>Cars</h6>
                            </div>
                        </a>
                        <a onClick="showByCategory('shop')">
                            <div className="category">
                                <img src={shopCategoryImage} alt="category_logo"/>
                                <h6>Shop</h6>
                            </div>
                        </a>
                        <a href="#" onClick="showByCategory('education')">
                            <div className="category">
                                <img src={educationCategoryImage} alt="category_logo"/>
                                <h6>Education</h6>
                            </div>
                        </a>
                        <a onClick="showByCategory('entertainment')">
                            <div className="category">
                                <img src={entertainmentCategoryImage} alt="category_logo"/>
                                <h6>Entertainment</h6>
                            </div>
                        </a>
                        <a onClick="showByCategory('restaurant')">
                            <div className="category">
                                <img src={restaurantCategoryImage} alt="category_logo"/>
                                <h6>Restaurant</h6>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="cards_container" id="cards_container">
                    {data
                        .filter((card) => card.name.toLowerCase().includes(search.toLowerCase())
                            || card.description.toLowerCase().includes(search.toLowerCase()))
                        .slice((page * cardsInOnePage) -cardsInOnePage, page * cardsInOnePage)
                        .map((card) =>
                            <div className="card">
                                <a className="main_image_link" href={"/certificate/" + card.id}>
                                    <img className="main_image" src={image} alt="main_image"/>
                                </a>
                                <div className="card_info">
                                    <div className="card_info_row">
                                        <h3 className="name">{card.name}</h3>
                                        <a>
                                            <img className="favourite_icon" src={favourite} alt="favourite"
                                                 onClick={clickOnFavourite}/>
                                        </a>

                                    </div>
                                    <div className="card_info_row">
                                        <p className="description">{card.description}</p>
                                        <p className="expiration">{handleTimeStampPhrase(card.createDate, card.duration) !== 'passed'
                                            ? "Expired in "+ handleTimeStampPhrase(card.createDate, card.duration)
                                            : (<p className="passed">Passed</p>)}</p>
                                    </div>
                                    <div className="card_info_row last-row">
                                        <h3 className="price">{card.price}$</h3>
                                        <button onClick={handleTimeStampPhrase(card.createDate, card.duration) !== "passed" ?
                                            () => handleLocalCheckout(card) : () => false} className="button">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                    )}
                </div>
                {amountCertificates === 0
                    ? <NothingFound></NothingFound>
                    : ""}
                {amountCertificates > cardsInOnePage
                    ? <Pagination PageNumber={page} Pages={Math.ceil(amountCertificates / cardsInOnePage)}></Pagination>
                    : ""}
            </div>
        </div>
    )
}
export default Certificates;