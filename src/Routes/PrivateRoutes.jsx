import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
import { Navigate } from "react-router-dom";


function PrivateRoutes({children}){
    const {userd,loginUser,logout,handleClickCart,cartDisclosure} = useContext(AuthContext);

    if(!userd.isAuth){
        return <Navigate to="/login" />
    }
    
    return children;
}

export default PrivateRoutes;