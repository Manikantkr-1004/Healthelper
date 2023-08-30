import {Flex,
    Box, Heading, InputRightElement, Center, Select, SimpleGrid} from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,
    Button,useDisclosure,Text,Input,Skeleton,useToast,
    InputLeftElement,InputGroup,Card,Tooltip } from '@chakra-ui/react'
import { CardHeader, CardBody, CardFooter,Image,Stack,Divider,ButtonGroup } from '@chakra-ui/react'
import "../Styles/Home.css";
import logo from "../Styles/logo.gif"
import {useNavigate, useSearchParams} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faUserMd,faLowVision,faGlobe,faSearch,faMicrophone,
faAppleAlt,faPlay,faHeadphones,
faPhone,faEnvelope,faComments,faArrowCircleRight,faCartPlus,faArrowRight, faHome, faShoppingBag, faSignOut, faSignIn, faBars } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faYoutube, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {useState,useEffect, useContext} from "react";
import axios from "axios";
import Loading from "./Loading";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
import { Helmet } from "react-helmet";

const Patient = <FontAwesomeIcon fade size="sm" icon={faUserCircle} />
const doctor = <FontAwesomeIcon flip size="sm" icon={faUserMd} />
const visual = <FontAwesomeIcon size="sm" icon={faLowVision} />
const globe = <FontAwesomeIcon size="lg" icon={faGlobe} />
const search = <FontAwesomeIcon size="lg" icon={faSearch} />
const micro = <FontAwesomeIcon size="lg" icon={faMicrophone} />
const apple = <FontAwesomeIcon size="lg" icon={faAppleAlt} />
const play = <FontAwesomeIcon size="lg" icon={faPlay} />
const headphone= <FontAwesomeIcon size="sm" icon={faHeadphones} />
const call= <FontAwesomeIcon size="sm" icon={faPhone} />
const mail= <FontAwesomeIcon size="sm" icon={faEnvelope} />
const chat= <FontAwesomeIcon size="sm" icon={faComments} />
const telegram = <FontAwesomeIcon size="xl" icon={faTelegram} className="icon" />;
const youtube = <FontAwesomeIcon size="xl" icon={faYoutube} className="icon" />;
const instagram = <FontAwesomeIcon size="xl" icon={faInstagram} className="icon" />;
const facebook = <FontAwesomeIcon size="xl" icon={faFacebook} className="icon" />;
const arrowright = <FontAwesomeIcon fade size="sm" icon={faArrowCircleRight} />
const cart2 = <FontAwesomeIcon size="xs" icon={faCartPlus} />
const home = <FontAwesomeIcon size="sm" icon={faHome} />
const cart = <FontAwesomeIcon size="sm" icon={faCartPlus} />
const order = <FontAwesomeIcon size="sm" icon={faShoppingBag} />
const log = <FontAwesomeIcon size="sm" icon={faSignOut} />
const login = <FontAwesomeIcon size="sm" icon={faSignIn} />
const bars = <FontAwesomeIcon size="lg" icon={faBars} />

