import {Routes,Route} from "react-router-dom"
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Order from "../Pages/Order";
import NotFound from "../Pages/NotFound";
import Cart from "../Pages/Cart";
import Checkout from "../Pages/Checkout";
import HomeDoctor from "../Pages/HomeDoctor";
import HomePatient from "../Pages/HomePatient";
import SingleDoctor from "../Pages/SingleDoctor";
import SinglePatient from "../Pages/SinglePatient";
import PrivateRoutes from "./PrivateRoutes";

function AllRoutes(){
    return <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/order" element={<PrivateRoutes><Order /></PrivateRoutes>}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>}></Route>
        <Route path="/doctorhome" element={<PrivateRoutes><HomeDoctor /></PrivateRoutes>}></Route>
        <Route path="/patienthome" element={<PrivateRoutes><HomePatient /></PrivateRoutes>}></Route>
        <Route path="/doctorinfo/:id" element={<PrivateRoutes><SingleDoctor /></PrivateRoutes>}></Route>
        <Route path="/patientinfo/:id" element={<PrivateRoutes><SinglePatient /></PrivateRoutes>}></Route>
    </Routes>
}

export default AllRoutes;