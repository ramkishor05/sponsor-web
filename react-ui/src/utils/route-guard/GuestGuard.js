import PropTypes from 'prop-types';
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

// project imports
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../../actions';

//-----------------------|| GUEST GUARD ||-----------------------//

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */
const GuestGuard = ({ children }) => {
    
    const { isLoggedIn} = useSelector((state) => state.accountReducer);
    const { userDetail }= useSelector((state) => state.userReducer);
       
    useEffect(()=>{
       
    },[])

    if (isLoggedIn ) {
        if(userDetail)
             return <Redirect to={'/landing'} />;
        else
             return <Redirect to={'/login'} />;
    } 
    return children;
    
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
