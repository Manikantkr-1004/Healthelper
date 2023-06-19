import {Flex,Box, Heading, InputRightElement, Center} from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,
    Button,useDisclosure,Text,Input,
    InputLeftElement,InputGroup,Card} from '@chakra-ui/react'
import "../Styles/Home.css";
import logo from "../Styles/logo.gif"
import health from "../Styles/health.png";
import {useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faUserMd,faLowVision,faGlobe,faSearch,faMicrophone,
faAppleAlt,faPlay, faArrowCircleRight,faHeadphones,
faPhone,faEnvelope,faComments, faArrowRight, faHome, faCartPlus, faShoppingBag, faSignOut, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faYoutube, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

import { Doughnut } from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
ChartJS.register(
    ArcElement, Tooltip, Legend
)

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
const home = <FontAwesomeIcon size="sm" icon={faHome} />
const cart = <FontAwesomeIcon size="sm" icon={faCartPlus} />
const order = <FontAwesomeIcon size="sm" icon={faShoppingBag} />
const log = <FontAwesomeIcon size="sm" icon={faSignOut} />
const login = <FontAwesomeIcon size="sm" icon={faSignIn} />



function Home(){
    const {userd,loginUser,logout,handleClickCart,cartDisclosure} = useContext(AuthContext);

    const aboutUsDisclosure = useDisclosure();
    const faqDisclosure = useDisclosure();
    const navigate = useNavigate()

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

    return <div>
        {/* for Navbar Code */}
        <Flex w="100%" align="center" justify="space-between" bg="primary.400" h="70px" p="0px 70px" position="fixed" mt="0px" zIndex="9999" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" mb="20px">
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

        {/* for Body Code */}

        <Flex w="100%" bg="secondary.200" justify="space-evenly" pt="110px" pb="60px">
            <Flex display="block" textAlign="left">
                <Heading as="h1" fontSize="50px">Healthelper</Heading><br/>
                <Text fontSize="20px" fontWeight="semibold">Initial Consultation with any doctor is for free</Text><br /><br /><br />
                <InputGroup>
                <InputLeftElement>{search}</InputLeftElement>
                <InputRightElement>{micro}</InputRightElement>
                <Input border="1px solid black" w="100%" size="md" type="text" placeholder='Search doctors, appointment etc.'/>
                </InputGroup><br />
                <Button onClick={handleDoctor} bg="primary.100" textColor="white"
                _hover={{bg:"primary.100"}}>Book an appointment</Button>
            </Flex>
            <Flex >
                <img id="health" src={health} alt="" />
            </Flex>
        </Flex>

        {/* for 2nd body */}


        <Box bg="secondary.100" width="100%" pt="40px" pb="40px">
            <Flex display="block" w="80%" m="auto" mb="20px">
            <Flex width="100%" justify="space-between">
                <Flex><Text fontWeight="semibold" fontSize="30px">Popular Specializations</Text></Flex>
                <Flex flexBasis="40%"><InputGroup>
                <InputLeftElement>{search}</InputLeftElement>
                <InputRightElement>{micro}</InputRightElement>
                <Input border="1px solid black" size="lg" w="100%" type="text" placeholder='Search doctors, appointment etc.'/>
                </InputGroup></Flex>
            </Flex>
            </Flex>
            <Flex display="block" w="80%" m="auto" mb="20px">
            <Flex width="100%" justify="space-between">
                <Flex borderRadius="7px" p="18px 15px" bg="primary.200"  textColor="white">{doctor1} Cardiology</Flex>
                <Flex borderRadius="7px" p="18px 15px" bg="primary.200"  textColor="white">{doctor1} Dermatology</Flex>
                <Flex borderRadius="7px" p="18px 15px" bg="primary.200"  textColor="white">{doctor1} Orthopedics</Flex>
                <Flex borderRadius="7px" p="18px 15px" bg="primary.200"  textColor="white">{doctor1} Neurology</Flex>
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
            <Flex width="100%" justify="space-between">
                <Flex><Text fontWeight="semibold" fontSize="30px">Three steps to make an appointment</Text></Flex>
                <Flex>
                <Button onClick={handleDoctor} bg="primary.100" textColor="white"
                _hover={{bg:"primary.100"}}>Book an appointment</Button>
                </Flex>
            </Flex>
            </Flex>

        <Flex w="80%" m="auto" mb="5px" justify="space-between">
            <Flex display="block" w="30%">
                <img id="booking" src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000" alt="" />
                <Text fontWeight="bold">Consult a Doctor</Text>
                <Text>First You need to consult a doctor to make sure you have such related problems which doctor can help you.</Text>
            </Flex>
            <Flex display="block" w="30%">
                <img id="booking" src="https://img.freepik.com/free-vector/appointment-booking-with-smartphone-running-woman_23-2148559016.jpg" alt="" />
                <Text fontWeight="bold">Book Appointment</Text>
                <Text>Then you need to book according to calender because it's mandatory to book the free slot, whenever you free.</Text>
            </Flex>
            <Flex display="block" w="30%">
                <img id="booking" src="https://img.freepik.com/free-vector/cartoon-online-medical-conference_23-2148906039.jpg?w=740&t=st=1686820644~exp=1686821244~hmac=581b67b613c221ba2df3640bf92734942804c96c62fbb3d9f006adc3dc8bb95c" alt="" />
                <Text fontWeight="bold">Online Meeting</Text>
                <Text>Then according to booking slot, doctor will come and you will have to talk to doctor about your problems, so be punchual.</Text>
            </Flex>
        </Flex>
        <Flex w="80%" m="auto" mb="20px" ><img id="progress" src="https://quantumleapcommerce.com/wp-content/uploads/2019/02/123-Step.png" alt="" /></Flex>
        <Flex w="80%" m="auto"  >
            <Flex display="block" textAlign="left" fontWeight="bold"><Text>For Your best Mobility and comfort</Text>
            <Text>Download Our Application</Text></Flex>
            <Flex  align="center" ml="30px">
                <Button mr="10px" bg="transparent" border='2px solid #000' textColor="#000">{apple} <span style={{ marginLeft: "7px" }}>Google Play</span></Button>
                <Button bg="transparent" border='2px solid #000' textColor="#000">{play} <span style={{ marginLeft: "7px" }}>Google Play</span></Button>
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

        <Flex w="80%" m="auto" justify="space-between">
            <Flex w="30%" display="block" >
                <Text textAlign="left">01. <span style={{fontWeight:"bold"}}>PATIENTS</span></Text>
                <Flex w="100%" justify="space-between" >
                <Flex w="50%">
                    <Doughnut data={data} options={options} />
                </Flex>
                    <Flex w="50%" display="block"  textAlign="left">
                        <Text fontWeight="bold">94%</Text>
                        <Text>We help our patients 24 hours with 7 days, and main thing we provide our services on Online platform.</Text>
                    </Flex>
                </Flex>
            </Flex>

            <Flex w="30%" display="block" >
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

            <Flex w="30%" display="block" >
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

        <Flex width="100%" justify="space-between">

            <Flex display="block" w="30%" h="500px">
                <img style={{marginBottom:"30px",borderRadius:"20px"}} src="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2017/10/VitaminB12-SG-770x533-1-650x428.jpg" alt="" />
                <img style={{borderRadius:"20px"}} src="https://femina.wwmindia.com/content/2022/feb/vitamin-011643976708.jpg" alt="" />
            </Flex>

            <Flex display="block" w="35%" h="500px">
                <img id="child-doctor" src="https://thumbs.dreamstime.com/b/female-doctor-examining-child-20598151.jpg" alt="" />
            </Flex>

            <Flex display="block" w="30%" textAlign="left" h="500px">
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

export default Home;