import { Outlet } from "react-router"
import Navbar from "../components/common/Navbar"

function AppLayout() {

    return (<>
        <Navbar />
        <Outlet />
    </>)
}

export default AppLayout