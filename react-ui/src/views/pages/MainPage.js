import { Avatar, Card, CardContent, Chip, Grid, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from "@material-ui/core";
import { IconMapper } from "../../constants/IconMapper";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { MENU_OPEN, SET_MENU } from "../../store/actions";
const useStyles = makeStyles((theme) => ({
    listIcon: {
        minWidth: '18px',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    listCustomIconSub: {
        width: '256px',
        height: '6px'
    },
    listCustomIconSubActive: {
        width: '8px',
        height: '8px'
    },
    listItem: {
        marginBottom: '5px',
        alignItems: 'center'
    },
    listItemNoBack: {
        marginBottom: '5px',
        backgroundColor: 'transparent !important',
        paddingTop: '8px',
        paddingBottom: '8px',
        alignItems: 'flex-start'
    },
    subMenuCaption: {
        ...theme.typography.subMenuCaption
    }
}));
const MainPage=(props)=>{
    const classes = useStyles();
    const level=1;
    const customization = useSelector((state) => state.customization);
    const dispatch = useDispatch();
    const matchesSM = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const itemIcon =(item)=> {
        const Icon = IconMapper[item.icon];
        return IconMapper[item.icon] ? 
            <Icon stroke={3.5} size="5.3rem" className={classes.listCustomIcon} />
            : 
            <FiberManualRecordIcon
                className={
                    customization.isOpen.findIndex((id) => id === item.id) > -1 ? classes.listCustomIconSubActive : classes.listCustomIconSub
                }
                fontSize={'default'}
            />
    };

    const itemIconClass=(item)=>{
        let itemIconClass = !item.icon ? classes.listIcon : classes.menuIcon;
        itemIconClass = customization.navType === 'nav-dark' ? [itemIconClass, classes.listCustomIcon].join(' ') : itemIconClass;
        return itemIconClass;
    }
    const itemTarget =(item)=>{
        let itemTarget = '';
        if (item.target) {
            itemTarget = '_blank';
        }
        return itemTarget;
    }
   
    const listItemProps=(item)=>{

        let listItemProps = { component: React.forwardRef((props, ref) => <Link {...props} to={item.url} />) };
        if (item.external) {
            listItemProps = { component: 'a', href: item.url };
        }
        return listItemProps;
    }
    

    const itemHandler = (id) => {
        dispatch({ type: MENU_OPEN, id: id });
        matchesSM && dispatch({ type: SET_MENU, opened: false });
    };


    return(
        <Card>
            <CardContent>
              
                <Grid container spacing={2}>
                    {
                        props.menuGroup?.menuItems?.map(item=>
                            <Grid item sm={4}>
                              
                               <ListItemButton
                                    {...listItemProps(item)}
                                    disabled={item.disabled}
                                    className={level > 1 ? classes.listItemNoBack : classes.listItem}
                                    sx={{ borderRadius: customization.borderRadius + 'px', borderStyle:"groove", border:2 }}
                                    selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
                                    onClick={() => itemHandler(item.id)}
                                    target={itemTarget(item)}
                                    style={{ paddingLeft: level * 23 + 'px' }}
                                    fullwidth
                                >
                                    <ListItemIcon className={itemIconClass(item)}>{itemIcon(item)}</ListItemIcon>

                                    <ListItemText
                                        primary={
                                            <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit"
                                             style={{fontSize:32}}>
                                                {item.title}
                                            </Typography>
                                        }
                                        secondary={
                                            item.caption && (
                                                <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
                                                    {item.caption}
                                                </Typography>
                                            )
                                        }
                                    />
                                    {item.chip && (
                                        <Chip
                                            color={item.chip.color}
                                            variant={item.chip.variant}
                                            size={item.chip.size}
                                            label={item.chip.label}
                                            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                                        />
                                    )}
                                </ListItemButton>
                            </Grid>
                        )
                    }
                
                </Grid>
            </CardContent>
        </Card>
    )
}

export default MainPage;