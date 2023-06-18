import { createContext, useState } from "react"
import { useDisclosure } from "@chakra-ui/react";

export const AuthContext = createContext();

export function AuthContextProvider({children}){

    const [userd,setUser] = useState({name:"",isAuth:false,id:""});
    const cartDisclosure = useDisclosure();

    function loginUser(username,idis){
        setUser({name: username, isAuth:true,id: idis})
    }

    function logout(){
        setUser({name:"",isAuth:false,id:""})
    }

    function handleClickCart(){
        cartDisclosure.onOpen();
    }
    

    // console.log(userd)


    return <AuthContext.Provider value={{userd,loginUser,logout,handleClickCart,cartDisclosure}}>
        {children}
        </AuthContext.Provider>
}