import React, { useState } from 'react';

// material-ui
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';

// project imports
import { useDispatch, useSelector } from 'react-redux';

import { updateUserProfile, getUserProfile } from '../../../actions';
import { EditOutlined } from '@material-ui/icons';
import ImageUploadCard from '../../../component/media/ImageUploadCard';
import { useEffect } from 'react';

//==============================|| SAMPLE PAGE ||==============================//

const GlobalUserProfile = () => {
    const dispatch= useDispatch();
    const {userDetail} = useSelector((state) => state.userReducer);
    
    const [userProfile, setUserProfile]= useState(userDetail.userProfile);

    const setUserProfileField= (event, name)=>{
        let newUserProfile={...userProfile};
        newUserProfile[name]=event.target.value;
        setUserProfile(newUserProfile);
    }

    const setUserProfileImge= (value, name)=>{
        let newUserProfile={...userProfile};
        newUserProfile[name]=value;
        setUserProfile(newUserProfile);
    }

    const editUserProfile=()=>{
        dispatch(updateUserProfile(userProfile));
    }

    useEffect(()=>{
        dispatch(getUserProfile(userProfile?.id));
    },[getUserProfile])
    
    return (
            <Box
                component="form"
                noValidate
                autoComplete="off"
                >
                   <Card sx={{ border:5, borderStyle:'revert'}}>
                    <CardHeader title="User profile">
                  </CardHeader>
                  <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xl={3} xs={4} xm={3}>
                        <ImageUploadCard name="pictureURL" image={userProfile?.pictureURL} setImge={(value)=> setUserProfileImge(value,'pictureURL')}></ImageUploadCard>
                    </Grid>
                    <Grid item xl={6} xs={8} xm={6}>
                    <Grid container spacing={3}>
                        
                        <Grid item  xl={3} xs={6} xm={3}>
                            <FormControl fullWidth>
                            <TextField
                                id="userprofile-fullName"
                                label="Name"
                                defaultValue={userProfile?.fullName}
                                variant='standard'
                                onChange={(event)=> setUserProfileField(event,'fullName')}
                                InputProps={{
                                    startAdornment: 
                                <Select
                                    labelId="userProfile-title-label"
                                    id="userProfile-title"
                                    value={userProfile?.title}
                                    label="Title"
                                    onChange={(event)=> setUserProfileField(event,'title')}
                                    variant='standard'
                                >
                                    <MenuItem value={'Mr.'}>Mr.</MenuItem>
                                    <MenuItem value={'Mrs.'}>Mrs.</MenuItem>
                                    <MenuItem value={'Ms'}>Ms.</MenuItem>
                                </Select>
                                }}
                            />
                            </FormControl>
                        </Grid>
                        
                        <Grid item  xl={3} xs={6} xm={3}>
                        <FormControl fullWidth>
                            <TextField
                                id="userprofile-preferredName"
                                label="Preferred Name"
                                defaultValue={userProfile?.preferredName}
                                variant='standard'
                                onChange={(event)=> setUserProfileField(event,'preferredName')}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item  xl={12} xs={12} xm={12} sx={{textAlign: 'right'}}>
                            <Button variant='contained' onClick={editUserProfile} ><EditOutlined></EditOutlined></Button>
                        </Grid>
                    </Grid>
                    </CardContent>
                 </Card>
            </Box>
               
    );
};

export default GlobalUserProfile;
