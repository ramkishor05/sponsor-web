import React from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import NavGroup from './NavGroup';
import { useSelector } from 'react-redux';
import NavItem from './NavItem';

//-----------------------|| SIDEBAR MENU LIST ||-----------------------//

const MenuList = () => {
    const userMenuGroupReducer = useSelector((state) => state.userMenuGroupReducer);   
    return userMenuGroupReducer.userMenuGroups.map((item) => {
        switch (item.type) {
            case 'item':
                return <NavItem key={item.id} item={item} />;
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });
};

export default MenuList;
