import { createContext, useState } from "react"
import { useDisclosure, useToast } from "@chakra-ui/react";

export const AuthContext = createContext();

export function AuthContextProvider({children}){

    const [userd,setUser] = useState({
        name: localStorage.getItem("health-name") || "",
        isAuth: localStorage.getItem("health-login") || false,
        id: localStorage.getItem("health-id") || ""
    });
    const [count,setCount] = useState(0);
    const cartDisclosure = useDisclosure();
    const MenuDisclosure = useDisclosure();
    const toast = useToast()

    function loginUser(username,idis){
        localStorage.setItem("health-name",username);
        localStorage.setItem("health-login",true);
        localStorage.setItem("health-id",idis);
        setUser({
            name: username,
            isAuth:true,
            id: idis
        })
    }

    function logout(){
        setUser({name:"",isAuth:false,id:""});
        localStorage.clear()
        toast({
            title: "Logged out Successfully!!",
            status: "success",
            duration: 2000,
            position: "bottom",
            isClosable: true,
          })
    }

    function handleClickCart(){
        cartDisclosure.onOpen();
    }

    function handleMenuBar(){
        MenuDisclosure.onOpen();
    }
    

    // console.log(userd)


    return <AuthContext.Provider value={{userd,count,setCount,loginUser,logout,handleClickCart,cartDisclosure,handleMenuBar,MenuDisclosure}}>
        {children}
        </AuthContext.Provider>
}