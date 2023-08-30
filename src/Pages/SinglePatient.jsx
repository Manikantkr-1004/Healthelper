import { Box, Button, Flex,Stack,Skeleton,Image,Text } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter} from '@chakra-ui/react'
import "../Styles/SingleDoctor.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios"
import { faTelegram, faYoutube, faFacebook, faPinterestSquare } from "@fortawesome/free-brands-svg-icons";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
import { Helmet } from "react-helmet";

const telegram = <FontAwesomeIcon size="xl" icon={faTelegram} className="icon" />;
const youtube = <FontAwesomeIcon size="xl" icon={faYoutube} className="icon" />;
const instagram = <FontAwesomeIcon size="xl" icon={faPinterestSquare} className="icon" />;
const facebook = <FontAwesomeIcon size="xl" icon={faFacebook} className="icon" />;
const arrow = <FontAwesomeIcon fade size="lg" icon={faArrowCircleLeft} />

function SinglePatient(){

    const {userd} = useContext(AuthContext);
    const navigate = useNavigate();
    const {id} = useParams()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false);

    let modifiedname="";

    if(userd.isAuth){
        userd.name.split(" ").map((item)=>(
            modifiedname+= item[0].toUpperCase()
        ))
    }

    useEffect(()=>{
        document.body.style.backgroundColor = "#E0E9F6"
        fetchingData(id)
    },[id])

    function fetchingData(id){
        setLoading(true);

        axios.get(`https://reactapi23.onrender.com/patient/${id}`)
        .then(function(res){
            setLoading(false);
            setData(res.data);

        }).catch(function(error){
            console.log(error);
        })
    }

    console.log(data)

    return <div id="container" style={{marginTop:"80px"}}>

        <Helmet>
            <title>{data? `${data.name} | Healthelper`:"Patient | Healthelper"}</title>
        </Helmet>
        
        <Box onClick={()=> navigate("/")} w={{base:"95%", sm: "95%", md: "70%", lg: "60%", xl: "70%", "2xl": "80%" }} m="auto" textAlign="left">< Button _hover={{bg:"primary.300"}} bg="primary.100" textColor="white">{arrow} <span style={{marginLeft:"4px"}}>Go Back</span></Button></Box>

        <Flex w={{base:"95%", sm: "95%", md: "70%", lg: "60%", xl: "70%", "2xl": "80%" }} direction={{base:"column", sm: "column", md: "column", lg: "row", xl: "row", "2xl": "row" }} m="auto" borderRadius="30px" bg="white" mt="30px" pb="30px">

            <Box w={{base:"90%", sm: "90%", md: "90%", lg: "35%", xl: "35%", "2xl": "35%" }} >
            <Card w="100%" borderRadius="30px 0px 0px 30px" textAlign="left" variant="unstyled">
            <CardBody p="50px" textColor="#3b5386" variant="unstyled">
                {
                    loading ? <Stack><Skeleton width="100%" height="100px"/><Skeleton width="100%" height="400px"/></Stack> : <>
                    <Text width="180px" height="180px" fontSize="80px" justifyContent="center" color="primary.100" display="flex" alignItems="center" border="3px solid #3B5386" borderRadius="50%">{modifiedname}</Text>
                    <Text mt="15px" mb="25px" fontWeight="bold">{data.name}</Text>
                    <Text>Age:</Text>
                    <Text mb="10px" fontWeight="bold">{data.age}</Text>

                    <Text>Sex:</Text>
                    <Text mb="10px" fontWeight="bold">{data.sex}</Text>

                    <Text>Location:</Text>
                    <Text mb="10px" fontWeight="bold">{data.Location}</Text>

                    <Text>Marital Status:</Text>
                    <Text mb="10px" fontWeight="bold">{data.Marital}</Text>

                    <Text>Occupation:</Text>
                    <Text mb="10px" fontWeight="bold">{data.Occupation}</Text>

                    <Text>Networks:</Text>
                    <Flex mb="9px"><span style={{marginRight:"9px"}}>{telegram}</span>{youtube}</Flex>
                    <Flex><span style={{marginRight:"9px"}}>{instagram}</span>{facebook}</Flex>
                    </>
                }
            </CardBody>
            </Card>
            </Box>

            <Box w={{base:"90%", sm: "90%", md: "90%", lg: "65%", xl: "65%", "2xl": "65%" }}>
            <Card w="100%" borderRadius="0px 30px 30px 0px" textAlign="left" variant="unstyled">
            <CardBody p="50px" pb="0px" borderRadius="0px 30px 30px 0px" variant="unstyled">
                {
                    loading ? <Stack><Skeleton width="100%" height="500px"/></Stack> : <div>
                    <Text mb="35px">{data.About}</Text>

                    <Text fontWeight="bold">Motivation:</Text>
                    <Text mb="20px">{data.Motivation}</Text>

                    <Text fontWeight="bold">Pains and needs:</Text>
                    <ul style={{marginLeft:"30px"}}>
                        { data.Pains && 
                            data.Pains.map((item,index)=>(
                                <li key={index}>{item}</li>
                            ))
                        }
                    </ul><br/>

                    <Text fontWeight="bold">Experience of use:</Text>
                    <Text mb="10px">{data.Exp}</Text>

                    <Text fontWeight="bold">Context of interaction:</Text>
                    <Text mb="10px">{data.Context}</Text>
                    </div>
                }
            </CardBody>
            </Card>
            </Box>
        </Flex>

    </div>
}

export default SinglePatient;