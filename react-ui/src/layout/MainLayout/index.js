import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import { AppBar, CssBaseline, Toolbar, useMediaQuery } from '@material-ui/core';

// third-party
import clsx from 'clsx';

// project imports
import Breadcrumbs from './../../component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from './../Customization';
import { drawerWidth } from '../../store/constant';
import { SET_MENU } from './../../store/actions';

// assets
import { IconChevronRight } from '@tabler/icons';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { getGlobalSponsorAccount, getMenuGroupByRoleId } from '../../actions';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        backgroundColor: theme.palette.background.default
    },
    appBarWidth: {
        transition: theme.transitions.create('width'),
        backgroundColor: theme.palette.background.default
    },
    content: {
        ...theme.typography.mainContent,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 10),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '5px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '1px',
            marginRight: '10px'
        }
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.down('md')]: {
            marginLeft: '10px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    }
}));

//-----------------------|| MAIN LAYOUT ||-----------------------//

const MainLayout = ({ children }) => {
    const { height, width } = useWindowDimensions();
    let navigation={
        menuItems : []
    }
    const classes = useStyles();
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    const loaderReducer = useSelector((state) => state.loaderReducer);
    
    const userReducer =useSelector((state) => state.userReducer)
    
    const {globalSponsorAccount} = useSelector((state) => state.globalSponsorReducer); // Loading state
    
    const {searchValue} = useSelector((state) => state.searchReducer);

    React.useEffect(async() => {
        dispatch(getGlobalSponsorAccount());
        dispatch(getMenuGroupByRoleId(userReducer?.userDetail?.userRole?.roleId));
        dispatch({ type: SET_MENU, opened: !matchDownMd });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, userReducer, matchDownMd]);
    
    const getPage=()=>{
        if(globalSponsorAccount!=null && Object.keys(globalSponsorAccount).length>0){
            return getMain();
        }
        return  <Redirect to={'/landing'} />
    }

    const getMain=()=>{
       return <div className={classes.root}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                className={leftDrawerOpened ? classes.appBarWidth : classes.appBar}
            >
                <Toolbar style={{padding:8}}>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

            {/* main content */}
            <main
                className={clsx([
                    classes.content,
                    {
                        [classes.contentShift]: leftDrawerOpened
                    }
                ])}
            >
                {/* <Main open={leftDrawerOpened}> */}
                {/* breadcrumb */}
                <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                <PerfectScrollbar component="div" className={classes.ScrollHeight} style={{height : height-110, paddingRight:10, top:0}}>
                {children}
                </PerfectScrollbar>
                {/* </Main> */}
            </main>
            <Customization />
        </div>
    }

    return  (
        getPage()
    );
};

MainLayout.propTypes = {
    children: PropTypes.node
};

export default MainLayout;
