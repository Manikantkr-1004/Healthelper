import "../Styles/Home.css";
import {Flex,Box, InputRightElement, Heading} from "@chakra-ui/react";
import {Button,Text,Input,
    InputLeftElement,InputGroup,useDisclosure} from '@chakra-ui/react'
import logo from "../Styles/logo.gif"
import error from "../Styles/error.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faMicrophone,
faAppleAlt,faPlay,faHeadphones,
faPhone,faEnvelope,faComments} from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faYoutube, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {useNavigate} from "react-router-dom"
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
import { Helmet } from "react-helmet";


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


function NotFound(){

    useEffect(()=>{
        document.body.style.background = "#E0E9F6"
        
    },[])


    const aboutUsDisclosure = useDisclosure();
    const faqDisclosure = useDisclosure();
    const navigate = useNavigate()

    const handleMouseEnter = () => {
        aboutUsDisclosure.onOpen();
        faqDisclosure.onClose();
    };

    const handleMOuse = () => {
        aboutUsDisclosure.onClose();
        faqDisclosure.onOpen();
    };

    const handleError = ()=>{
        navigate("/")
    }

    const handleLogo = ()=>{
        navigate("/")
    }

    const handleDoctor = ()=>{
        navigate("/cart")
    }

    return <div >
        <Helmet>
            <title>404 Not Found | Healthelper</title>
        </Helmet>

        <Box w="100%" textAlign="center" mt="110px" mb="0px" >
            <img id="error" src={error} alt="" />
            <Heading as="h3">Oops.. Page Not Found</Heading><br/>
            <Button onClick={handleError} _hover={{bg:"primary.300",textColor:"black"}} bg="primary.100" textColor="white">Go To HomePage</Button>
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

export default NotFound;