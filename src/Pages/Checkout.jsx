import {Flex,
    Box, Heading, InputRightElement, Center, Select, SimpleGrid} from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,
    Button,useDisclosure,Text,Input,Skeleton,useToast,FormControl,FormLabel,
    InputLeftElement,InputGroup,Card,Tooltip } from '@chakra-ui/react'
import { CardHeader, CardBody, CardFooter,Image,Stack,Divider,ButtonGroup } from '@chakra-ui/react'
import "../Styles/Home.css";
import logo from "../Styles/logo.gif"
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faUserMd,faLowVision,faGlobe,faSearch,faMicrophone,
faAppleAlt,faPlay, faArrowCircleRight,faHeadphones,
faPhone,faEnvelope,faComments, faArrowRight, faCreditCardAlt, faHome, faCartPlus, faShoppingBag, faSignOut, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faYoutube, faInstagram, faFacebook, faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
import Loading from "./Loading";


const Patient = <FontAwesomeIcon fade size="sm" icon={faUserCircle} />
const doctor = <FontAwesomeIcon flip size="sm" icon={faUserMd} />
const doctoris = <FontAwesomeIcon size="sm" icon={faUserMd} />
const doctor1 = <FontAwesomeIcon size="lg" icon={faUserMd} />
const arrowrightis = <FontAwesomeIcon shake size="sm" icon={faArrowCircleRight} />
const visual = <FontAwesomeIcon size="sm" icon={faLowVision} />
const globe = <FontAwesomeIcon size="lg" icon={faGlobe} />
const search = <FontAwesomeIcon size="lg" icon={faSearch} />
const micro = <FontAwesomeIcon size="lg" icon={faMicrophone} />
const apple = <FontAwesomeIcon size="lg" icon={faAppleAlt} />
const play = <FontAwesomeIcon size="lg" icon={faPlay} />
const arrow = <FontAwesomeIcon beat size="sm" icon={faArrowCircleRight} />
const headphone= <FontAwesomeIcon size="sm" icon={faHeadphones} />
const call= <FontAwesomeIcon size="sm" icon={faPhone} />
const mail= <FontAwesomeIcon size="sm" icon={faEnvelope} />
const chat= <FontAwesomeIcon size="sm" icon={faComments} />
const telegram = <FontAwesomeIcon size="xl" icon={faTelegram} className="icon" />;
const youtube = <FontAwesomeIcon size="xl" icon={faYoutube} className="icon" />;
const instagram = <FontAwesomeIcon size="xl" icon={faInstagram} className="icon" />;
const facebook = <FontAwesomeIcon size="xl" icon={faFacebook} className="icon" />;
const arrowright = <FontAwesomeIcon size="sm" icon={faArrowRight} />
const card = <FontAwesomeIcon size="sm" icon={faCcVisa} />
const cardalt = <FontAwesomeIcon size="sm" icon={faCreditCardAlt} />
const home = <FontAwesomeIcon size="sm" icon={faHome} />
const cart = <FontAwesomeIcon size="sm" icon={faCartPlus} />
const order = <FontAwesomeIcon size="sm" icon={faShoppingBag} />
const log = <FontAwesomeIcon size="sm" icon={faSignOut} />
const login = <FontAwesomeIcon size="sm" icon={faSignIn} />


