
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
import Customization from './../Customization';
import { drawerWidth } from '../../store/constant';
import { SET_MENU } from './../../store/actions';

// assets
import { IconChevronRight } from '@tabler/icons';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Redirect, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getAccessSponsorByAccountId } from '../../actions/AccessSponsorActions';
import { getGlobalSponsorAccount, getMenuGroupByRoleId } from '../../actions';

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

const LandingLayout = ({ children }) => {

    const loaderReducer = useSelector((state) => state.loaderReducer);
    
    const { height } = useWindowDimensions();
    
    const classes = useStyles();

    const theme = useTheme();

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);

    const dispatch = useDispatch();

    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    const location = useLocation();

    const {isLoggedIn, defaultPath}= useSelector((state) => state.accountReducer);
    
    const userReducer =useSelector((state) => state.userReducer)
    
    const userMenuGroupReducer = useSelector((state) => state.userMenuGroupReducer);

    const {globalSponsorAccount} = useSelector((state) => state.globalSponsorReducer); // Loading state
    
    const [accessSponsor, setAccessSponsor] = useState({}); // Loading state

    React.useEffect(async() => {
        if(userReducer?.userDetail){
            dispatch(getGlobalSponsorAccount());
            dispatch(getAccessSponsorByAccountId(userReducer?.userDetail.id, setAccessSponsor));
            dispatch(getMenuGroupByRoleId(userReducer?.userDetail?.userRole?.roleId));
        }
        dispatch({ type: SET_MENU, opened: !matchDownMd });
    }, [userReducer, getGlobalSponsorAccount, getAccessSponsorByAccountId, getMenuGroupByRoleId,  matchDownMd]);

    const getPage=()=>{
        if(loaderReducer.show_loader){
            return ""
        }
        if(!userReducer.userDetail && !globalSponsorAccount && !accessSponsor){
            return  <Redirect to={'/login'} />
        }

        if(globalSponsorAccount && Object.keys(globalSponsorAccount).length>0){
            return  <Redirect to={defaultPath(userMenuGroupReducer?.userMenuGroups, location, isLoggedIn)} />
        }
        if(accessSponsor && Object.keys(accessSponsor).length>0 && accessSponsor.status){
            return  <Redirect to={defaultPath(userMenuGroupReducer?.userMenuGroups, location, isLoggedIn)} />
        }
        return  getMain();
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
                <PerfectScrollbar component="div" className={classes.ScrollHeight} style={{height : height-110, paddingRight:0, top:0, textAlign: 'center'}}>
                {children}
                </PerfectScrollbar>
                {/* </Main> */}
            </main>
            <Customization />
        </div>
    }
    return (
        getPage()
    );
};

LandingLayout.propTypes = {
    children: PropTypes.node
};

export default LandingLayout;

