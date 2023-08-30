import {Flex,Box, Heading, InputRightElement, Center, useStatStyles} from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,
    Button,useDisclosure,Text,Input,
    InputLeftElement,InputGroup,Card} from '@chakra-ui/react'
import {Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,} from '@chakra-ui/react'
import "../Styles/Home.css";
import logo from "../Styles/logo.gif"
import health from "../Styles/health.png";
import {useNavigate, useSearchParams} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faUserMd,faLowVision,faGlobe,faSearch,faMicrophone,
faAppleAlt,faPlay, faArrowCircleRight,faHeadphones,
faPhone,faEnvelope,faComments, faArrowRight, faHome, faCartPlus, faShoppingBag, faSignOut, faSignIn, faBars } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faYoutube, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

import { Doughnut } from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
import { Helmet } from "react-helmet";
ChartJS.register(
    ArcElement, Tooltip, Legend
)

const Patient = <FontAwesomeIcon fade size="sm" icon={faUserCircle} />
const doctor = <FontAwesomeIcon flip size="sm" icon={faUserMd} />
const doctoris = <FontAwesomeIcon size="sm" icon={faUserMd} />
const doctor1 = <FontAwesomeIcon size="lg" icon={faUserMd} />
const arrowrightis = <FontAwesomeIcon shake size="sm" icon={faArrowCircleRight} />
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
const home = <FontAwesomeIcon size="sm" icon={faHome} />
const cart = <FontAwesomeIcon size="sm" icon={faCartPlus} />
const order = <FontAwesomeIcon size="sm" icon={faShoppingBag} />
const log = <FontAwesomeIcon size="sm" icon={faSignOut} />
const login = <FontAwesomeIcon size="sm" icon={faSignIn} />


