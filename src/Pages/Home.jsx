import {Flex,Box} from "@chakra-ui/react"
import "../Styles/Home.css";
import logo from "../Styles/logo.gif"

function Home(){
    return <div>
        <Flex align="center" justify="space-between" bg="primary.400" h="70px" p="0px 70px">
            <img id="logo" src={logo} alt="logo" />
            <Box fontWeight="semibold">Doctors</Box>
            <Box fontWeight="semibold">About us</Box>
            <Box fontWeight="semibold">FAQ</Box>
            <Box fontWeight="semibold">My Help</Box>
            <Flex justify="space-between" flexBasis="240px">
            <Box id="findoctor" border="2px solid black" p="7px 5px" borderRadius="10px" fontWeight="semibold">I'm a Doctor</Box>
            <Box id="findmedical" border="2px solid black" p="7px 5px" borderRadius="10px" fontWeight="semibold">I'm a Patient</Box>
            </Flex>
            <Box>Browser</Box>
        </Flex>
    </div>
}

export default Home;