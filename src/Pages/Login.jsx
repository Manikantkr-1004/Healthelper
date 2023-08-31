import {Flex,Box, Heading, InputRightElement, Center, border,useToast} from "@chakra-ui/react";
import {
    Button,useDisclosure,Text,Input,
    InputLeftElement,InputGroup,Card,FormControl,FormLabel,Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,
    FormErrorMessage,FormHelperText,Select} from '@chakra-ui/react'
import "../Styles/Home.css";
import doctor from "../Styles/doc.png"
import {useNavigate,Navigate, useLocation} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
import { Helmet } from "react-helmet";

const user = <FontAwesomeIcon flip size="lg" icon={faUserCircle} />
const openeye = <FontAwesomeIcon size='sm' icon={faEye} />
const closeye = <FontAwesomeIcon size='sm' icon={faEyeSlash} />


function Login(){

    const {userd,loginUser,logout,handleClickCart,cartDisclosure,handleMenuBar,MenuDisclosure} = useContext(AuthContext);

    const aboutUsDisclosure = useDisclosure();
    const faqDisclosure = useDisclosure();
    const navigate = useNavigate();
    const toast = useToast()
    const [data,setData] = useState([]);
    const location = useLocation();
    const [show,setShow] = useState(false);

    const handleLogo = ()=>{
        navigate("/")
    }

    const handleDoctor = ()=>{
        navigate("/cart")
    }

    useEffect(()=>{
        document.body.style.backgroundColor = "#E0E9F6";
        document.body.style.backgroundImage ="none";
    },[])



    const [loading,setLoading] = useState(false);
    const [person,setPerson] = useState({
        email:"",
        password:""
    })

    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);

        axios.get("https://reactapi23.onrender.com/patient")
        .then(function(res){
            setLoading(false);
            setData(res.data);

        }).catch(function(error){
            console.log(error)
        })
    }

    useEffect(()=>{
        if(data.length>0){
            fetchingData()
        }
    },[data])

    

    function fetchingData(){
       let detail = data.find((item)=> item.email===person.email && item.password===person.password);
       
       if(detail){
        toast({
            title: "Login Successfully!!",
            status: "success",
            position: "bottom-right",
            isClosable: true,
            duration: 2000
          })
          loginUser(detail.name,detail.id)
          setTimeout(() => {
            if(location.state===null){
                navigate("/")
            }else{
                navigate(`${location.state}`, {replace:true})
            }
          }, 2000);
       }else{
        toast({
            title: "Wrong Credentials!!",
            status: "error",
            duration: 2000,
            position: "bottom-left",
            isClosable: true,
          })
       }
    
       
    }

    if(userd.isAuth){
        return <Navigate to="/" />
    }


    return <Flex justifyContent={{base:"center",sm:"center",md:"space-evenly",lg:"space-evenly",xl:"space-evenly"}} gap="10px" w="97%" m="auto" mt={{base:"20px",sm:"50px",md:"60px",lg:"60px",xl:"60px"}} direction={{base:"column",sm:"column",md:"row",lg:"row",xl:"row"}}>

        <Helmet>
            <title>Login | Healthelper</title>
        </Helmet>
        <Box boxShadow="inset 0px -11px 28px -10px #E0E9F6" w={{base:"100%",sm:"100%",md:"48%",lg:"48%",xl:"48%"}} mt={{base:"40px",sm:"0px",md:"0px",lg:"0px",xl:"0px"}} h={{base:"200px",sm:"250px",md:"auto",lg:"auto",xl:"auto"}} filter="hue-rotate(60deg)" backgroundSize="cover" backgroundImage={`url(${doctor})`}>

        </Box>

    <Box w={{base:"100%",sm:"100%",md:"380px",lg:"380px",xl:"380px"}} mt={{base:"0px",sm:"0px",md:"110px",lg:"110px",xl:"110px"}} 
    mb="30px" p="30px" pb="5px" borderRadius="10px" 
    bg={{base:"none",sm:"white",md:"white",lg:"white",xl:"white"}}
    boxShadow={{base:"none",sm:"rgba(0, 0, 0, 0.24) 0px 3px 8px",md:"rgba(0, 0, 0, 0.24) 0px 3px 8px",lg:"rgba(0, 0, 0, 0.24) 0px 3px 8px",xl:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        <form onSubmit={handleSubmit}>
        <Center><Text textColor="primary.100" fontWeight="bold" fontSize={{base:"20px", sm: "20px", md: "30px", lg: "30px", xl: "30px", "2xl": "30px" }}>{user}Login User</Text></Center><br/>
        
        
            <FormControl isRequired>

        <FormLabel>Your Email</FormLabel>
        <InputGroup>
        <Input type="email" border="1px solid black" placeholder='Your Registerd Email' name="email" value={person.email} onChange={(e) => setPerson((prev) => ({ ...prev, email: e.target.value }))} />
        </InputGroup><br/>

        <FormLabel>Your Password</FormLabel>
        <InputGroup>
        <InputRightElement _hover={{cursor:"pointer"}} onClick={()=> setShow(!show)}>{show?openeye:closeye}</InputRightElement>
        <Input type={show?"text":"password"} border="1px solid black" placeholder='Your Registered Password' name="password" value={person.password} onChange={(e) => setPerson((prev) => ({ ...prev, password: e.target.value }))}/>
        </InputGroup><br/>

        {loading===false ? <Input w="100%" cursor="pointer" textColor="white" fontWeight="bold" bg="primary.100" type="submit" value='Login Account' /> : 
                <Button w="100%" isLoading loadingText='Logging...' colorScheme='teal' variant='outline'>Logging...</Button>}

        </FormControl>

        <Center><Text mt="20px" fontWeight="bold" fontSize="15px">New User ? <Link style={{ color: 'blue',textDecoration:"underline" }} to="/signup">Create Account</Link></Text></Center><br/>


        </form>
    </Box>




    
</Flex>
}

export default Login;