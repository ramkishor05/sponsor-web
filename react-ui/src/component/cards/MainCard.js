import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';
import { Card, CardActionArea, CardActions, CardContent, CardHeader, Divider, Typography } from '@material-ui/core';
import { Margin, Padding } from '@material-ui/icons';

// constant
const headerSX = {
    '& .MuiCardHeader-action': { padding:0, margin:0 },
    '& .MuiCardHeader-root': { padding:0, margin:0 }
};

//-----------------------|| CUSTOM MAIN CARD ||-----------------------//

const MainCard = React.forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass,
            button,
            filter,
            subheader,
            contentSX,
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            actions,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();

        return (
            <Card 
                ref={ref}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderColor: theme.palette.primary[200] + 75,
                    ':hover': {
                        boxShadow: boxShadow ? (shadow ? shadow : '0 2px 1px 0 rgb(32 40 45 / 8%)') : 'inherit'
                    },
                    ...sx
                }}
            >
                {/* card header and action */}
                {!darkTitle && title && <CardHeader sx={headerSX} title={title} 
                style={{padding:8 }}
                action={
                    <>
                    {
                    button
                        ? <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'baseline',
                            justifyContent: 'flex-end'
                        }}>                 
                            <div style={{ 
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: 'flex-end'
                            }}>
                                { 
                                    button 
                                }
                            </div>
                        </div>
                        : null
                    } { filter
                        ? <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'baseline',
                            justifyContent: 'flex-end'
                        }}>                 
                            <div style={{ 
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: 'flex-end'
                            }}>
                                { 
                                    filter 
                                }
                            </div>
                        </div>
                        : null
                            }
                    </>
                } subheader={subheader} />
                   }
                {darkTitle && title && (
                    <CardHeader 
                    sx={headerSX} 
                    title={<Typography variant="h3">{title}</Typography>}
                     action={secondary} >

                    </CardHeader>
                )}
               
                {/* content & header divider */}
                {title && <Divider />}
                
                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
                
                {
                 actions ? 
                 <CardActions>{actions}</CardActions>: null
                }
                
            </Card>
        );
    }
);

MainCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    actions: PropTypes.node
};

export default MainCard;
