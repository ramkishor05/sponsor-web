import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Divider, List, ListItemIcon, Typography } from '@material-ui/core';

// project imports
import NavItem from './../NavItem';
import NavCollapse from './../NavCollapse';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useSelector } from 'react-redux';
import { IconMapper } from '../../../../../constants/IconMapper';

// style constant
const useStyles = makeStyles((theme) => ({
    menuCaption: {
        ...theme.typography.menuCaption
    },
    subMenuCaption: {
        ...theme.typography.subMenuCaption
    },
    menuDivider: {
        marginTop: '2px',
        marginBottom: '10px'
    }
}));

//-----------------------|| SIDEBAR MENU LIST GROUP ||-----------------------//

const NavGroup = ({ item ,filter }) => {
    const customization = useSelector((state) => state.customization);
    const level=1;
    const classes = useStyles();

    if(item.menuItems.length==1){
        let menu= item.menuItems[0]
        item.type=menu.type;
        item.url=menu.url;
        item.title=menu.title;
        item.icon=menu.icon;
        item.orderSequence=menu.orderSequence;
        if(menu.menuItems && menu.menuItems.length>0){
            item.menuItems=menu.menuItems
        }
       
    }

    // menu list collapse & items
    let items = filter? filter(item.menuItems).map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    }):item.menuItems?  item.menuItems.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    }) :[];


    const Icon = IconMapper[item.icon];
    const itemIcon = IconMapper[item.icon] ? (
        <Icon stroke={1.5} size="1.3rem" className={classes.listCustomIcon} />
    ) : (
        <FiberManualRecordIcon
            className={
                customization.isOpen.findIndex((id) => id === item.id) > -1 ? classes.listCustomIconSubActive : classes.listCustomIconSub
            }
            fontSize={level > 0 ? 'inherit' : 'default'}
        />
    );

    let itemIconClass = !item.icon ? classes.listIcon : classes.menuIcon;
    itemIconClass = customization.navType === 'nav-dark' ? [itemIconClass, classes.listCustomIcon].join(' ') : itemIconClass;


    return (
        <React.Fragment>
            <List 
              style={{'disabled': item.disabled, padding:"0px 9px 0px"}}
                subheader={
                    item.title && (
                        <>
                         
                        <Typography variant="caption" className={classes.menuCaption} display="block" gutterBottom>
                           {
                            item.url && !item.disabled && items.length>1 ? 
                            <Link to={item.url}  >
                            {itemIcon} {item.title}
                           </Link>
                           : <>
                           {itemIcon}{item.title}
                           
                            {item.caption && (
                                <Typography variant="caption" disabled className={classes.subMenuCaption} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                            </>
                }
                        </Typography>
                        </>
                    )
                }
            >
                {items.length>1 && items}
            </List>

            {/* group divider */}
            <Divider className={classes.menuDivider} />
        </React.Fragment>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
