import "../css/index_style.css"
import nothingFound from "../img/nothing_found.png";

const NothingFound = () =>{
    return (
        <div className="nothing_found show">
            <h1>Nothing found</h1>
            <img src={nothingFound} alt="nothing_found_man"/>
        </div>
    )
}

export default NothingFound