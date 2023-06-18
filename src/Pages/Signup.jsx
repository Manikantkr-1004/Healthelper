import {Flex,Box, Heading, InputRightElement, Center, border, useToast} from "@chakra-ui/react";
import {Menu,MenuButton,MenuList,MenuItem,
    Button,useDisclosure,Text,Input,
    InputLeftElement,InputGroup,Card,FormControl,FormLabel,
    FormErrorMessage,FormHelperText,Select} from '@chakra-ui/react'
import "../Styles/Home.css";
import logo from "../Styles/logo.gif"
import {Link, useNavigate,Navigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faUserMd,faLowVision,faGlobe,faSearch,faMicrophone,
faAppleAlt,faPlay, faArrowCircleRight,faHeadphones,
faPhone,faEnvelope,faComments, faArrowRight, faPencil, faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faYoutube, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useContext, useEffect, useState } from "react";
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



function Signup(){

    const {userd,loginUser,logout,handleClickCart,cartDisclosure} = useContext(AuthContext);

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
    const [loading,setLoading] = useState(false);
    const [formdata,setFormData] = useState({
        name:"",
        age:"",
        sex:"",
        image:"",
        Location:"",
        Marital:"",
        Occupation:"",
        About:"",
        Motivation:"",
        email:"",
        password:"",
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

        setLoading(true);

        if (formdata.image instanceof File && formdata.image.name) {
            // An image file has been selected
            // You can proceed with the form submission and API call
            axios
              .post("https://reactapi23.onrender.com/patient", formdata)
              .then(function (res) {
                setLoading(false);
                toast({
                  title: "Account created.",
                  description: "We've created your account for you.",
                  status: "success",
                  duration: 2000,
                  position: "bottom-right",
                  isClosable: true,
                });
        
                setTimeout(() => {
                  navigate("/login");
                }, 2000);
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            // No image file selected, show an error message or handle it accordingly
            console.log("Please select an image file.");
          }
        
    }

    const handleStep = ()=>{
        if(formdata.name==="" || formdata.age==="" || formdata.sex==="" || formdata.Location==="" || formdata.Marital==="" || formdata.Occupation==="" || formdata.image===""){
            toast({
                title: "Please Fill All Input",
                description: "Your Input is Empty!!",
                status: "error",
                duration: 3000,
                isClosable: true
              })
        }else{
            setStep((prev)=> prev+1)
        }
        
    }

    const handleSteptwo = ()=>{
        if(formdata.email==="" || formdata.password===""){
            toast({
                title: "Please Fill All Input",
                description: "Your Input is Empty!!",
                status: "error",
                duration: 3000,
                isClosable: true
              })
        }else{
            setStep((prev)=> prev+1)
        }
        
    }

    if(userd.isAuth){
        return <Navigate to="/" />
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
            <Center><Text textColor="primary.100" fontWeight="bold" fontSize="30px">{user}Signup Account</Text></Center><br/>
            
            {
                step===1 && 
                <FormControl isRequired >
            <FormLabel>Your Full name</FormLabel>
            <InputGroup>
            <InputLeftElement children={pencil}/>
            <Input type="text" border="1px solid black" placeholder='Your Full name' name="name" value={formdata.name} onChange={handleChange} />
            </InputGroup><br/>

            <FormLabel>Your Age</FormLabel>
            <InputGroup>
            <InputLeftElement children={pencil}/>
            <Input type="number" border="1px solid black" placeholder='Your Age' name="age" value={formdata.age} onChange={handleChange} />
            </InputGroup><br/>

            <FormLabel>Your Gender</FormLabel>
            <Select border="1px solid black" name="sex" onChange={handleChange} value={formdata.sex}>
                <option value="">--Select Gender--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </Select><br/>

            <FormLabel>Your Address</FormLabel>
            <InputGroup>
            <InputLeftElement children={pencil}/>
            <Input border="1px solid black" placeholder='Your Address' name="Location" onChange={handleChange} value={formdata.Location}/>
            </InputGroup><br/>

            <FormLabel>Marital Status</FormLabel>
            <Select border="1px solid black" name="Marital" onChange={handleChange} value={formdata.Marital}>
                <option value="">--Select Marital Status--</option>
                <option value="Married">Married</option>
                <option value="Single">Single</option>
            </Select><br/>

            <FormLabel>Your Occupation</FormLabel>
            <InputGroup>
            <InputLeftElement children={pencil}/>
            <Input border="1px solid black" placeholder='Your Occupation' name="Occupation" onChange={handleChange} value={formdata.Occupation}/>
            </InputGroup><br/>

            <FormLabel>Upload Profile Photo</FormLabel>
            <InputGroup>
            <Input variant="unstyle" type="file" accept="image/png, image/jpeg,image/jpg" name="image" onChange={handleChange}/>
            </InputGroup><br/><br/>

            <Flex justifyContent="flex-end">
                <Button onClick={handleStep} _hover={{bg:"primary.300"}} bg="primary.100"><span style={{marginRight:"5px"}}>Next</span>{arrowright}</Button>
            </Flex>
            </FormControl>
            }


            {
                step===2 && 
                <FormControl isRequired>

            <FormLabel>Your Email</FormLabel>
            <InputGroup>
            <InputLeftElement children={pencil}/>
            <Input type="email" border="1px solid black" placeholder='Your Active Email' name="email" onChange={handleChange} value={formdata.email} />
            </InputGroup><br/>

            <FormLabel>Your Password</FormLabel>
            <InputGroup>
            <InputLeftElement children={pencil}/>
            <Input type="text" border="1px solid black" placeholder='Your Password' name="password" onChange={handleChange} value={formdata.password} />
            </InputGroup><br/>

            <Flex justifyContent="space-between">
                <Button onClick={()=>setStep((prev)=> prev-1)} _hover={{bg:"primary.300"}} bg="primary.100">{arrowleft}<span style={{marginLeft:"5px"}}>Previous</span></Button>
                <Button onClick={handleSteptwo} _hover={{bg:"primary.300"}} bg="primary.100"><span style={{marginRight:"5px"}}>Next</span>{arrowright}</Button>
            </Flex>

            </FormControl>
            }

            {
                step===3 && 

                <FormControl isRequired>

                <FormLabel>Write About YourSelf</FormLabel>
                <InputGroup>
                    <InputLeftElement children={pencil}/>
                        <Input type="text" border="1px solid black" placeholder='Write About Yourself' name="About" onChange={handleChange} value={formdata.About}/>
                </InputGroup><br/>

                <FormLabel>Write Your Motivation</FormLabel>
                <InputGroup>
                    <InputLeftElement children={pencil}/>
                        <Input type="text" border="1px solid black" placeholder='Write Your Motivation' name="Motivation" onChange={handleChange} value={formdata.Motivation}/>
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

                {loading===false ? <Input cursor="pointer" textColor="white" fontWeight="bold" bg="primary.100" w="40%" type="submit" value='Create Account' /> : 
                <Button isLoading loadingText='Creating Account' colorScheme='teal' variant='outline'>Submit</Button>}
                </Flex>
                </FormControl>
            }

            <Center><Text mt="20px" fontWeight="bold" fontSize="15px">Already Registered User <Link style={{ color: 'blue',textDecoration:"underline" }} to="/login">Go to Login</Link></Text></Center><br/>

            </form>
        </Box>
        
    </div>
}

export default Signup;