function Checkout(){
    const {userd,loginUser,logout,handleClickCart,cartDisclosure} = useContext(AuthContext);

    const aboutUsDisclosure = useDisclosure();
    const faqDisclosure = useDisclosure();
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [loding,setLoading] = useState(false);
    const [date,setDate] = useState("");
    const [loadprocess,setLoadProcess] = useState(false);
    const [userdata,setUserData] = useState([]);
    const [id,setId] = useState([])
    const toast = useToast()


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
        fetchingData()
    },[])

    useEffect(()=>{
        if(data.length>0){
            savingId()
        }
    },[data])

    function fetchingData(){
        setLoading(true);

        axios.get("https://reactapi23.onrender.com/Cart")
        .then(function(res){
            setLoading(false);
            setData(res.data);

        }).catch(function(error){
            console.log(error)
        })
    }

    function savingId() {
        data.map((item) => {
            setId((prev) => [...prev, item.id]);
          });
          
    }
    // console.log(id)
    

    function checkprice (){
        let total = 0;
        data.map((item)=>(
            total+= item.price
        ))
        return total;
    }

    

    

    function handleSubmit(e){
        e.preventDefault();

        setLoadProcess(true);
        // fetchingDATafromhere();
        setTimeout(() => {
            toast({
                title: "Order Booked",
                description: "Your order is Booked Successfully",
                status: "success",
                position: "top",
                isClosable: true,
                zIndex: 999999,
            });
            setLoadProcess(false);
            setDate("");
            setTimeout(() => {
                navigate("/");
            }, 4000);
        }, 3000);
    

    // function fetchingDATafromhere(){
        
        
        deletingItems();
        
    // }
    }


    // function makingPost(){
        
    //     // setTimeout(() => {

    //     //     axios.put(`https://reactapi23.onrender.com/patient/${userd.id}`,fulldetails)
    //     //     .then(function(res){
    //     //         setLoadProcess(false);
                    
    //     //     }).catch(function(error){
    //     //         console.log(error);
    //     //     })


    //     // }, 3000);
       
       

        
        
    // }

    function deletingItems() {
        id.map((itemId) => {
          axios
            .delete(`https://reactapi23.onrender.com/Cart/${itemId}`)
            .then(function (res) {
              console.log("success");
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      }
      

    

    return <div>
        {/* for Navbar Code */}
        <Flex w="100%" align="center" justify="space-between" bg="primary.400" h="70px" p="0px 70px" position="fixed" top="0" zIndex="999" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" mb="20px">
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
                    {userd.isAuth && <MenuItem fontWeight="bold" >Hlo, {userd.name}</MenuItem>}
                    <MenuItem onClick={()=> navigate("/patienthome")}>{home} Dashboard</MenuItem>
                    {userd.isAuth && <MenuItem fontWeight="semibold" onClick={()=>navigate(`/patientinfo/${userd.id}`)}>{Patient} See Profile</MenuItem>}
                    <MenuItem onClick={()=>navigate("/cart")}>{cart} My Cart</MenuItem>
                    <MenuItem>{order} My Orders</MenuItem>
                    {userd.isAuth ? <MenuItem onClick={()=> logout()}>{log} Logout</MenuItem> : 
                    <MenuItem onClick={()=> navigate("/signup")}>{login} Signup/Login</MenuItem>}
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

        {/* for card component */}
        <Box w="80%" m="auto" mt="110px" mb="20px">
        <Center><Heading bgGradient='linear(to-l, primary.100, black, primary.300)' bgClip='text'>Payment Page</Heading></Center>
        <Heading textAlign='left' fontSize="25px" textColor="primary.100">Total: ₹{checkprice()}</Heading><br/><br/>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }} spacing={5}>
        {
            loding=== true ? <Loading /> : 
            data?.map((item)=>(
                <Card p="0px" bg="transparent" key={item.id} border="1px solid black">
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
                    <Flex w="95%" justifyContent="space-between" m="auto" fontWeight="bold">
                        <Text>Price</Text>
                        <Text >{item.price} ₹</Text>
                    </Flex>

                    

                </CardBody>
                </Card>
            ))
        }

        </SimpleGrid>
        </Box>

        <Box w="80%" m="auto" mb="50px">
            <form onSubmit={handleSubmit} style={{border:"1px dashed grey" ,borderRadius:"10px", padding:"20px",background:"white"}}>
            <FormControl isRequired>

            <FormLabel>Select Date for Meeting</FormLabel>
            <InputGroup>
            
            <Input type="date" border="1px solid black" value={date} onChange={(e)=> setDate(e.target.value)} />
            </InputGroup><br/>

            <FormLabel>Card Holder Name</FormLabel>
            <InputGroup>
            <InputLeftElement children={Patient}/>
            <Input type="text" border="1px solid black" placeholder='Enter Card Holder Name'  />
            </InputGroup><br/>

            <FormLabel>Credit/Debit Card No.</FormLabel>
            <InputGroup>
            <InputLeftElement children={card}/>
            <Input type="password" border="1px solid black" placeholder='Enter 16 digit No.'  max={16} min={16} />
            </InputGroup><br/>

            <FormLabel>CVV</FormLabel>
            <InputGroup>
            <InputLeftElement children={cardalt}/>
            <Input type="password" border="1px solid black" placeholder='Enter 3 digit CVV'  max={3} min={3}/>
            </InputGroup><br/>

            {
                loadprocess ? <Button w="100%" isLoading loadingText='Processing...' colorScheme='teal' variant='outline'>Processing...</Button> : 
                <Input w="100%" cursor="pointer" textColor="white" fontWeight="bold" bg="primary.100" type="submit" value='Click to Payment' />
            }
            

            </FormControl>
            </form>
        </Box>

        {/* Footer Bar lastly */}

        <Box bg="primary.400" width="100%" pt="40px" pb="20px">

        <Flex width="100%" w="80%" justify="space-between"  m="auto">

            <Flex display="block" w="30%"  textAlign="left" fontWeight="semibold" cursor="pointer">
                <img onClick={handleLogo} id="footerlogo" src={logo} alt="" />
                <Text onClick={handleDoctor} m="3px">Doctors</Text>
                <Text m="3px">About us</Text>
                <Text m="3px">FAQ</Text>
                <Text m="3px">My Help</Text>

            </Flex>

            <Flex display="block" w="34%"  textAlign="left" fontWeight="semibold" cursor="pointer">
            <InputGroup mb="10px">
                <InputLeftElement>{search}</InputLeftElement>
                <InputRightElement>{micro}</InputRightElement>
                <Input border="1px solid black" w="100%" size="md" type="text" placeholder='Search doctors, appointment etc.'/>
            </InputGroup>

            <Text m="3px">{headphone}<span> Technical Support</span></Text>
            <Text m="3px">{call}<span> +91 1234567890</span></Text>
            <Text m="3px">{mail}<span> admin@admin.com</span></Text>
            <Text m="3px">{chat}<span> Chat Us</span></Text>

            </Flex>

            <Flex display="block" w="30%" cursor="pointer">

            <Button onClick={handleDoctor} bg="primary.100" textColor="white"
            _hover={{bg:"primary.100"}} w="70%" mb="10px">Book an appointment</Button>
            <Flex w="70%" m="auto" justify="space-between" mb="10px" pl="10px" pr="10px">
                <Text>{telegram}</Text>
                <Text>{youtube}</Text>
                <Text>{instagram}</Text>
                <Text>{facebook}</Text>
            </Flex>
            <Button w="70%" display="block" m="auto" bg="transparent" border='2px solid #000' textColor="#000">{apple} <span style={{ marginLeft: "7px" }}>Google Play</span></Button>
            <Button w="70%" display="block" m="auto" bg="transparent" border='2px solid #000' textColor="#000">{play} <span style={{ marginLeft: "7px" }}>Google Play</span></Button>

            </Flex>


        </Flex>

        </Box>

    </div>
}

export default Checkout;