
import { Skeleton } from "@chakra-ui/react";

function Loading(){
    let skel = new Array(12).fill(0);

    let skelala = skel.map((item)=>(
        <Skeleton height="250px"/>
    ))
    return skelala
}

export default Loading;