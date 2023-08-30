import {Flex,Box,Menu,MenuButton,MenuList,MenuItem,Button,Text} from '@chakra-ui/react';
import {useDisclosure,Card } from '@chakra-ui/react'
import { CardBody, CardFooter,Image,ButtonGroup } from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import {useState,useEffect, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../Styles/logo.gif"
import axios from "axios";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faUserMd,faLowVision,faGlobe,faHome, faCartPlus, faShoppingBag, faSignOut, faSignIn, faBars, faInfoCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";

const Patient = <FontAwesomeIcon fade size="sm" icon={faUserCircle} />
const doctor = <FontAwesomeIcon flip size="sm" icon={faUserMd} />
const visual = <FontAwesomeIcon size="sm" icon={faLowVision} />
const globe = <FontAwesomeIcon size="lg" icon={faGlobe} />
const home = <FontAwesomeIcon size="sm" icon={faHome} />
const cart = <FontAwesomeIcon size="sm" icon={faCartPlus} />
const order = <FontAwesomeIcon size="sm" icon={faShoppingBag} />
const log = <FontAwesomeIcon size="sm" icon={faSignOut} />
const login = <FontAwesomeIcon size="sm" icon={faSignIn} />
const bars = <FontAwesomeIcon size="lg" icon={faBars} />
const info = <FontAwesomeIcon size='sm' icon={faInfoCircle} />
const carticon = <FontAwesomeIcon beat size="sm" icon={faCartPlus} />
const procees = <FontAwesomeIcon shake size="lg" icon={faArrowRight} />

export function Menubar() {

    const {userd,loginUser,count,setCount,logout,handleClickCart,cartDisclosure,handleMenuBar,MenuDisclosure} = useContext(AuthContext);
    const aboutUsDisclosure = useDisclosure();
    const faqDisclosure = useDisclosure();
    const navigate = useNavigate();
    const [deloading,setDeloading] = useState(false);
    const [cartdata,setCartData] = useState([]);
    let localcheck = localStorage.getItem("health_check");
    const [check, setCheck] = useState(localcheck? JSON.parse(localcheck): []);
    let booked = localStorage.getItem("booked_doctor") || 0;
    let modifiedname="";

    if(userd.isAuth){
        userd.name.split(" ").map((item)=>(
            modifiedname+= item[0].toUpperCase()
        ))
    }


    const handleLogo = ()=>{
        navigate("/")
    }

    const handleDoctor = ()=>{
        navigate("/cart")
    }

    const handleMouseEnter = () => {
        aboutUsDisclosure.onOpen();
        faqDisclosure.onClose();
    };

    const handleMOuse = () => {
        aboutUsDisclosure.onClose();
        faqDisclosure.onOpen();
    };

    useEffect(()=>{
        handleGet()
        let localcheck = localStorage.getItem("health_check");
        setCheck(localcheck? JSON.parse(localcheck) : []);
    },[count])

    function handleGet(){
        axios.get("https://reactapi23.onrender.com/Cart")
        .then(function(res){
            // setCartData(res.data);
            setCartData(res.data);
            
            
        }).catch(function(error){
            console.log(error)
        })
      }
    

    const checkingTotal = ()=>{
        let total = 0;
        cartdata.map((item)=>(
            total+= item.price
        ))
        return total;
      }

      const handleDel = (itemId) => {
        setDeloading(true);
        const updatedCheck = check.filter((id) => id !== itemId);
        setCheck(updatedCheck);
        console.log(updatedCheck);
        localStorage.setItem("health_check",JSON.stringify(updatedCheck));
        handleDeleting(itemId)
      };

      function handleDeleting(id){
        axios.delete(`https://reactapi23.onrender.com/Cart/${id}`)
        .then(function(res){
            // setCartData(res.data);
            handleGet();
            setDeloading(false);
            setCount((prev)=> prev+1)
            
            
        }).catch(function(error){
            console.log(error)
        })
      }

    return (
        <>
        <Flex w="100%" align="center" justify="space-between" bg="primary.400" h="70px" p={{base:"0px 7px 0px 2px", sm: "0px 30px", md: "0px 40px", lg: "0px 70px", xl: "0px 70px", "2xl": "0px 70px" }} position="fixed" top="0" zIndex="999" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" mb="20px">
            <img onClick={handleLogo} id="logo" src={logo} alt="logo"/>
            <Flex display={{base:"none", sm: "none", md: "flex", lg: "flex", xl: "flex", "2xl": "flex" }} justify="space-between" flexBasis={{base:"50%", sm: "50%", md: "50%", lg: "28%", xl: "28%", "2xl": "28%" }} align="center" >
                <Box onClick={handleDoctor} cursor="pointer" fontWeight="semibold">Doctors</Box>
                <Menu isOpen={aboutUsDisclosure.isOpen} onOpen={aboutUsDisclosure.onOpen} onClose={aboutUsDisclosure.onClose}>
                <MenuButton as={Button} 
                variant="ghost" textAlign="center"
                _hover={{bg:"primary.100",border:"1px solid black"}} 
                _active={{bg:"primary.100"}} 
                onMouseEnter={handleMouseEnter}
                >
                    {userd.isAuth? <Text bg="primary.100" display="flex" alignItems="center" p="10px" borderRadius="50%" color="white">{modifiedname}</Text> : "Profile"}
                </MenuButton>
                <MenuList onMouseEnter={aboutUsDisclosure.onOpen} onMouseLeave={aboutUsDisclosure.onClose}>
                    {userd.isAuth && <MenuItem fontWeight="bold" ><Text>Hlo, {userd.name}</Text></MenuItem>}
                    <MenuItem onClick={()=> navigate("/")}><Text>{home} Dashboard</Text></MenuItem>
                    {userd.isAuth && <MenuItem fontWeight="semibold" onClick={()=>navigate(`/patientinfo/${userd.id}`)}><Text>{Patient} See Profile</Text></MenuItem>}
                    <MenuItem onClick={()=> handleClickCart()}><Text>{cart} My Cart</Text></MenuItem>
                    <MenuItem><Text>{order} Total Orders{userd.isAuth && ` :- ${booked}`}</Text></MenuItem>
                    {userd.isAuth ? <MenuItem onClick={()=> logout()}><Text>{log} Logout</Text></MenuItem> : 
                    <MenuItem onClick={()=> navigate("/login")}><Text>{login} Signup/Login</Text></MenuItem>}
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
                    <MenuItem><Text>{info} Address</Text></MenuItem>
                    <MenuItem><Text>{info} Doctors</Text></MenuItem>
                    <MenuItem><Text>{info} Fees</Text></MenuItem>
                    <MenuItem><Text>{info} Facility</Text></MenuItem>
                    <MenuItem><Text>{info} Digital</Text></MenuItem>
                </MenuList>
                </Menu>
                
                <Box cursor="pointer" fontWeight="semibold">My Help</Box>
            </Flex>
            <Flex justify="space-between" flexBasis="21%" display={{base:"none", sm: "none", md: "none", lg: "flex", xl: "flex", "2xl": "flex" }}>
            <Box cursor="pointer" id="findoctor" border="2px solid black" p="7px 5px" borderRadius="10px" fontWeight="semibold">{doctor} I'm a Doctor</Box>
            <Box cursor="pointer" id="findmedical" border="2px solid black" p="7px 5px" borderRadius="10px" fontWeight="semibold">{Patient} I'm a Patient</Box>
            </Flex>
            <Box display={{base:"none", sm: "none", md: "none", lg: "flex", xl: "flex", "2xl": "flex" }} alignItems="center" cursor="pointer" id="findoctor" border="2px solid black" p="7px 5px" borderRadius="10px" fontWeight="semibold">{visual} Visual Disabilities</Box>
            <Box display={{base:"none", sm: "none", md: "flex", lg: "flex", xl: "flex", "2xl": "flex" }} cursor="pointer" >{globe}</Box>
            <Flex display={{base:"flex", sm: "flex", md: "none", lg: "none", xl: "none", "2xl": "none" }} justifyContent="space-between" alignItems="center" gap="20px">
            {userd.isAuth && <Text bg="primary.100" display="flex" alignItems="center" p="10px" borderRadius="50%" color="white">{modifiedname}</Text>}
            <Box onClick={()=> handleMenuBar()} cursor="pointer" >{bars}</Box>
            </Flex>
        </Flex>

        <Drawer
        isOpen={MenuDisclosure.isOpen}
        placement='left'
        onClose={MenuDisclosure.onClose}
        zIndex="9999"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontWeight="bold" bg="secondary.300" fontSize="17px" color="primary.100"><Text>{userd.isAuth ? `Hlo, ${userd.name}` : "Welcome in Healthelper😊"}</Text></DrawerHeader>

          <DrawerBody>
            <Text onClick={()=> {navigate("/cart"); MenuDisclosure.onClose()}} mb="10px" fontSize="19px" fontWeight="semibold">{doctor} Doctors</Text><hr/>
            <Text onClick={()=>{ navigate("/"); MenuDisclosure.onClose()}} mb="10px" mt="5px" fontSize="19px" fontWeight="semibold">{home} Dashboard</Text><hr/>
            {userd.isAuth && <Text onClick={()=> {navigate(`/patientinfo/${userd.id}`); MenuDisclosure.onClose()}} mb="10px" mt="5px" fontSize="19px" fontWeight="semibold">{Patient} See Profile</Text>}<hr/>
            <Text onClick={()=> {handleClickCart(); MenuDisclosure.onClose()}} mb="10px" mt="5px" fontSize="19px" fontWeight="semibold">{cart} My cart</Text><hr/>
            <Text onClick={()=> MenuDisclosure.onClose()} mb="10px" mt="5px" fontSize="19px" fontWeight="semibold">{order} Total Orders{userd.isAuth && ` :- ${booked}`}</Text><hr/>
            {userd.isAuth ? <Text onClick={()=> {logout(); MenuDisclosure.onClose()}} mt="5px" fontSize="19px" fontWeight="semibold">{log} Logout</Text> : 
            <Text onClick={()=> {navigate("/login"); MenuDisclosure.onClose()}} mt="5px" fontSize="19px" fontWeight="semibold">{login} Signup/Login</Text>}
          </DrawerBody>

        </DrawerContent>
        </Drawer>

        <Drawer
        isOpen={cartDisclosure.isOpen}
        placement='right'
        onClose={cartDisclosure.onClose}
        zIndex="99999"
        >
        <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Cart Items{carticon}
        {cartdata.length>0 && <Text textColor="primary.100">Total: ₹{checkingTotal()}</Text>}
        </DrawerHeader>

        <DrawerBody>
            {
                cartdata.length===0 ? <Box w="100%" p="0px" m="0px"> <img style={{width:"100%", display:"block"}} src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg" alt="" />
                <Text textAlign="center" fontWeight="bold" fontSize="25px" >Your Cart is Empty...</Text></Box> : 
                <Box w="100%" p="0px" m="0px">
                    {
                        cartdata.map((item)=>(
                            <Card p="0px" bg="secondary.200" key={item.id} mb="20px">
                            <CardBody p="0" >
                                <Image
                                src={item.image}
                                alt={item.name}
                                borderRadius='lg'
                                />
                                <Flex w="95%" justifyContent="space-between" m="auto" fontWeight="bold">
                                    <Text>{item.name}</Text>
                                    <Text>{item.rating.rate}⭐</Text>
                                </Flex>
                                <Flex w="95%" justifyContent="space-between" m="auto" fontWeight="bold">
                                    <Text>{item.Occupation}</Text>
                                    <Text fontWeight="semibold">{item.rating.review} reviews</Text>
                                </Flex>
            
                                <Box w="100%" bg="secondary.100" mt="15px" mb="15px">
                                <Flex w="95%" justifyContent="space-between" m="auto" >
                                    <Text fontWeight="bold">Timing</Text>
                                    <Text textColor="blue" fontWeight="bold">30 Min</Text>
                                </Flex>
                                <Flex w="95%" justifyContent="space-between" m="auto" fontWeight="bold">
                                    <Text fontWeight="semibold">Qualification</Text>
                                    <Text >{item.qualification}</Text>
                                </Flex>
                                <Flex w="95%" justifyContent="space-between" m="auto" >
                                    <Text fontWeight="semibold">Experience</Text>
                                    <Text fontWeight="semibold">20 Years</Text>
                                </Flex>
                                <Flex w="95%" justifyContent="space-between" m="auto" fontWeight="bold">
                                    <Text fontWeight="semibold">Price</Text>
                                    <Text >{item.price} ₹</Text>
                                </Flex>
            
                                </Box>
            
                            </CardBody>
                            <CardFooter p="0">
                                <ButtonGroup spacing='2' m="auto" w="95%" mb="5px" justifyContent="space-between">
                                {
                                    deloading ? <Button w="100%" bg="primary.100" isLoading loadingText='Removing...' colorScheme='primary.100'>Removing...</Button> : 
                                    <Button onClick={() => handleDel(item.id)} variant='solid' bg="transparent" border="2px solid #A57BA3" textColor="primary.100" w="100%">
                                        Remove To Cart
                                    </Button>
                                }
                                </ButtonGroup>
                            </CardFooter>
                            </Card>
                        ))
                    }
                </Box>
            }
        </DrawerBody>

        <DrawerFooter>
            <Button variant='outline' mr={3} onClick={cartDisclosure.onClose}>
            Close
            </Button>
            <Button onClick={()=> {cartDisclosure.onClose(); navigate("/checkout")}} isDisabled={cartdata.length===0} _hover={{bg:"primary.300"}} bg="primary.100" textColor="white">Proceed to Checkout{procees}</Button>
        </DrawerFooter>
        </DrawerContent>
        </Drawer>

        </>
    )
}
