import Navbar from "../components/Navbar";

const MainLayout = ({children}) => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="container">{children}</div>
        </div>
    )
}

export default MainLayout