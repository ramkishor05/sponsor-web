import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@material-ui/core';

// project imports

import Logo from './../../../component/Logo';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoSection = () => {
    const location = useLocation();
    const {isLoggedIn, defaultPath}= useSelector((state) => state.accountReducer);
    const userMenuGroupReducer = useSelector((state) => state.userMenuGroupReducer);
    
    return (
        <ButtonBase disableRipple component={Link} to={defaultPath(userMenuGroupReducer?.userMenuGroups, location, isLoggedIn)}>
            <Logo />
        </ButtonBase>
    );
};

export default LogoSection;
