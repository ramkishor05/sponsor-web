import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Avatar,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    List,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Typography
} from '@material-ui/core';
import ListItemButton from '@material-ui/core/ListItemButton';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '../../../../component/cards/MainCard';
import Transitions from '../../../../component/extended/Transitions';

// assets
import { IconLogout, IconSettings } from '@tabler/icons';
import { LOGOUT_SUCCESS } from '../../../../types';

// style const
const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '350px',
        minWidth: '300px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            minWidth: '100%'
        }
    },
    headerAvatar: {
        cursor: 'pointer',
        ...theme.typography.mediumAvatar,
        margin: '8px 0 8px 8px !important'
    },
    profileChip: {
        height: '48px',
        alignItems: 'center',
        borderRadius: '27px',
        transition: 'all .2s ease-in-out',
        borderColor: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.light,
        '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: theme.palette.primary.main + '!important',
            color: theme.palette.primary.light,
            '& svg': {
                stroke: theme.palette.primary.light
            }
        }
    },
    profileLabel: {
        lineHeight: 0,
        padding: '12px'
    },
    listItem: {
        marginTop: '5px'
    },
    cardContent: {
        padding: '16px !important'
    },
    card: {
        backgroundColor: theme.palette.primary.light,
        marginBottom: '16px',
        marginTop: '16px'
    },
    searchControl: {
        width: '100%',
        paddingRight: '8px',
        paddingLeft: '16px',
        marginBottom: '16px',
        marginTop: '16px'
    },
    startAdornment: {
        fontSize: '1rem',
        color: theme.palette.grey[500]
    },
    flex: {
        display: 'flex'
    },
    name: {
        marginLeft: '2px',
        fontWeight: 400
    },
    ScrollHeight: {
        height: '100%',
        maxHeight: 'calc(100vh - 250px)',
        overflowX: 'hidden'
    },
    badgeWarning: {
        backgroundColor: theme.palette.warning.dark,
        color: '#fff'
    }
}));

//-----------------------|| PROFILE MENU ||-----------------------//

