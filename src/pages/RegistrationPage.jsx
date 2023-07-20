import "../css/registration.css"
import MainLayout from "../layout/MainLayout";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const RegistrationPage = () => {
    document.body.style.background = "#f0f0f0"

    const [emailExistErrorMassage, setEmailExistErrorMassage] = useState('')
    const [nameError, setNameError] = useState('')
    const [surnameError, setSurnameError] = useState('')
    const [passwordsNotMatchMassage, setPasswordsNotMatchMassage] = useState('')

    const navigate = useNavigate()
    const sendPostRequestForRegisterNewUser = async (url, userData) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(userData)
            });

            return await response;
        } catch (error) {
            throw error;
        }
    }

    const signUp = async (userData) => {
        const url = "http://localhost:8080/sign-up-user"
        try{
            const response = await sendPostRequestForRegisterNewUser(url, userData)
            const responseJson = await response.json()

            if(response.status === 409){
                if(responseJson.errorCode === 40901){
                    setEmailExistErrorMassage(responseJson.errorMassage)
                }
            } else if(response.status === 400){
                if(responseJson.errorCode === 40001){
                    if(responseJson.errorMassage.includes('Name field')){
                        setNameError(responseJson.errorMassage)
                    } else if(responseJson.errorMassage.includes('Surname field')){
                        setSurnameError(responseJson.errorMassage)
                    }
                }
            } else if(response.ok){
                const jwtToken = await responseJson.token
                localStorage.setItem("token", jwtToken)
                localStorage.setItem("username", userData.email)
                localStorage.setItem("userId", responseJson.user.id)
                navigate('/')
            }
            return responseJson
        } catch (error) {
            throw error;
        }
    }

    const handleEmailField = () => {
        setEmailExistErrorMassage('')
    }

    const handleNameField = () => {
        setNameError('')
    }

    const handleSurnameField = () => {
        setSurnameError('')
    }

    const handleRepeatPassword = () => {
        const password = document.getElementsByName("password").item(0)
        const repeatPassword = document.getElementsByName("repeatPassword").item(0)

        if(password.value.length < 8
            || password.value === repeatPassword.value
            || repeatPassword.value === ''){
            setPasswordsNotMatchMassage('')
        }else {
            setPasswordsNotMatchMassage('Password do not match :(')
        }
    }

    const handlePassword = () => {
        handleRepeatPassword()
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.elements.firthName.value;
        const surName = event.target.elements.secondName.value;
        const password = event.target.elements.password.value;
        const repeatPassword = event.target.elements.repeatPassword.value;
        const email = event.target.elements.email.value;

        const userData = {
            name: name,
            surname: surName,
            email: email,
            password: password,
            repeatPassword: repeatPassword
        };
        signUp(userData)
    };

    return (
        <MainLayout>
            <div className="register_form">
                <h3 className="form_title">Register</h3>
                <form onSubmit={handleSubmit}>
                    <div className="input_fields">
                        <div className="register_field">
                            <label htmlFor="firth_name">Firth name</label>
                            <input type="text" id="firth_name" name="firthName" required={true} onInput={handleNameField}/>
                            {nameError && (<p className="errorMassage show">{nameError}</p>)}
                        </div>
                        <div className="register_field">
                            <label htmlFor="second_name">Second name</label>
                            <input type="text" id="second_name" name="secondName" required={true} onInput={handleSurnameField}/>
                            {surnameError && (<p className="errorMassage show">{surnameError}</p>)}
                        </div>
                        <div className="register_field">
                            <label htmlFor="password" >Password</label>
                            <input type="password" id="password" name="password" minLength={8} required={true} onInput={handlePassword}/>
                        </div>
                        <div className="register_field">
                            <label htmlFor="repeat_password">Repeat password</label>
                            <input type="password" id="repeat_password" name="repeatPassword" minLength={8} required={true} onInput={handleRepeatPassword}/>
                            {passwordsNotMatchMassage && (<p className="errorMassage show">{passwordsNotMatchMassage}</p>)}
                        </div>
                        <div className="register_field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required={true} onInput={handleEmailField}/>
                            {emailExistErrorMassage && (<p className="errorMassage show">{emailExistErrorMassage}</p>)}
                        </div>
                        <div className="register_field">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="address"/>
                        </div>
                        <div className="register_field"></div>
                        <div className="register_buttons">
                            <button className="cansel_button">Cansel</button>
                            <button className="sign_in_button" type="submit" >Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </MainLayout>
    )
}

export default RegistrationPage