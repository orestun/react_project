import accessDenied from "../img/access_denied.png";
import "../css/403_style.css"

const AccessDenied = () => {
    return (
        <div className="error">
            <h1 className="errorTitle">Access denied</h1>
            <h1 className="errorCode">403</h1>
            <img src={accessDenied} alt="access denied"/>
        </div>
    )
}

export default AccessDenied