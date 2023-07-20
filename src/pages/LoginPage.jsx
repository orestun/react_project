import "../css/login_style.css"
import logo from "../img/logo1.png"
import MainLayout from "../layout/MainLayout";
import {useNavigate} from 'react-router-dom'
import {useState} from "react";

const LoginPage = () => {
    document.body.style.background = "#f0f0f0"

    const navigate = useNavigate()

    const [noSuchUserMessage, setNoSuchUserMassage]  = useState("");
    const [badCredentialsMassage, setBadCredentialsMassage] = useState("")

    let JwtToken = ""

    const handleNoSuchUserMassage = () => {
        setNoSuchUserMassage("")
        document.getElementsByClassName("errorMassage").item(0).classList.remove("show")
    }

    const handleBadCredentialsMassage = () => {
        setBadCredentialsMassage("")
        document.getElementsByClassName("errorMassage").item(1).classList.remove("show")
    }

    const sendPostRequestWithToken = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(data)
            });

            return await response;
        } catch (error) {
            throw error;
        }
    };

    const sendGetRequestForGettingUserId = async (url) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });

            return await response;
        } catch (error) {
            throw error;
        }
    };

    const getUserIdByUsername = async (username) => {
        const url = 'http://localhost:8080/user/getByUsername/' + username

        try{
            const response = await sendGetRequestForGettingUserId(url)
            const responseJson = await response.json()

            console.log(responseJson)
            return responseJson
        } catch (error) {
            console.error(error);
        }
    }

    const authenticate = async (userData) => {
        const url = 'http://localhost:8080/authenticate';

        try {
            const response = await sendPostRequestWithToken(url, userData)
            const responseJson = await response.json()
            if (response.status === 404) {
                setNoSuchUserMassage(responseJson.errorMassage)
                document.getElementsByClassName("errorMassage").item(0).classList.add("show")
                document.getElementById("username").value = ""
            }else if(response.status === 401){
                setBadCredentialsMassage(responseJson.errorMassage)
                document.getElementsByClassName("errorMassage").item(1).classList.add("show")
                document.getElementById("username").value = ""
            }else if(response.ok){
                JwtToken = await responseJson.token
                localStorage.setItem("token", JwtToken)
                localStorage.setItem("username", userData.username)
                const responseFromGettingUserId = await getUserIdByUsername(userData.username)
                localStorage.setItem("userId", responseFromGettingUserId)
                navigate('/')
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.elements.login.value;
        const password = event.target.elements.password.value;

        const userData = { username: name, password: password };

        authenticate(userData)
    };

    return(
        <MainLayout>
            <div className="login_form">
                <div className="logo_container">
                    <img src={logo} alt="logo"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <input id="username" type="text" name="login" alt="login" placeholder="Login" required={true} onInput={handleNoSuchUserMassage}/>
                    <p className="errorMassage">{noSuchUserMessage}</p>
                    <input id="password" type="password" name="password" alt="password" placeholder="Password" required={true} onInput={handleBadCredentialsMassage}/>
                    <p className="errorMassage">{badCredentialsMassage}</p>
                    <input type="submit" value="Login"/>
                </form>
                <a href="http://localhost:3000/sign-in">Are you not register yet?</a>
            </div>
        </MainLayout>
    )
}

export default LoginPage;