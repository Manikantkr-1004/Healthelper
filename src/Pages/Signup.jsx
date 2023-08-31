import {Flex,Box, Center, useToast} from "@chakra-ui/react";
import {
    Button,useDisclosure,Text,Input,
    InputLeftElement,InputGroup,FormControl,FormLabel,FormHelperText,Select} from '@chakra-ui/react'
import "../Styles/Home.css";
import back from  "../Styles/back.png"
import {Link, useNavigate,Navigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faArrowRight, faPencil, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
import { Helmet } from "react-helmet";

const pencil = <FontAwesomeIcon fade size="sm" icon={faPencil} />
const user = <FontAwesomeIcon flip size="lg" icon={faUserCircle} />
const arrowright = <FontAwesomeIcon shake size="sm" icon={faArrowRight} />
const arrowleft = <FontAwesomeIcon shake size="sm" icon={faArrowLeft} />


function Signup(){

    const {userd} = useContext(AuthContext);

    const aboutUsDisclosure = useDisclosure();
    const faqDisclosure = useDisclosure();
    const navigate = useNavigate();
    const toast = useToast();
    const [data,setData] = useState([]);

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
        document.body.style.backgroundImage =`url(${back})`;
        document.body.style.backgroundColor = "#E0E9F6";
        axios.get("https://reactapi23.onrender.com/patient")
        .then(function(res){
            setData(res.data);

        }).catch(function(error){
            console.log(error)
        })
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
            // updatedValue = {...files[0]}
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue,
        }));
        
    }

    console.log(formdata)

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
                  description: "We've created account for you.",
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
        let details = data.find((item)=> item.email=== formdata.email);
        
        if(formdata.email==="" || formdata.password===""){
            toast({
                title: "Please Fill All Input",
                description: "Your Input is Empty!!",
                status: "error",
                duration: 3000,
                isClosable: true
              })
              return;
        }
        if(details){
            toast({
                title: "Email is already registered!!",
                status: "error",
                duration: 3000,
                isClosable: true
              })
              return;
        }else{
            setStep((prev)=> prev+1)
        }
        
    }

    if(userd.isAuth){
        return <Navigate to="/" />
    }

    // console.log(formdata)


    return <div>

        <Helmet>
            <title>Signup | Healthelper</title>
        </Helmet>

        <Box w={{base:"95%", sm: "60%", md: "400px", lg: "400px", xl: "400px", "2xl": "400px" }} m="auto" mt={{base:"90px",sm:"110px",md:"120px",lg:"130px",xl:"130px"}}
        mb="30px" p="30px" pb="5px" borderRadius="10px" 
        bg={{base:"none",sm:"white",md:"white",lg:"white",xl:"white"}}
        boxShadow={{base:"none",sm:"rgba(0, 0, 0, 0.24) 0px 3px 8px",md:"rgba(0, 0, 0, 0.24) 0px 3px 8px",lg:"rgba(0, 0, 0, 0.24) 0px 3px 8px",xl:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
            <form onSubmit={handleSubmit} >
            <Center><Text textColor="primary.100" fontWeight="bold" fontSize={{base:"20px", sm: "20px", md: "30px", lg: "30px", xl: "30px", "2xl": "30px" }}>{user}Signup Account</Text></Center><br/>
            
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

                {loading===false ? <Input cursor="pointer" textColor="white" fontWeight="bold" bg="primary.100" w="45%" type="submit" value='Create Account' /> : 
                <Button isLoading loadingText='Creating Account' colorScheme='teal' variant='outline'>Submit</Button>}
                </Flex>
                </FormControl>
            }

            <Center><Text mt="20px" fontWeight="bold" fontSize="15px">Registered User ? <Link style={{ color: 'blue',textDecoration:"underline" }} to="/login">Go to Login</Link></Text></Center><br/>

            </form>
        </Box>

        
    </div>
}

export default Signup;