function Cart(){

    const {userd,loginUser,count,setCount,logout,handleClickCart,cartDisclosure,handleMenuBar,MenuDisclosure} = useContext(AuthContext);

    const aboutUsDisclosure = useDisclosure();
    const faqDisclosure = useDisclosure();
    const navigate = useNavigate();
    const [searchParams,setSearchParams] = useSearchParams();
    const [cartdata,setCartData] = useState([]);
    const [data,setData] = useState([]);
    let localcheck = localStorage.getItem("health_check");
    const [check, setCheck] = useState(localcheck? JSON.parse(localcheck): []);
    const [loading,setLoading] = useState(false);
    const [deloading,setDeloading] = useState(false);

    const [priceis,setPrice] = useState(searchParams.get("price") || "");
    const [degree,setDegree] = useState(searchParams.get("qualification") || "");
    const [job,setJob] = useState(searchParams.get("occupation") || "");
    const [name,setName] = useState(searchParams.get("q") || "");

    const toast = useToast();

    useEffect(()=>{
        fetchingData(priceis,degree,job,name);
        let localcheck = localStorage.getItem("health_check");
        setCheck(localcheck? JSON.parse(localcheck) : []);
        let params = {};

        if(name!==""){
            params.q = name;
        }
        if(priceis!==""){
            params.price = priceis;
        }
        if(degree!==""){
            params.qualification = degree;
        }
        if(job!==""){
            params.occupation = job;
        }
        setSearchParams(params)
        document.body.style.background = "#E0E9F6"
    },[priceis,degree,job,name,count]);

    const handleVoiceSearch = () => {
        if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US"; // Set the language for speech recognition
        
            recognition.onresult = (event) => {
                const speechResult = event.results[0][0].transcript;
                setName(speechResult);
            };
        
            recognition.start();
        } else {
            console.log("Speech recognition not supported on this browser.");
            // You might want to provide a user-friendly message or alternative search method
        }
    };

    function fetchingData(priceis,degree,job,name){
        setLoading(true);

        let params = {};
        if(priceis!==""){
            params._sort= "price";
            params._order= priceis;
        }

        if(degree!==""){
            params.qualification = degree;
        }

        if(job!==""){
            params.Occupation = job;
        }

        if(name!==""){
            params.q = name;
        }


        axios.get(`https://reactapi23.onrender.com/doctor`,{params})
        .then(function(res){
            setLoading(false);
            setData(res.data);

        }).catch(function(error){
            console.log(error);
        })
    }
    // console.log(data);

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

    const handleReset = ()=>{
        setPrice("");
        setName("");
        setDegree("");
        setJob("");
    }

    useEffect(()=>{
            handleGet()
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

    function handleCart(itemid) {
        let updated = [...check,itemid];
        setCheck(updated);
        localStorage.setItem("health_check",JSON.stringify(updated));
        handlePost(itemid)
    }

    const handlePost = (id) => {
        const item = data.find((item) => item.id === id);

        axios
          .post('https://reactapi23.onrender.com/Cart', item)
          .then(function (res) {
            // Assuming the API response contains the updated cart data
            handleGet();
            toast({
                title: "Added in Cart",
                description: "Product added in Cart Successfully",
                status: "success",
                duration: 2000,
                isClosable: true
              });
              setCount((prev)=> prev+1);
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      const handleNavigate = (id)=>{
        navigate(`/doctorinfo/${id}`)
      }

    // console.log(cartdata);

    
    
    // const { isOpen, onOpen, onClose } = useDisclosure();


    return <div>
        <Helmet>
            <title>Cart | Healthelper</title>
        </Helmet>

        {/* For Body Part */}
        <div style={{width:"100%",backgroundColor:"#E0E9F6",paddingTop:"120px",paddingBottom:"50px"}}>

        <Box w="80%" m="auto" mb="10px">
            <InputGroup>
                <InputLeftElement>{search}</InputLeftElement>
                <InputRightElement onClick={handleVoiceSearch} _hover={{cursor:"pointer"}}>{micro}</InputRightElement>
                <Input _focus={{boxShadow:"0 0 5pt 0.5pt #4d4d4d inset"}} boxShadow="0 0 5pt 0.5pt #202020 inset" value={name} onChange={(e)=>setName(e.target.value)} border="1px solid black" w="100%" size="md" type="text" placeholder='Search doctors by Name'/>
            </InputGroup>
        </Box>

        <Box w="80%" m="auto" mb="10px">

            <Flex>
                <Select border="1px solid black" value={priceis} onChange={(e)=> setPrice(e.target.value)}>
                <option value=''>Filter By Price</option>
                <option value='asc'>Low to High</option>
                <option value='desc'>High to Low</option>
                </Select>
                <Select border="1px solid black" value={degree} onChange={(e)=> setDegree(e.target.value)}>
                <option value=''>Filter By Qualification</option>
                <option value='P.hd'>P.hd</option>
                <option value='MD'>MD</option>
                <option value='MBBS'>MBBS</option>
                <option value='MS'>MS</option>
                <option value='DDS'>DDS</option>
                </Select>
                <Select border="1px solid black" value={job} onChange={(e)=> setJob(e.target.value)}>
                <option value=''>Filter By Occupation</option>
                <option value='Cardiologist'>Cardiologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Pediatrician'>Pediatrician</option>
                <option value='Orthopedic Surgeon'>Orthopedic Surgeon</option>
                <option value='Gynecologist'>Gynecologist</option>
                <option value='Ophthalmologist'>Ophthalmologist</option>
                <option value='Dentist'>Dentist</option>
                <option value='Neurologist'>Neurologist</option>
                </Select>
            </Flex>
        </Box>

        <Box w="80%" m="auto" mb="20px"> 
            <Button onClick={handleReset} bg="secondary.100" _hover={{bg:"primary.300",textColor:"white"}}>RESET ALL</Button>
        </Box>

        <Box w="80%" m="auto" >
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }} spacing={5}>

        
        {
            loading=== true ? <Loading /> : 
            data.map((item)=>(
                <Card p="0px" bg="transparent" key={item.id}>
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
                    <Button onClick={()=>handleNavigate(item.id)} variant='solid' bg="transparent" border="2px solid #A57BA3" textColor="primary.100" w="47%">
                        Read More {arrowright}
                    </Button>
                    {
                        userd.isAuth ? <Button onClick={check.includes(item.id) ? ()=>handleClickCart() : ()=>handleCart(item.id)} variant='solid' bg="primary.100" textColor="white" w="47%" _hover={{bg:"primary.300"}}                                                       >
                        {check.includes(item.id) ? <>Go to<span style={{marginLeft:"5px"}}>{cart2}</span></> : userd.isAuth?"Book":"First Login"}
                    </Button> : 
                        <Tooltip label='Please Create/Login Account' hasArrow arrowSize={10} placement='top'>
                            <Button isDisabled onClick={check.includes(item.id) ? ()=>handleClickCart() : ()=>handleCart(item.id)} variant='solid' bg="primary.100" textColor="white" w="47%" _hover={{bg:"primary.300"}}                                                       >
                            {check.includes(item.id) ? <>Go to<span style={{marginLeft:"5px"}}>{cart2}</span></> : userd.isAuth?"Book":"First Login"}
                            </Button>
                        </Tooltip>
                    }
                    </ButtonGroup>
                </CardFooter>
                </Card>
            ))
        }
        
        </SimpleGrid>
        </Box>



        </div>

        <div style={{width:"100%",backgroundColor:"#E0E9F6"}}>
            <Box w="80%" m="auto">
                <Text fontWeight="semibold" fontSize="30px">How can I use it?</Text>
            </Box>
            <Box w="80%" m="auto" mt="20px" pb="40px">
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 3, "2xl": 3 }} spacing={5} justifyContent="space-between">
                <Box>
                    <Text mb="5px" textAlign="left" fontWeight="bold">I've booked an appointment, how to answer the call?</Text>
                    <img style={{borderRadius:"5px"}} src="https://img.freepik.com/free-vector/flat-design-customer-support-concept-illustrated_52683-59570.jpg?w=740&t=st=1686992300~exp=1686992900~hmac=b4455b864a4c0714b2daaeb4d3e939bb19cc88c627e594f9150e4b9b54031d44" alt="" />
                </Box>
                <Box>
                    <Text mb="5px" textAlign="left" fontWeight="bold">How to complete my personal information at my cabinet?</Text>
                    <img style={{borderRadius:"5px"}} src="https://img.freepik.com/free-vector/telecommuting-concept_52683-37090.jpg?w=740&t=st=1686992221~exp=1686992821~hmac=8d9fc48e30c2774f4b564aa226623ea2ddb7ecbc674e6c903ba173b06b860cbd" alt="" />
                </Box>
                <Box>
                    <Text mb="5px" textAlign="left" fontWeight="bold">What can I do in my personal cabinet, Here or There or anywhere?</Text>
                    <img style={{borderRadius:"5px"}} src="https://img.freepik.com/free-vector/business-leaders-solve-problems-lead-organization-overcome-business-obstacles-achieve-planned-business-goals_1150-65818.jpg?size=626&ext=jpg&ga=GA1.2.1345813682.1676725084&semt=sph" alt="" />
                </Box>
            </SimpleGrid>
            </Box>

        </div>



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

        {/* Menu bar code */}

        



    </div>
}

export default Cart;