const ProfileSection = () => {
    const classes = useStyles();
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { userDetail } = useSelector((state) => state.userReducer);
    const { globalSponsorAccount } = useSelector((state) => state.globalSponsorReducer);
    const dispatcher = useDispatch();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    
    

    const handleLogout = () => {
        dispatcher({ type: LOGOUT_SUCCESS });
       /* axios
            .post( configData.API_SERVER + 'users/logout', {token: `${accountReducer.token}`}, { headers: { Authorization: `${accountReducer.token}` } })
            .then(function (response) {
                
                // Force the LOGOUT
                //if (response.data.success) {
                    dispatcher({ type: LOGOUT });
                //} else {
                //    console.log('response - ', response.data.msg);
                //}
            })
            .catch(function (error) {
                console.log('error - ', error);
            });*/
    };

    const handleWallet= () => {
        //dispatcher({ type: LOGOUT_SUCCESS });
       /* axios
            .post( configData.API_SERVER + 'users/logout', {token: `${accountReducer.token}`}, { headers: { Authorization: `${accountReducer.token}` } })
            .then(function (response) {
                
                // Force the LOGOUT
                //if (response.data.success) {
                    dispatcher({ type: LOGOUT });
                //} else {
                //    console.log('response - ', response.data.msg);
                //}
            })
            .catch(function (error) {
                console.log('error - ', error);
            });*/
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const prevOpen = React.useRef(open);

    const greeting=()=>{
        const date = new Date();
        const currentTime = date.getHours();
        if (currentTime >= 0 && currentTime <= 12) {
          return "Good Morning";
        } else if (currentTime > 12 && currentTime <= 18) {
          return "Good Afternoon";
        } else {
            return  "Good Evening";
        }
    }
    
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <React.Fragment>
            <Chip
                classes={{ label: classes.profileLabel }}
                className={classes.profileChip}
                icon={
                    <Avatar
                        src={userDetail?.userProfile?.pictureURL}
                        className={classes.headerAvatar}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <CardContent className={classes.cardContent}>
                                        <Grid container direction="column" spacing={0} sx={{p:1}}>
                                            <Grid item className={classes.flex}>
                                                <Typography variant="h4">{greeting()},</Typography>
                                                <Typography component="span" variant="h4" className={classes.name}>
                                                    { globalSponsorAccount?.fullName}
                                                </Typography>
                                            </Grid>
                                            <Grid item className={classes.flex}>
                                                <Typography variant="h5">{userDetail?.userRole?.roleName}</Typography>
                                            </Grid>
                                            
                                        </Grid>
                                        {/*<OutlinedInput
                                            className={classes.searchControl}
                                            id="input-search-profile"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder="Search profile options"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <IconSearch stroke={1.5} size="1.3rem" className={classes.startAdornment} />
                                                </InputAdornment>
                                            }
                                            aria-describedby="search-helper-text"
                                            inputProps={{
                                                'aria-label': 'weight'
                                            }}
                                        />*/}
                                        <Divider />
                                        <PerfectScrollbar className={classes.ScrollHeight}>
                                            {/*<UpgradePlanCard />
                                            <Divider />
                                            <Card className={classes.card}>
                                                <CardContent>
                                                    <Grid container spacing={3} direction="column">
                                                        <Grid item>
                                                            <Grid item container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                 <Link to="/user/profile">Edit Profile</Link> 
                                                                </Grid>
                                                                </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid item container alignItems="center" justifyContent="space-between">
                                                                
                                                                <Grid item>
                                                                    <Typography variant="subtitle1">Start DND Mode</Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Switch
                                                                        color="primary"
                                                                        checked={sdm}
                                                                        onChange={(e) => setSdm(e.target.checked)}
                                                                        name="sdm"
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid item container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="subtitle1">Allow Notifications</Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Switch
                                                                        checked={notification}
                                                                        onChange={(e) => setNotification(e.target.checked)}
                                                                        name="sdm"
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                            */}
                                            
                                            <Divider />
                                            <List component="nav" className={classes.navContainer} sx={{width:'90%'}}>
                                               <Link to= {userDetail?.userRole?.roleName==='Admin'? "/global/portal/sponsor":  "/user/portal/sponsor"}>

                                                <ListItemButton
                                                    className={classes.listItem}
                                                    sx={{ padding: 1, borderRadius: customization.borderRadius + 'px' }}
                                                    onClick={handleWallet}
                                                >
                                                     
                                                    <ListItemIcon>
                                                        <ManageAccountsIcon stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                   
                                                    <ListItemText primary={<Typography variant="body2">{globalSponsorAccount.sponsorId}</Typography>} />
                                                   
                                                </ListItemButton>
                                                </Link>
                                            </List>
                                            <List component="nav" className={classes.navContainer} sx={{width:'90%'}}>
                                            <Link to= {userDetail?.userRole?.roleName==='Admin'? "/global/portal/account":  "/user/portal/account"}>
                                                <ListItemButton
                                                    className={classes.listItem}
                                                    sx={{ padding: 1, borderRadius: customization.borderRadius + 'px' }}
                                                    onClick={handleWallet}
                                                >
                                                     
                                                    <ListItemIcon>
                                                        <AccountBalanceWalletIcon stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                   
                                                    <ListItemText primary={<Typography variant="body2">{globalSponsorAccount?.wallet?.balance}</Typography>} />
                                                   
                                                </ListItemButton>
                                                </Link>
                                            </List>
                                            <Divider />
                                            
                                            <List component="nav" className={classes.navContainer} sx={{width:'90%'}}>
                                                <ListItemButton
                                                    className={classes.listItem}
                                                    sx={{ padding:1, borderRadius: customization.borderRadius + 'px' }}
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        <IconLogout stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                </ListItemButton>
                                            </List>
                                        </PerfectScrollbar>
                                    </CardContent>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default ProfileSection;
