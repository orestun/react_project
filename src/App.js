import { BrowserRouter, Route, Routes } from "react-router-dom";
import Certificates, {cardsLoader} from "./pages/CertificatesPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AddCertificatePage from "./pages/AddNewItemPage";
import CertificateDetailsPage from "./pages/CertificateDetailsPage";
import "../src/css/index_style.css";
import CheckoutPage from "./pages/CheckoutPage";
import AccessDenied from "./errors/AccessDenied403";
import ErrorPage from "./pages/ErrorPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/"
                           element={<Certificates />}>
                    </Route>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="sign-up" element={<RegistrationPage />} />
                    <Route path="add-certificate" element={<AddCertificatePage />} />
                    <Route path="certificate">
                        <Route path=":id" element={<CertificateDetailsPage />} />
                    </Route>
                    <Route path="checkout" element={<CheckoutPage></CheckoutPage>}></Route>
                    <Route path="403" element={<ErrorPage error={<AccessDenied/>}></ErrorPage>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;