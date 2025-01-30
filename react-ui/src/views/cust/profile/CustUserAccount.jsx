import React, { useState } from 'react';

// material-ui
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';

// project imports
import { useDispatch, useSelector } from 'react-redux';

import { updateUser} from '../../../actions';
import { EditOutlined } from '@material-ui/icons';
import { useEffect } from 'react';

//==============================|| SAMPLE PAGE ||==============================//

const CustUserAccount = (props) => {
    const dispatch= useDispatch();
   
    const [userAccont, setUserAccont]= useState(props.userAccount);

    const setUserAccontField= (event, name)=>{
        let newUserAccont={...userAccont};
        newUserAccont[name]=event.target.value;
        setUserAccont(newUserAccont);
    }

    const editUserAccont=()=>{
        userAccont['userRoleId']=userAccont.userRole.id;
        dispatch(updateUser(userAccont.id, userAccont));
    }

    useEffect(()=>{
        
    },[])
    
    return (
            <Box
                component="form"
                noValidate
                autoComplete="off"
                >
                   <Card sx={{ border:5 , borderStyle:'revert'}}>
                   
                  <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xl={12} xs={12} xm={12}>
                    <Grid container spacing={3}>
                        <Grid item  xl={4} xs={4} xm={4}>
                            <FormControl fullWidth>
                            <TextField
                                id="userAccont-username"
                                label="Username"
                                name='username'
                                defaultValue={userAccont.username}
                                variant='standard'
                                disabled
                                onChange={(event)=> setUserAccontField(event,'username')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="userAccont-password"
                                label="Password"
                                name='password'
                                type='password'
                                defaultValue={userAccont.password}
                                value={userAccont.password}
                                variant='standard'
                                onChange={(event)=> setUserAccontField(event,'password')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="userAccont-mobile"
                                label="Registered Mobile"
                                name='registeredMobile'
                                defaultValue={userAccont.registeredMobile}
                                value={userAccont.registeredMobile}
                                variant='standard'
                                onChange={(event)=> setUserAccontField(event,'registeredMobile')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="userAccont-email"
                                name='registeredEmail'
                                label="Registered email"
                                defaultValue={userAccont.registeredEmail}
                                value={userAccont.registeredEmail}
                                variant='standard'
                                onChange={(event)=> setUserAccontField(event,'registeredEmail')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="userAccont-accountName"
                                name='accountName'
                                label="Account Name"
                                defaultValue={userAccont.accountName}
                                variant='standard'
                                onChange={(event)=> setUserAccontField(event,'accountName')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="userAccont-type"
                                name='type'
                                label="Registered type"
                                defaultValue={userAccont.type}
                                variant='standard'
                                disabled
                                onChange={(event)=> setUserAccontField(event,'type')}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item  xl={12} xs={12} xm={12} sx={{textAlign: 'right'}}>
                            <Button variant='contained' onClick={editUserAccont} ><EditOutlined></EditOutlined></Button>
                        </Grid>
                    </Grid>
                    </CardContent>
                 </Card>
            </Box>
               
    );
};

export default CustUserAccount;
