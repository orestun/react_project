import "../css/add_new_item_style.css"
import MainLayout from "../layout/MainLayout";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
const AddNewItem = () => {

    const [price, setPrice] = useState(0)
    const [nameError, setNameError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')

    const navigate = useNavigate()

    const sendPostRequestForAddingNewCertificate = async (url, certificateData, token) => {
        try {
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer '+ token
                },
                body: JSON.stringify(certificateData)
            });

            return await response;
        } catch (error) {
            throw error;
        }
    }

    const addNewCertificate = async (certificateData) => {
        const url = "http://localhost:8080/certificate"
        const token = localStorage.getItem('token')

        if (token === undefined || token === null) {
            navigate('/login')
        } else{
            try{
                const response = await sendPostRequestForAddingNewCertificate(url, certificateData, token)
                if(response.status === 403){
                    navigate('/login')
                }else{
                    const responseJson = await response.json()

                    if(response.status === 403){
                        navigate('/login')
                    } else if(response.status === 400){
                        if(responseJson === 'Your jwt token is expired, refresh it'){
                            navigate('/login')
                        }else if(responseJson.errorCode === 40001){
                            if(responseJson.errorMassage.includes('Name field')){
                                setNameError(responseJson.errorMassage)
                            }else if(responseJson.errorMassage.includes('Description field')){
                                setDescriptionError(responseJson.errorMassage)
                            }
                        }
                    }else if(response.ok){
                        navigate('/')
                    }
                    return responseJson
                }
            } catch (error) {
                throw error;
            }
        }


    }

    const handleCanselButton = ()=>{
        navigate('/')
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const description = event.target.elements.short_description.value;
        const duration = parseInt(event.target.elements.duration.value);
        const price = parseFloat(event.target.elements.price.value);
        const tags = event.target.elements.category.value;

        const certificateData = {
            name: name,
            description: description,
            duration: duration,
            price: price,
            tags: [{
                name: tags
            }]
        };
        addNewCertificate(certificateData)
    };

    const handleNameError = () => {
        setNameError('')
    }

    const handleDescriptionError = () => {
        setDescriptionError('')
    }


    return (
        <MainLayout>
            <div>
                <div className="add_new_title">
                    <h3>Add new coupon</h3>
                </div>
                <div className="add_new_item_form">
                    <form onSubmit={handleSubmit}>
                        <div className="input_fields">
                            <div className="adding_field">
                                <label htmlFor="company">Company</label>
                                <input type="text" id="company" name="company"/>
                            </div>
                            <div className="adding_field">
                                <label htmlFor="category" autocomplete="off">Category</label>
                                <select name="category" id="category" required={true}>
                                    <option value="sport">Sport</option>
                                    <option value="cars">Cars</option>
                                    <option value="shop">Shop</option>
                                    <option value="education">Education</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="restaurant">Restaurant</option>
                                </select>
                            </div>
                            <div className="adding_field">
                                <label htmlFor="duration">Duration</label>
                                <input type="number" min={0} id="duration" name="duration" required={true}/>
                            </div>
                            <div className="adding_field">
                                <label htmlFor="price">Price</label>
                                <input type="text" pattern="[0-9]+?[.]?([0-9]+)?" step="any" id="price" name="price" value={price}
                                       onChange={(e)=>e.target.validity.valid ? setPrice(e.target.value):e}
                                       required={true}/>
                            </div>
                            <div className="adding_field images">
                                <label htmlFor="images">Images</label>
                                <input type="file" id="images" name="images" accept="image/png, image/jpeg" multiple/>
                            </div>
                            <div className="adding_field">
                                <label htmlFor="name">Item name</label>
                                <input type="text" id="name" name="name" required={true} onInput={handleNameError}/>
                                {nameError && (<p className="errorMassage show">{nameError}</p>)}
                            </div>
                            <div className="adding_field new_item_description">
                                <label htmlFor="short_description" >Short description</label>
                                <textarea id="short_description" name="short_description" required={true} onChange={handleDescriptionError}></textarea>
                                {descriptionError && (<p className="errorMassage show">{descriptionError}</p>)}
                            </div>
                            <div className="adding_field new_item_description">
                                <label htmlFor="long_description">Long description</label>
                                <textarea id="long_description" name="long_description"></textarea>
                            </div>
                            <div className="adding_field"></div>
                            <div className="register_buttons">
                                <button className="cansel_button" onClick={handleCanselButton}>Cansel</button>
                                <button className="save_button" type="submit">Save</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </MainLayout>
    )
}

export default AddNewItem;