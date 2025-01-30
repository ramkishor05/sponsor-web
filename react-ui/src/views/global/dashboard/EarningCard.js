import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid, Menu, MenuItem, Typography } from '@material-ui/core';

// project imports
import MainCard from '../../../component/cards/MainCard';
import SkeletonEarningCard from '../../../component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from './../../../assets/images/icons/earning.svg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppOutlined';
import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@material-ui/icons/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@material-ui/icons/ArchiveOutlined';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.secondary.dark,

        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    content: {
        padding: '20px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.secondary[800],
        marginTop: '8px'
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary[200],
        zIndex: 1
    },
    cardHeading: {
        fontSize: '2.75rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px',
        zIndex: "1 !important" 
    },
    subHeading: {
        fontSize: '1.5rem',
        fontWeight: 500,
        color: '#fff',
        zIndex: "1 !important" 
    },
    subTitle: {
        fontSize: '1.2rem',
        fontWeight: 500,
        color: '#fff',
        zIndex: "1 !important" 
    },
    avatarCircle: {
        cursor: 'pointer',
        ...theme.typography.smallAvatar,
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    },
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem'
    }
}));

//===========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const EarningCard = ({ isLoading , title, subTitle, price, symbol, background, Icon}) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}
                style={{background: background}}
                >
                    <Grid container direction="column" alignItems="center" textAlign={"center"}>
                        
                        <Grid item>
                            <Grid container >
                                <Grid item  style={{zIndex:1}}>
                                <Typography component="h1" className={classes.subHeading}>{title}</Typography>

                                   
                                </Grid>
                            </Grid>
                            
                        </Grid>
                        <Grid item style={{zIndex:1}}>
                        <Typography component="h1"  className={classes.cardHeading}>{symbol}{price}</Typography>
                        <span className={classes.subTitle}>{subTitle}</span>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </React.Fragment>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool,
    Icon: PropTypes.element
};

export default EarningCard;
