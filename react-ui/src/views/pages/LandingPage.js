import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessSponsorByAccountId } from "../../actions";

const LandingPage=(props)=>{

    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(true); // Loading state

    const userReducer =useSelector((state) => state.userReducer)
  
    const [accessSponsor, setAccessSponsor] = useState({}); // Loading state
    
    useEffect(async()=>{
        dispatch(getAccessSponsorByAccountId(userReducer?.userDetail.id, setAccessSponsor));
        setLoading(false)
    },[userReducer]);

    return(
        !isLoading && <h1>Your application is : {accessSponsor?.status} </h1>
    )
}

export default LandingPage;