import {Flex,
    Box, Heading, InputRightElement, Center, Select, SimpleGrid} from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,Drawer,DrawerOverlay,DrawerContent,
    DrawerCloseButton,DrawerHeader,DrawerBody,
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
faPhone,faEnvelope,faComments, faArrowRight, faCreditCardAlt, faHome, faCartPlus, faShoppingBag, faSignOut, faSignIn, faBars } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faYoutube, faInstagram, faFacebook, faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
import Loading from "./Loading";
import { Helmet } from "react-helmet";


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
const bars = <FontAwesomeIcon size="lg" icon={faBars} />

function Checkout(){
    const {count,setCount} = useContext(AuthContext);

    const aboutUsDisclosure = useDisclosure();
    const faqDisclosure = useDisclosure();
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [loding,setLoading] = useState(false);
    const [date,setDate] = useState("");
    const [loadprocess,setLoadProcess] = useState(false);
    const [userdata,setUserData] = useState([]);
    let localcheck = localStorage.getItem("health_check");
    const [check, setCheck] = useState(localcheck? JSON.parse(localcheck): []);
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
        let booked = Number(localStorage.getItem("booked_doctor")) || 0;
        localStorage.setItem("booked_doctor",booked+data.length);

        setLoadProcess(true);
        // fetchingDATafromhere();
        setTimeout(() => {
            toast({
                title: "Order Booked",
                description: "Your order is Booked Successfully",
                status: "success",
                position: "top",
                isClosable: true,
                duration: 3500,
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


    function deletingItems() {
        check.forEach((itemId) => {
          axios
            .delete(`https://reactapi23.onrender.com/Cart/${itemId}`)
            .then(function (res) {
              console.log("success");
              const updatedCheck = check.filter((id) => id !== itemId);
              setCheck(updatedCheck);
              localStorage.setItem("health_check",JSON.stringify(updatedCheck));
              setCount((prev)=> prev+1);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      }
      

    

    return <div>

        <Helmet>
            <title>Payment | Healthelper</title>
        </Helmet>

        {/* for card component */}
        <Box w="80%" m="auto" mt="110px" mb="20px">
        <Flex w="100%" bg="primary.100" color="white" p="5px 7px" fontWeight="bold" borderRadius="20px" justifyContent="space-between">
            <Text>CHECKOUT</Text>
            <Text>😷😷</Text>
            <Text>{`Total:- ${checkprice()}`}</Text>
        </Flex><br/>
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
                <Input disabled={data.length===0} w="100%" cursor="pointer" textColor="white" fontWeight="bold" bg="primary.100" type="submit" value='Click to Payment' />
            }
            

            </FormControl>
            </form>
        </Box>

        {/* Footer Bar lastly */}

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250"><path fill="#AEBDD4" fill-opacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,170.7C840,181,960,235,1080,240C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        <Box bg="primary.400" width="100%" pt="40px" pb="20px">

        <Flex width="100%" w="80%" justify="space-between"  m="auto" direction={{base:"column", sm: "column", md: "column", lg: "row", xl: "row", "2xl": "row" }}>

            <Flex display="block" w={{base:"100%", sm: "100%", md: "100%", lg: "30%", xl: "30%", "2xl": "30%" }} mb={{base:"20px", sm: "20px", md: "20px", lg: "0px", xl: "0px", "2xl": "0px" }}  textAlign="left" fontWeight="semibold" cursor="pointer">
                <img onClick={handleLogo} id="footerlogo" src={logo} alt="" />
                <Text onClick={handleDoctor} m="3px">Doctors</Text>
                <Text m="3px">About us</Text>
                <Text m="3px">FAQ</Text>
                <Text m="3px">My Help</Text>

            </Flex>

            <Flex display="block" w={{base:"100%", sm: "100%", md: "100%", lg: "34%", xl: "34%", "2xl": "34%" }} mb={{base:"20px", sm: "20px", md: "20px", lg: "0px", xl: "0px", "2xl": "0px" }}  textAlign="left" fontWeight="semibold" cursor="pointer">
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

            <Flex display="block" w={{base:"100%", sm: "100%", md: "100%", lg: "30%", xl: "30%", "2xl": "30%" }} mb={{base:"20px", sm: "20px", md: "20px", lg: "0px", xl: "0px", "2xl": "0px" }} cursor="pointer">

            <Button onClick={handleDoctor} bg="primary.100" textColor="white"
            _hover={{bg:"primary.100"}} w="80%" mb="10px">Book an appointment</Button>
            <Flex w="80%" m="auto" justify="space-between" mb="10px" pl="10px" pr="10px">
                <Text>{telegram}</Text>
                <Text>{youtube}</Text>
                <Text>{instagram}</Text>
                <Text>{facebook}</Text>
            </Flex>
            <Button w="80%" display="block" m="auto" bg="transparent" border='2px solid #000' textColor="#000">{apple} <span style={{ marginLeft: "7px" }}>Google Play</span></Button>
            <Button w="80%" display="block" m="auto" bg="transparent" border='2px solid #000' textColor="#000">{play} <span style={{ marginLeft: "7px" }}>Google Play</span></Button>

            </Flex>


        </Flex>

        </Box>

        

    </div>
}

export default Checkout;