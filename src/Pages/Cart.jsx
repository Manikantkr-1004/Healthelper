import {Flex,
    Box, Heading, InputRightElement, Center, Select, SimpleGrid} from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,
    Button,useDisclosure,Text,Input,Skeleton,useToast,
    InputLeftElement,InputGroup,Card} from '@chakra-ui/react'
import { CardHeader, CardBody, CardFooter,Image,Stack,Divider,ButtonGroup } from '@chakra-ui/react'
import "../Styles/Home.css";
import logo from "../Styles/logo.gif"
import {useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faUserMd,faLowVision,faGlobe,faSearch,faMicrophone,
faAppleAlt,faPlay,faHeadphones,
faPhone,faEnvelope,faComments,faArrowCircleRight,faCartPlus,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faYoutube, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {useState,useEffect} from "react";
import axios from "axios";
import Loading from "./Loading";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

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
const carticon = <FontAwesomeIcon beat size="sm" icon={faCartPlus} />
const cart2 = <FontAwesomeIcon size="xs" icon={faCartPlus} />
const procees = <FontAwesomeIcon shake size="lg" icon={faArrowRight} />

function Cart(){

    const aboutUsDisclosure = useDisclosure();
    const faqDisclosure = useDisclosure();
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [cartdata,setCartData] = useState([]);
    const [check, setCheck] = useState([]);
    const [loading,setLoading] = useState(false);
    const [priceis,setPrice] = useState("");
    const [degree,setDegree] = useState("");
    const [job,setJob] = useState("");
    const [name,setName] = useState("");
    const toast = useToast();

    useEffect(()=>{
        fetchingData(priceis,degree,job,name);
    },[priceis,degree,job,name])

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
        if(check.length>0){
            handleGet()
        }
    },[check])

    function handleCart(id) {
        setCheck([...check,id])
        handlePost(id)
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
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      function handleGet(){
        axios.get("https://reactapi23.onrender.com/Cart")
        .then(function(res){
            // setCartData(res.data);
            setCartData(res.data);
            
            
        }).catch(function(error){
            console.log(error)
        })
      }

      const handleDel = (itemId) => {
        handleDeleting(itemId)
        const updatedCheck = check.filter((id) => id !== itemId);
        setCheck(updatedCheck);
      };

      function handleDeleting(id){
        axios.delete(`https://reactapi23.onrender.com/Cart/${id}`)
        .then(function(res){
            // setCartData(res.data);
            handleGet()
            
            
        }).catch(function(error){
            console.log(error)
        })
      }

      const handleNavigate = (id)=>{
        navigate(`/doctorinfo/${id}`)
      }

    // console.log(cartdata);

    
    
    const { isOpen, onOpen, onClose } = useDisclosure()


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
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem>Signup/Login</MenuItem>
                    <MenuItem>My Cart</MenuItem>
                    <MenuItem>My Orders</MenuItem>
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

        {/* For Body Part */}
        <div style={{width:"100%",backgroundColor:"#E0E9F6",paddingTop:"120px",paddingBottom:"50px"}}>

        <Box w="80%" m="auto" mb="10px">
            <InputGroup>
                <InputLeftElement>{search}</InputLeftElement>
                <InputRightElement>{micro}</InputRightElement>
                <Input value={name} onChange={(e)=>setName(e.target.value)} border="1px solid black" w="100%" size="md" type="text" placeholder='Search doctors by Name'/>
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
                    <Button onClick={check.includes(item.id) ? onOpen : ()=>handleCart(item.id)} variant='solid' bg="primary.100" textColor="white" w="47%" _hover={{bg:"primary.300"}}                                                       >
                        {check.includes(item.id) ? <>Go to<span style={{marginLeft:"5px"}}>{cart2}</span></> : 'Book'}
                    </Button>
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

        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        zIndex="9999"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart Items{carticon}</DrawerHeader>

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
                                <Button onClick={() => handleDel(item.id)} variant='solid' bg="transparent" border="2px solid #A57BA3" textColor="primary.100" w="100%">
                                    Remove To Cart
                                </Button>
                                </ButtonGroup>
                            </CardFooter>
                            </Card>
                        ))
                    }
                </Box>
            }
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button isDisabled={cartdata.length===0} _hover={{bg:"primary.300"}} bg="primary.100" textColor="white">Proceed to Checkout{procees}</Button>
          </DrawerFooter>
        </DrawerContent>
        </Drawer>



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

export default Cart;