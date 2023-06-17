import {Flex,Box, Heading, InputRightElement, Center, border, useToast} from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,
    Button,useDisclosure,Text,Input,
    InputLeftElement,InputGroup,Card,FormControl,FormLabel,
    FormErrorMessage,FormHelperText,Select} from '@chakra-ui/react'
import "../Styles/Home.css";
import logo from "../Styles/logo.gif"
import {useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faUserMd,faLowVision,faGlobe,faSearch,faMicrophone,
faAppleAlt,faPlay, faArrowCircleRight,faHeadphones,
faPhone,faEnvelope,faComments, faArrowRight, faPencil, faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faYoutube, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Patient = <FontAwesomeIcon fade size="sm" icon={faUserCircle} />
const doctor = <FontAwesomeIcon flip size="sm" icon={faUserMd} />
const visual = <FontAwesomeIcon size="sm" icon={faLowVision} />
const globe = <FontAwesomeIcon size="lg" icon={faGlobe} />
const pencil = <FontAwesomeIcon fade size="sm" icon={faPencil} />
const user = <FontAwesomeIcon flip size="lg" icon={faUserCircle} />
const arrowright = <FontAwesomeIcon shake size="sm" icon={faArrowRight} />
const arrowleft = <FontAwesomeIcon shake size="sm" icon={faArrowLeft} />
const check = <FontAwesomeIcon shake size="sm" icon={faCheckCircle} />



function Signup(){

    const aboutUsDisclosure = useDisclosure();
    const faqDisclosure = useDisclosure();
    const navigate = useNavigate();
    const toast = useToast();

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

    const [step,setStep] = useState(1);
    const [formdata,setFormData] = useState({
        Exp : "The user is a new and will continue to use the service",
        Context : "At his own request, uses a mobile phone or tablet most often, especially during work.",
        Pains: [
            "have a choice of medical staff",
            "the ability to make an appointment at any time",
            "recieve prescriptions and examination results online"
            ],
    })

    const handleChange = (e)=>{
        const { name, value, files } = e.target;
        let updatedValue = value;

        // Check if the input is of type "file" and has selected files
        if (e.target.type === 'file' && files.length > 0) {
            updatedValue = files[0]; // Assign the file object to the updated value
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue,
        }));

    }

    const handleSubmit= (e)=>{
        e.preventDefault();

        axios.post("https://reactapi23.onrender.com/patient",formdata)
        .then(function(res){
            toast({
                title: "Signup Successfull",
                description: "Your Accound has been Created",
                status: "success",
                duration: 2000,
                isClosable: true
              })

              navigate("/login");


        }).catch(function(error){
            console.log(error)
        })
    }

    // console.log(formdata)


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

        <Box w="40%" m="auto" mt="130px" mb="30px">
            <form onSubmit={handleSubmit} style={{backgroundColor:'white',padding:"30px",borderRadius:"10px",boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
            <Center><Text textColor="primary.100" fontWeight="bold" fontSize="30px">{user}Signup Acount</Text></Center><br/>
            
            {
                step===1 && 
                <FormControl isRequired>
            <FormLabel>Your Full name</FormLabel>
            <InputGroup>
            <InputLeftElement children={pencil}/>
            <Input type="text" border="1px solid black" placeholder='Your Full name' name="name" onChange={handleChange} />
            </InputGroup><br/>

            <FormLabel>Your Age</FormLabel>
            <InputGroup>
            <InputLeftElement children={pencil}/>
            <Input type="number" border="1px solid black" placeholder='Your Age' name="age" onChange={handleChange} />
            </InputGroup><br/>

            <FormLabel>Your Gender</FormLabel>
            <Select border="1px solid black" name="sex" onChange={handleChange}>
                <option value="">--Select Gender--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </Select><br/>

            <FormLabel>Your Address</FormLabel>
            <InputGroup>
            <InputLeftElement children={pencil}/>
            <Input border="1px solid black" placeholder='Your Address' name="Location" onChange={handleChange}/>
            </InputGroup><br/>

            <FormLabel>Marital Status</FormLabel>
            <Select border="1px solid black" name="Marital" onChange={handleChange}>
                <option value="">--Select Marital Status--</option>
                <option value="Married">Married</option>
                <option value="Single">Single</option>
            </Select><br/>

            <FormLabel>Your Occupation</FormLabel>
            <InputGroup>
            <InputLeftElement children={pencil}/>
            <Input border="1px solid black" placeholder='Your Occupation' name="Occupation" onChange={handleChange}/>
            </InputGroup><br/>

            <FormLabel>Upload Profile Photo</FormLabel>
            <Input variant="unstyle" type="file" accept="image/png, image/jpeg,image/jpg" name="image" onChange={handleChange}/><br/><br/>

            <Flex justifyContent="flex-end">
                <Button onClick={()=>setStep((prev)=> prev+1)} _hover={{bg:"primary.300"}} bg="primary.100"><span style={{marginRight:"5px"}}>Next</span>{arrowright}</Button>
            </Flex>
            </FormControl>
            }


            {
                step===2 && 
                <FormControl isRequired>

            <FormLabel>Your Email</FormLabel>
            <InputGroup>
            <InputLeftElement children={pencil}/>
            <Input type="email" border="1px solid black" placeholder='Your Full name' name="email" onChange={handleChange} required/>
            </InputGroup><br/>

            <FormLabel>Your Password</FormLabel>
            <InputGroup>
            <InputLeftElement children={pencil}/>
            <Input type="text" border="1px solid black" placeholder='Your Full name' name="password" onChange={handleChange} required/>
            </InputGroup><br/>

            <Flex justifyContent="space-between">
                <Button onClick={()=>setStep((prev)=> prev-1)} _hover={{bg:"primary.300"}} bg="primary.100">{arrowleft}<span style={{marginLeft:"5px"}}>Previous</span></Button>
                <Button onClick={()=>setStep((prev)=> prev+1)} _hover={{bg:"primary.300"}} bg="primary.100"><span style={{marginRight:"5px"}}>Next</span>{arrowright}</Button>
            </Flex>

            </FormControl>
            }

            {
                step===3 && 

                <FormControl isRequired>

                <FormLabel>Write About YourSelf</FormLabel>
                <InputGroup>
                    <InputLeftElement children={pencil}/>
                        <Input type="text" border="1px solid black" placeholder='Write About Yourself' name="About" onChange={handleChange}/>
                </InputGroup><br/>

                <FormLabel>Write Your Motivation</FormLabel>
                <InputGroup>
                    <InputLeftElement children={pencil}/>
                        <Input type="text" border="1px solid black" placeholder='Write Your Motivation' name="Motivation" onChange={handleChange}/>
                </InputGroup>
                <FormHelperText textAlign="left">Write like this - (Comfort in treatment, conveninent appointment times, affordable prices) </FormHelperText>
                <br/>

                <FormLabel>Your Experience</FormLabel>
                <InputGroup>
                    <InputLeftElement children={pencil}/>
                        <Input bg="secondary.300" isReadOnly type="text" border="1px solid black" value="The user is a new and will continue to use the service" />
                </InputGroup><br/>

                <FormLabel>Your Context</FormLabel>
                <InputGroup>
                    <InputLeftElement children={pencil}/>
                        <Input bg="secondary.300" isReadOnly type="text" border="1px solid black" value="At his own request, uses a mobile phone or tablet most often, especially during work." />
                </InputGroup><br/>

                <Flex justifyContent="space-between">
                <Button onClick={()=>setStep((prev)=> prev-1)} _hover={{bg:"primary.300"}} bg="primary.100">{arrowleft}<span style={{marginLeft:"5px"}}>Previous</span></Button>

                <Input cursor="pointer" textColor="white" fontWeight="bold" bg="primary.100" w="40%" type="submit" value='Create Account' />
                </Flex>
                </FormControl>
            }


            </form>
        </Box>
        
    </div>
}

export default Signup;