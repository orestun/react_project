import "../css/checkout.css"
import MainLayout from "../layout/MainLayout";
import image from "../img/image_blue.png"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import EmptyCheckout from "../components/EmptyCheckout";


const CheckoutPage = () => {

    const [certificates, setCertificates]  = useState([])

    const navigate = useNavigate()

    useEffect( () => {
        setCertificates(JSON.parse(localStorage.getItem('checkout')) || []);
    }, []);


    const setTotalInLoad = ()=>{
        let total = 0;
        if(certificates.length !== 0){
            certificates.forEach((data) => total += (data.count * data.certificate.price))
        }
        return total
    }

    const handleCanselButton = () => {
        localStorage.removeItem('checkout')
        window.location.reload()
    }

    const sendPostRequestForCreatingNewOrders = async (url, token) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer '+ token
                }
            });

            return await response;
        } catch (error) {
            throw error;
        }
    }

    const handleCheckoutButton = async () => {
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('token')

        if (userId === null || token === undefined || token === null) {
            navigate('/login')
        } else {
            for (let i = 0; i < certificates.length; i++) {
                const currentCertificate = certificates.at(i)
                let response
                if (currentCertificate.count === 1) {
                    response = await sendPostRequestForCreatingNewOrders(
                        generateUrlForCreatingAnOrder(userId, currentCertificate.certificate.id),
                        token)
                    handleResponseForCreatingOrder(response)
                } else {
                    for (let count = 0; count < currentCertificate.count; count++) {
                        response = await sendPostRequestForCreatingNewOrders(
                            generateUrlForCreatingAnOrder(userId, currentCertificate.certificate.id),
                            token)
                        handleResponseForCreatingOrder(response)
                    }
                }
            }
            localStorage.removeItem('checkout')
            window.location.reload()
        }
    }

    const handleResponseForCreatingOrder = (response) => {
        if(response.status === 403){
        }
    }

    const generateUrlForCreatingAnOrder = (userId, certificateId) => {
        return "http://localhost:8080/order?user-ID="+userId+"&gift-certificate-ID="+certificateId
    }

    return (
        <MainLayout>
            <div>
                <div className="checkout_title">
                    <h4>Checkout</h4>
                </div>
                <div className="checkout_certificate">
                    {certificates.map((data) => {
                        return (
                                <div className="certificate_body">
                                    <div className="image">
                                        <img src={image} alt="image"/>
                                    </div>
                                    <div className="description_container">
                                        <h3 className="checkout_name">{data.certificate.name}</h3>
                                        <p className="checkout_description">{data.certificate.description}</p>
                                    </div>
                                    <div className="checkout_count">
                                        <h6 className="amount_title">amount</h6>
                                        <h6 className="amount">{data.count}</h6>
                                    </div>
                                    <div className="checkout_price">
                                        <h3>{data.count * data.certificate.price}$</h3>
                                    </div>
                                </div>
                            )
                    })}
                    {certificates.length > 0 ?
                        <div>
                            <div className="certificate_body total_price_item">
                                <div className="total">
                                    <h3 className="total_title">Total</h3>
                                    <h3 id="total_price">{setTotalInLoad() + '$'}</h3>
                                </div>
                            </div>
                            <div className="certificate_body">
                                <div className="checkout_buttons">
                                    <button className="cansel_button" onClick={handleCanselButton}>Cansel</button>
                                    <button className="checkout_button" onClick={handleCheckoutButton}>Checkout</button>
                                </div>
                            </div>
                        </div>
                        :
                        <EmptyCheckout/>
                    }
                </div>
            </div>
        </MainLayout>
    )
}
export default CheckoutPage