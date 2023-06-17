import { Box, Button, Flex,Stack,Skeleton,Image,Text } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter} from '@chakra-ui/react'
import "../Styles/SingleDoctor.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
import { faTelegram, faYoutube, faFacebook, faPinterestSquare } from "@fortawesome/free-brands-svg-icons";

const telegram = <FontAwesomeIcon size="xl" icon={faTelegram} className="icon" />;
const youtube = <FontAwesomeIcon size="xl" icon={faYoutube} className="icon" />;
const instagram = <FontAwesomeIcon size="xl" icon={faPinterestSquare} className="icon" />;
const facebook = <FontAwesomeIcon size="xl" icon={faFacebook} className="icon" />;
const arrow = <FontAwesomeIcon fade size="lg" icon={faArrowCircleLeft} />

function SinglePatient(){
    const navigate = useNavigate();
    const {id} = useParams()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false);

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

    return <div id="container">
        
        <Box onClick={()=> navigate("/doctorhome")} w="60%" m="auto" textAlign="left">< Button _hover={{bg:"primary.300"}} bg="primary.100" textColor="white">{arrow} <span style={{marginLeft:"4px"}}>Go Back</span></Button></Box>

        <Flex w="60%" m="auto" borderRadius="30px" bg="white" mt="30px" pb="30px">

            <Box w="35%" >
            <Card w="100%" borderRadius="30px 0px 0px 30px" textAlign="left" variant="unstyled">
            <CardBody p="50px" textColor="#3b5386" variant="unstyled">
                {
                    loading ? <Stack><Skeleton width="100%" height="100px"/><Skeleton width="100%" height="400px"/></Stack> : <>
                    <Image borderRadius="10px" w="100%" src={data.image} alt="image" ></Image>
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

            <Box w="65%">
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