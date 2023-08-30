import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
import { Navigate, useLocation } from "react-router-dom";


function PrivateRoutes({children}){
    const {userd,loginUser,logout,handleClickCart,cartDisclosure} = useContext(AuthContext);

    const location = useLocation();

    if(!userd.isAuth){
        return <Navigate to="/login" state={location.pathname} replace={true} />
    }
    
    return children;
}

export default PrivateRoutes;