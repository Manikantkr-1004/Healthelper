import {Flex,Box, Heading, InputRightElement, Center, border,useToast} from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,
    Button,useDisclosure,Text,Input,
    InputLeftElement,InputGroup,Card,FormControl,FormLabel,Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,
    FormErrorMessage,FormHelperText,Select} from '@chakra-ui/react'
import "../Styles/Home.css";
import logo from "../Styles/logo.gif"
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


    return <div>

        <Helmet>
            <title>Login | Healthelper</title>
        </Helmet>

    <Box w={{base:"95%", sm: "60%", md: "400px", lg: "400px", xl: "400px", "2xl": "400px" }} m="auto" mt={{base:"90px",sm:"120px",md:"130px",lg:"150px",xl:"150px"}} 
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




    
</div>
}

export default Login;