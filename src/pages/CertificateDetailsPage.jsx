import "../css/item_details.css";
import MainLayout from "../layout/MainLayout";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";

const CertificateDetailsPage = () => {
    const params = useParams();
    const id = params.id;

    const [certificate, setCertificate] = useState({name: ""})


    useEffect(() => {
        handleGetGiftCertificateResponse()
            .then((data) =>
                setCertificate(data))

    }, []);

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

    const handleTimeStampPhrase = ()=>{
        const createDate = certificate.createDate
        const duration = certificate.duration
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
        }else{
            phrase += timeStamp.days + " days "
        }
        if(timeStamp.hours === 1){
            phrase += "1 hour"
        }else if(timeStamp.hours === 0){
            phrase += ""
        }else{
            phrase += timeStamp.hours + " hours"
        }
        return phrase
    }

    countTimeStamp("2023-06-28", 30)
    const getGiftCertificateById = async (url) => {
        try {
            const response = (await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }));

            return await response;
        } catch (error) {
            throw error;
        }
    };

    const handleGetGiftCertificateResponse = async () => {
        const url = "http://localhost:8080/certificate/" + id;
        try {
            const response = await getGiftCertificateById(url)
            console.log(response)
            const responseJson = await response.json()

            if(response.status === 404 && responseJson.errorCode === 40401){

            }else if(response.ok){
                console.log(responseJson)
                return responseJson
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <MainLayout>
            <div className="item_details_container">
                <div className="item_details">
                    <div className="images"></div>
                    <div className="main_details">
                        <h3 className="details_row checkout_name">{certificate.name}</h3>
                        <p className="details_row short_desc">
                            {certificate.description}
                        </p>
                        <div className="details_row timestamp">
                            <p className="time_left">Time left to buy</p>
                            <h3 className="time">{handleTimeStampPhrase()}</h3>
                        </div>
                        <div className="details_row last_row">
                            <h3 className="price">{certificate.price}$</h3>
                            <a href="#" className="button">Add to cart</a>
                        </div>
                    </div>
                    <div className="long_description">
                        <h1 className="long_desc_title">Item details description</h1>
                        <p>
                            {certificate.description}
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
};

export default CertificateDetailsPage;