function Home(){
    const {userd,logout,handleClickCart,cartDisclosure,handleMenuBar,MenuDisclosure} = useContext(AuthContext);

    const navigate = useNavigate();
    const [searchParams,setSearchParams] = useSearchParams();
    const [inp,setInp] = useState(searchParams.get("q") || "");

    useEffect(()=>{
        let params = {};

        if(inp!== ""){
            params.q = inp;
        }

        setSearchParams(params);
        document.body.style.background = "#E0E9F6"
    },[inp]);

    // Doughnut chart data
    const data = {
        labels: ["63%", "37%"],
        datasets: [
            {
                data: [63, 37],
                backgroundColor: ["#737F96", "#A57BA3"],
                borderColor: ["#737F96", "#A57BA3"],
            }
            ],
    };

    const options = {

    }

    const handleLogo = ()=>{
        navigate("/")
    }

    const handleDoctor = ()=>{
        if(inp===""){
            navigate("/cart")
        }else{
            navigate(`/cart?q=${inp}`)
        }
    }

    const handleVoiceSearch = () => {
        if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = "en-US"; // Set the language for speech recognition
        
            recognition.onresult = (event) => {
                const speechResult = event.results[0][0].transcript;
                setInp(speechResult);
            };
        
            recognition.start();
        } else {
            console.log("Speech recognition not supported on this browser.");
            // You might want to provide a user-friendly message or alternative search method
        }
    };
    
    

    return <div>

        <Helmet>
            <title>Home | Healthelper</title>
        </Helmet>

        {/* for Body Code */}

        <Flex w="100%" bg="secondary.200" justify="space-evenly" pt="110px" pb="60px" pl="10px">
            <Flex display="block" textAlign="left" >
                <Heading as="h1" fontSize="50px">Healthelper</Heading><br/>
                <Text fontSize="20px" fontWeight="semibold">Initial Consultation with any doctor is for free</Text><br /><br /><br />
                <InputGroup>
                <InputLeftElement>{search}</InputLeftElement>
                <InputRightElement _hover={{cursor:"pointer"}} onClick={inp===""?handleVoiceSearch:handleDoctor}>{inp===""? micro:<Text borderRadius="10px" fontWeight="500" bg="primary.100" boxShadow="0 0 5pt 0.5pt #202020 inset" color="white" p="8px 6px">Search</Text>}</InputRightElement>
                <Input _focus={{boxShadow:"0 0 5pt 0.5pt #4d4d4d inset"}} boxShadow="0 0 5pt 0.5pt #202020 inset" value={inp} onChange={(e)=> setInp(e.target.value)} border="1px solid black" w="100%" size="md" type="text" placeholder='Search doctors, appointment etc.'/>
                </InputGroup><br />
                <Button onClick={handleDoctor} bg="primary.100" textColor="white"
                _hover={{bg:"primary.100"}}>Book an appointment</Button>
            </Flex>
            <Flex >
                <img id="health" width="100%" src={health} alt="heatlh1" />
            </Flex>
        </Flex>

        {/* for 2nd body */}


        <Box bg="secondary.100" width="100%" pt={{base:"10px",sm:"40px",md:"40px",lg:"40px",xl:"40px"}} pb="40px" borderRadius="50px 50px 0px 0px">
            <Flex display="block" w="80%" m="auto" mb="20px">
            <Flex width="100%" justify="space-between" direction={{base:"column", sm: "column", md: "row", lg: "row", xl: "row", "2xl": "row" }}>
                <Flex><Text fontWeight="semibold" fontSize="30px">Popular Specializations</Text></Flex>
                <Flex flexBasis="40%">
                <InputGroup>
                <InputLeftElement>{search}</InputLeftElement>
                <InputRightElement _hover={{cursor:"pointer"}} onClick={inp===""?handleVoiceSearch:handleDoctor}>{inp===""? micro:<Text borderRadius="10px" fontWeight="500" bg="primary.200" boxShadow="0 0 5pt 0.5pt #202020 inset" color="white" p="8px 6px">Search</Text>}</InputRightElement>
                <Input _focus={{boxShadow:"0 0 5pt 0.5pt #4d4d4d inset"}} boxShadow="0 0 5pt 0.5pt #202020 inset" value={inp} onChange={(e)=> setInp(e.target.value)} border="1px solid black" w="100%" size="md" type="text" placeholder='Search doctors, appointment etc.'/>
                </InputGroup><br /></Flex>
            </Flex>
            </Flex>
            <Flex display="block" w="80%" m="auto" mb="20px">
            <Flex width="100%" justify="space-between" direction={{base:"column",sm: "column", md: "row", lg: "row", xl: "row", "2xl": "row" }}>
                <Flex mb={{base:"5px",sm: "5px", md: "5px", lg: "0px", xl: "0px", "2xl": "0px" }} borderRadius="7px" p="18px 15px" bg="primary.200"  textColor="white">{doctor1} Cardiology</Flex>
                <Flex mb={{base:"5px",sm: "5px", md: "5px", lg: "0px", xl: "0px", "2xl": "0px" }} borderRadius="7px" p="18px 15px" bg="primary.200"  textColor="white">{doctor1} Dermatology</Flex>
                <Flex mb={{base:"5px",sm: "5px", md: "5px", lg: "0px", xl: "0px", "2xl": "0px" }} borderRadius="7px" p="18px 15px" bg="primary.200"  textColor="white">{doctor1} Orthopedics</Flex>
                <Flex mb={{base:"5px",sm: "5px", md: "5px", lg: "0px", xl: "0px", "2xl": "0px" }} borderRadius="7px" p="18px 15px" bg="primary.200"  textColor="white">{doctor1} Neurology</Flex>
                <Flex borderRadius="7px" p="18px 15px" bg="primary.200"  textColor="white">{doctor1} Gynecology</Flex>
            </Flex>
            </Flex>
            <Flex display="block" w="80%" m="auto" textAlign="right">
                <Button onClick={handleDoctor} bg="transparent" border='2px solid #A57BA3' textColor="#A57BA3">View More {arrowright} </Button>
            </Flex>
            
        </Box>

        <Box bg="primary.100" width="100%" p="10px 0px" fontWeight="bold" fontSize="20px" textColor="white">
            <Center><Flex><Text onClick={handleDoctor} cursor="pointer">{doctoris}<span>View All Doctors </span>{arrowrightis}</Text></Flex></Center>
        </Box>

        {/* for appointment card */}

        <Box bg="secondary.200" width="100%" pt="40px" pb="40px">
        <Flex display="block" w="80%" m="auto" mb="20px">
            <Flex width="100%" justify="space-between" direction={{base:"column", sm: "column", md: "row", lg: "row", xl: "row", "2xl": "row" }}>
                <Flex><Text fontWeight="semibold" fontSize="30px">Three steps to make an appointment</Text></Flex>
                <Flex>
                <Button w="100%" onClick={handleDoctor} bg="primary.100" textColor="white"
                _hover={{bg:"primary.100"}}>Book an appointment</Button>
                </Flex>
            </Flex>
            </Flex>

        <Flex w="80%" m="auto" mb="5px" justify="space-between" direction={{base:"column", sm: "column", md: "row", lg: "row", xl: "row", "2xl": "row" }}>
            <Flex display="block" mb={{base:"20px",sm: "20px", md: "20px", lg: "0px", xl: "0px", "2xl": "0px" }} w={{base:"100%", sm: "100%", md: "30%", lg: "30%", xl: "30%", "2xl": "30%" }}>
                <img id="booking" src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000" alt="" />
                <Text fontWeight="bold">Consult a Doctor</Text>
                <Text>First You need to consult a doctor to make sure you have such related problems which doctor can help you.</Text>
            </Flex>
            <Flex display="block" mb={{base:"20px",sm: "20px", md: "20px", lg: "0px", xl: "0px", "2xl": "0px" }} w={{base:"100%", sm: "100%", md: "30%", lg: "30%", xl: "30%", "2xl": "30%" }}>
                <img id="booking" src="https://img.freepik.com/free-vector/appointment-booking-with-smartphone-running-woman_23-2148559016.jpg" alt="" />
                <Text fontWeight="bold">Book Appointment</Text>
                <Text>Then you need to book according to calender because it's mandatory to book the free slot, whenever you free.</Text>
            </Flex>
            <Flex display="block" w={{base:"100%", sm: "100%", md: "30%", lg: "30%", xl: "30%", "2xl": "30%" }}>
                <img id="booking" src="https://img.freepik.com/free-vector/cartoon-online-medical-conference_23-2148906039.jpg?w=740&t=st=1686820644~exp=1686821244~hmac=581b67b613c221ba2df3640bf92734942804c96c62fbb3d9f006adc3dc8bb95c" alt="" />
                <Text fontWeight="bold">Online Meeting</Text>
                <Text>Then according to booking slot, doctor will come and you will have to talk to doctor about your problems, so be punchual.</Text>
            </Flex>
        </Flex>
        <Flex w="80%" m="auto" mb="20px" ><img id="progress" src="https://quantumleapcommerce.com/wp-content/uploads/2019/02/123-Step.png" alt="" /></Flex>
        <Flex w="80%" m="auto" direction={{base:"column", sm: "column", md: "row", lg: "row", xl: "row", "2xl": "row" }}>
            <Flex display="block" textAlign="left" fontWeight="bold"><Text>For Your best Mobility and comfort</Text>
            <Text>Download Our Application</Text></Flex>
            <Flex  align="center" ml="30px" direction={{base:"column", sm: "column", md: "row", lg: "row", xl: "row", "2xl": "row" }}>
                <Button w={{base:"100%", sm:"100%", md:"50%",lg:"50%",xl: "50%", "2xl": "50%"}} mr={{base:"0px", sm: "0px", md: "10px", lg: "10px", xl: "10px", "2xl": "10px" }} bg="transparent" border='2px solid #000' textColor="#000">{apple} <span style={{ marginLeft: "7px" }}>Google Play</span></Button>
                <Button w={{base:"100%", sm:"100%", md:"50%",lg:"50%",xl: "50%", "2xl": "50%"}} bg="transparent" border='2px solid #000' textColor="#000">{play} <span style={{ marginLeft: "7px" }}>Google Play</span></Button>
            </Flex>
        </Flex>
        </Box>

        {/*  for chart part */}

        <Box bg="secondary.100" width="100%" pt="40px" pb="40px">
        <Flex display="block" w="80%" m="auto" mb="20px">
            <Flex width="100%" justify="space-between">
                <Flex><Text fontWeight="semibold" fontSize="30px">Why we are?</Text></Flex>
            </Flex>
        </Flex>

        <Flex w="80%" m="auto" justify="space-between" direction={{base:"column", sm: "column", md: "row", lg: "row", xl: "row", "2xl": "row" }}>
            <Flex display="block" mb={{base:"20px",sm: "20px", md: "20px", lg: "0px", xl: "0px", "2xl": "0px" }} w={{base:"100%", sm:"100%", md:"30%",lg:"30%",xl: "30%", "2xl": "30%"}}>
                <Text textAlign="left">01. <span style={{fontWeight:"bold"}}>PATIENTS</span></Text>
                <Flex w="100%" justify="space-between" >
                <Flex w="50%">
                    <Doughnut data={data} options={options} />
                </Flex>
                    <Flex w="50%" display="block"  textAlign="left" >
                        <Text fontWeight="bold">94%</Text>
                        <Text>We help our patients 24 hours with 7 days, and main thing we provide our services on Online platform.</Text>
                    </Flex>
                </Flex>
            </Flex>

            <Flex display="block" mb={{base:"20px",sm: "20px", md: "20px", lg: "0px", xl: "0px", "2xl": "0px" }} w={{base:"100%", sm:"100%", md:"30%",lg:"30%",xl: "30%", "2xl": "30%"}}>
                <Text textAlign="left">02. <span style={{fontWeight:"bold"}}>DOCTORS</span></Text>
                <Flex w="100%" justify="space-between" >
                <Flex w="50%">
                    <Doughnut data={data} options={options} />
                </Flex>
                    <Flex w="50%" display="block"  textAlign="left">
                        <Text fontWeight="bold">94%</Text>
                        <Text>We have specialist doctors who are expert to give you advice well and they are good in Online.</Text>
                    </Flex>
                </Flex>
            </Flex>

            <Flex display="block" w={{base:"100%", sm:"100%", md:"30%",lg:"30%",xl: "30%", "2xl": "30%"}}>
                <Text textAlign="left">03. <span style={{fontWeight:"bold"}}>SAFETY</span></Text>
                <Flex w="100%" justify="space-between" >
                <Flex w="50%">
                    <Doughnut data={data} options={options} />
                </Flex>
                    <Flex w="50%" display="block"  textAlign="left">
                        <Text fontWeight="bold">94%</Text>
                        <Text>Our first priority is patient safety, that's why we are one of the most famous online medical on Online.</Text>
                    </Flex>
                </Flex>
            </Flex>

            

        </Flex>

        </Box>

        {/* Footer above card */}

        <Box bg="secondary.200" width="100%" pt="40px" pb="40px">
        <Flex display="block" w="80%" m="auto">

        <Flex width="100%" mb="20px">
            <Flex><Text fontWeight="semibold" fontSize="30px">You will find this useful to know</Text></Flex>
        </Flex>

        <Flex width="100%" justify="space-between" direction={{base:"column", sm: "column", md: "column", lg: "row", xl: "row", "2xl": "row" }}>

            <Flex display="block" w={{base:"100%", sm: "100%", md: "100%", lg: "30%", xl: "30%", "2xl": "30%" }} h="500px">
                <img style={{marginBottom:"30px",borderRadius:"20px"}} src="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2017/10/VitaminB12-SG-770x533-1-650x428.jpg" alt="" />
                <img style={{borderRadius:"20px"}} src="https://femina.wwmindia.com/content/2022/feb/vitamin-011643976708.jpg" alt="" />
            </Flex>

            <Flex display="block" h="500px" w={{base:"100%", sm: "100%", md: "100%", lg: "30%", xl: "30%", "2xl": "30%" }}>
                <img id="child-doctor" src="https://thumbs.dreamstime.com/b/female-doctor-examining-child-20598151.jpg" alt="" />
            </Flex>

            <Flex display="block" textAlign="left" h="500px" w={{base:"100%", sm: "100%", md: "100%", lg: "30%", xl: "30%", "2xl": "30%" }}>
                <Text>MR. Henry bilson</Text>
                <Text fontWeight="semibold" fontSize="20px">VITAMIN A AND YOUR VISION</Text><br/>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maiores sit enim nihil voluptate veniam eum, doloremque repellendus, amet praesentium est! Quia sequi alias id nesciunt quos obcaecati dolorem fugiat.</Text><br/>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maiores sit enim nihil voluptate veniam eum, doloremque repellendus, amet praesentium est! Quia sequi alias id nesciunt quos obcaecati dolorem fugiat.</Text><br/>
                <Text fontWeight="bold">Read the Story {arrow}</Text>
            </Flex>


        </Flex>

        </Flex>
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
                <InputRightElement _hover={{cursor:"pointer"}} onClick={inp===""?handleVoiceSearch:handleDoctor}>{inp===""? micro:<Text borderRadius="10px" fontWeight="500" bg="primary.100" boxShadow="0 0 5pt 0.5pt #202020 inset" color="white" p="8px 6px">Search</Text>}</InputRightElement>
                <Input _focus={{boxShadow:"0 0 5pt 0.5pt #4d4d4d inset"}} boxShadow="0 0 5pt 0.5pt #202020 inset" value={inp} onChange={(e)=> setInp(e.target.value)} border="1px solid black" w="100%" size="md" type="text" placeholder='Search doctors, appointment etc.'/>
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

export default Home;