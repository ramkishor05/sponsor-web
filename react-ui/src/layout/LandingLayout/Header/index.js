import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Box, ButtonBase, Grid, Typography } from '@material-ui/core';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
// project imports
import LogoSection from '../LogoSection';

// assets
import { IconMenu2 } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSection from './ProfileSection';
import SearchSection from './SearchSection';
import NotificationSection from './NotificationSection'
import { addSearch } from '../../../actions';
import { NotificationsNone } from '@material-ui/icons';

// style constant
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 2
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
        '&:hover': {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.light
        }
    },
    boxContainer: {
        flexGrow: 1,
        width: '228px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        }
    },
    rightContainer: {
        flexGrow: 8,
        display: 'flex',
        alignContent: 'right',
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        }
    },
    right2Container: {
        flexGrow: .5,
        display: 'flex',
        alignContent: 'right',
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        }
    }
}));

//-----------------------|| MAIN NAVBAR / HEADER ||-----------------------//

const Header = ({ handleLeftDrawerToggle }) => {
    const {userDetail} =useSelector((state) => state.userReducer)

    const classes = useStyles();

    return (
        <React.Fragment>
            {/* logo & toggler button */}
            <div className={classes.boxContainer} >
                <Box component="span" 
                sx={{ display: { xs: 'block', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
            </div>
            
            <div className={classes.rightContainer} >
            </div>
            <div className={classes.right2Container} >
            </div>
            <div className={classes.right2Container} >
                <Grid container spacing={1} direction="column">
                    <Grid item sx="12" >
                        <Typography variant="span"> {userDetail?.accountName}</Typography>
                    </Grid>
               </Grid>
            </div>
            <ProfileSection></ProfileSection>
        </React.Fragment>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
