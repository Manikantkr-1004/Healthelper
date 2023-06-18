import {Flex,Box, Heading, InputRightElement, Center, border,useToast} from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,
    Button,useDisclosure,Text,Input,
    InputLeftElement,InputGroup,Card,FormControl,FormLabel,
    FormErrorMessage,FormHelperText,Select} from '@chakra-ui/react'
import "../Styles/Home.css";
import logo from "../Styles/logo.gif"
import {useNavigate,Navigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faUserMd,faLowVision,faGlobe,faSearch,faMicrophone,
faAppleAlt,faPlay, faArrowCircleRight,faHeadphones,
faPhone,faEnvelope,faComments, faArrowRight, faPencil, faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";

const Patient = <FontAwesomeIcon fade size="sm" icon={faUserCircle} />
const doctor = <FontAwesomeIcon flip size="sm" icon={faUserMd} />
const visual = <FontAwesomeIcon size="sm" icon={faLowVision} />
const globe = <FontAwesomeIcon size="lg" icon={faGlobe} />
const pencil = <FontAwesomeIcon fade size="sm" icon={faPencil} />
const user = <FontAwesomeIcon flip size="lg" icon={faUserCircle} />
const arrowright = <FontAwesomeIcon shake size="sm" icon={faArrowRight} />
const arrowleft = <FontAwesomeIcon shake size="sm" icon={faArrowLeft} />
const check = <FontAwesomeIcon shake size="sm" icon={faCheckCircle} />


function Login(){

    const {userd,loginUser,logout,handleClickCart,cartDisclosure} = useContext(AuthContext);

    const aboutUsDisclosure = useDisclosure();
    const faqDisclosure = useDisclosure();
    const navigate = useNavigate();
    const toast = useToast()
    const [data,setData] = useState([]);

    const handleMouseEnter = () => {
        aboutUsDisclosure.onOpen();
        faqDisclosure.onClose();
    };

    const handleMOuse = () => {
        aboutUsDisclosure.onClose();
        faqDisclosure.onOpen();
    };

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
            title: "Login Successfully",
            status: "success",
            position: "bottom-right",
            isClosable: true,
            duration: 2000
          })
          loginUser(detail.name,detail.id)
          setTimeout(() => {
            navigate("/")
          }, 2000);
       }else{
        toast({
            title: "Username or Password is wrong",
            status: "error",
            position: "bottom-left",
            isClosable: true,
          })
       }
    
       
    }

    if(userd.isAuth){
        return <Navigate to="/" />
    }


    return <div>

    {/* for Navbar Code */}
    <Flex w="100%" align="center" justify="space-between" bg="primary.400" h="70px" p="0px 70px" position="fixed" top="0" zIndex="9999" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" mb="20px">
        <img onClick={handleLogo} id="logo" src={logo} alt="logo"/>
        <Flex justify="space-between" flexBasis="28%" align="center" >
            <Box onClick={handleDoctor} cursor="pointer" fontWeight="semibold">Doctors</Box>
            <Menu isOpen={aboutUsDisclosure.isOpen} onOpen={aboutUsDisclosure.onOpen} onClose={aboutUsDisclosure.onClose}>
            <MenuButton as={Button} 
            variant="ghost" 
            _hover={{bg:"primary.400",border:"1px solid black"}} 
            _active={{bg:"secondary.100"}} 
            onMouseEnter={handleMouseEnter}
            >
                Profile
            </MenuButton>
            <MenuList onMouseEnter={aboutUsDisclosure.onOpen} onMouseLeave={aboutUsDisclosure.onClose}>
                    {userd.isAuth && <MenuItem fontWeight="bold">Hlo, {userd.name}</MenuItem>}
                    <MenuItem onClick={()=> navigate("/patienthome")}>Dashboard</MenuItem>
                    <MenuItem onClick={()=>navigate("/cart")}>My Cart</MenuItem>
                    <MenuItem>My Orders</MenuItem>
                    {userd.isAuth ? <MenuItem onClick={()=> logout()}>Logout</MenuItem> : 
                    <MenuItem onClick={()=> navigate("/signup")}>Signup/Login</MenuItem>}
                </MenuList>
            </Menu>
            
            <Menu isOpen={faqDisclosure.isOpen} onOpen={faqDisclosure.onOpen} onClose={faqDisclosure.onClose}>
            <MenuButton as={Button} 
            variant="ghost" 
            _hover={{bg:"primary.400",border:"1px solid black"}} 
            _active={{bg:"secondary.100"}} 
            onMouseEnter={handleMOuse}
            >
                FAQ
            </MenuButton>
            <MenuList onMouseEnter={faqDisclosure.onOpen} onMouseLeave={faqDisclosure.onClose}>
                <MenuItem>Address</MenuItem>
                <MenuItem>Doctors</MenuItem>
                <MenuItem>Fees</MenuItem>
                <MenuItem>Facility</MenuItem>
                <MenuItem>Digital</MenuItem>
            </MenuList>
            </Menu>
            
            <Box cursor="pointer" fontWeight="semibold">My Help</Box>
        </Flex>
        <Flex justify="space-between" flexBasis="21%" >
        <Box cursor="pointer" id="findoctor" border="2px solid black" p="7px 5px" borderRadius="10px" fontWeight="semibold">{doctor} I'm a Doctor</Box>
        <Box cursor="pointer" id="findmedical" border="2px solid black" p="7px 5px" borderRadius="10px" fontWeight="semibold">{Patient} I'm a Patient</Box>
        </Flex>
        <Box cursor="pointer" id="findoctor" border="2px solid black" p="7px 5px" borderRadius="10px" fontWeight="semibold">{visual} Visual Disabilities</Box>
        <Box cursor="pointer" >{globe}</Box>
    </Flex>

    <Box w="40%" m="auto" mt="130px" mb="30px">
        <form onSubmit={handleSubmit} style={{backgroundColor:'white',padding:"30px",paddingBottom:"5px",borderRadius:"10px",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        <Center><Text textColor="primary.100" fontWeight="bold" fontSize="30px">{user}Login User</Text></Center><br/>
        
        
            <FormControl isRequired>

        <FormLabel>Your Email</FormLabel>
        <InputGroup>
        <InputLeftElement children={pencil}/>
        <Input type="email" border="1px solid black" placeholder='Your Registerd Email' name="email" value={person.email} onChange={(e) => setPerson((prev) => ({ ...prev, email: e.target.value }))} />
        </InputGroup><br/>

        <FormLabel>Your Password</FormLabel>
        <InputGroup>
        <InputLeftElement children={pencil}/>
        <Input type="text" border="1px solid black" placeholder='Your Registered Password' name="password" value={person.password} onChange={(e) => setPerson((prev) => ({ ...prev, password: e.target.value }))}/>
        </InputGroup><br/>

        {loading===false ? <Input w="100%" cursor="pointer" textColor="white" fontWeight="bold" bg="primary.100" type="submit" value='Login Account' /> : 
                <Button w="100%" isLoading loadingText='Logging...' colorScheme='teal' variant='outline'>Logging...</Button>}

        </FormControl>

        <Center><Text mt="20px" fontWeight="bold" fontSize="15px">If You have not Registered yet <Link style={{ color: 'blue',textDecoration:"underline" }} to="/signup">Go to Signup</Link></Text></Center><br/>


        </form>
    </Box>
    
</div>
}

export default Login;