import { Outlet } from "react-router"
import Navbar from "../components/Navbar"

function AppLayout(){

    return (<>
        <Navbar/>
        <Outlet/>
    </>)
}

export default AppLayout