import React, { useEffect, useState } from 'react';
import { Redirect, Switch } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AutheRoutes from './AuthRoutes';
import UnauthRoutes from './UnauthRoutes';


// project imports
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../actions';
import LandingRoutes from './LandingRoutes';

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
    const dispatch =useDispatch();
    const {isLoggedIn, token}= useSelector((state) => state.accountReducer);
    const [isLoading, setLoading] = useState(false);
   
    useEffect(async()=>{
      
        if(!isLoading){
            if(isLoggedIn){
                 dispatch( getUser(token));
                 setLoading(true);
            }else{
                setLoading(true);
            }
        } else{
            setLoading(true);
        }
    });

    return (
        <>
        <Switch>
            <React.Fragment>
                {/* Routes for authentication pages */}
                <AutheRoutes />

                {/* Route for login */}
                <LoginRoutes />

                {/* Route for landing */}
                <LandingRoutes />

                {/* Routes for main layouts */}
                <MainRoutes />

                {/* Routes for simple layouts */}
                <UnauthRoutes/>

                <Redirect from="/**" to={isLoggedIn? '/landing': '/login'} />
            </React.Fragment>
        </Switch>
         </>
    );
};

export default Routes;
