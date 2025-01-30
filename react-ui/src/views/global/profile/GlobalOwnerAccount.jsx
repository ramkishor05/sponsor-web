import React, { useState } from 'react';

// material-ui
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';

// project imports
import { useDispatch, useSelector } from 'react-redux';

import { getUserVendor, updateUserVendor} from '../../../actions';
import { EditOutlined, Refresh } from '@material-ui/icons';
import { useEffect } from 'react';

//==============================|| SAMPLE PAGE ||==============================//

const GlobalOwnerAccount = ({vendorAccount, userAccount}) => {
    const dispatch= useDispatch();
        
    const [vendorDetail, setVendorDetail]= useState(vendorAccount);

    const setVendorDetailField= (event, name)=>{
        let newVendorDetail={...vendorDetail};
        newVendorDetail[name]=event.target.value;
        setVendorDetail(newVendorDetail);
    }

    const editVendorDetail=()=>{
        dispatch(updateUserVendor(vendorDetail?.id, vendorDetail));
    }

    const isNotOwner= ()=>{
        return vendorAccount?.id!==userAccount?.id;
    }

    return (
            <Box
                component="form"
                noValidate
                autoComplete="off"
                >
                <Card sx={{ border:5 , borderStyle:'revert'}}>
                    <CardHeader title="Owner Account">
                  </CardHeader>
                  <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xl={12} xs={12} xm={12}>
                    <Grid container spacing={3}>
                        <Grid item  xl={4} xs={4} xm={4}>
                            <FormControl fullWidth>
                            <TextField
                                id="vendorDetail-name"
                                label="Name"
                                name='name'
                                defaultValue={vendorDetail?.name}
                                variant='standard'
                                onChange={(event)=> setVendorDetailField(event,'name')}
                                disabled={isNotOwner()}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="vendorDetail-emailAddress"
                                label="Email Address"
                                name='emailAddress'
                                defaultValue={vendorDetail?.emailAddress}
                                variant='standard'
                                onChange={(event)=> setVendorDetailField(event,'emailAddress')}
                                disabled={isNotOwner()}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="vendorDetail-mobileNumber"
                                label="Mobile Number"
                                name='mobileNumber'
                                defaultValue={vendorDetail?.mobileNumber}
                                variant='standard'
                                onChange={(event)=> setVendorDetailField(event,'mobileNumber')}
                                disabled={isNotOwner()}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="vendorDetail-phoneNumber"
                                name='phoneNumber'
                                label="Phone Number"
                                defaultValue={vendorDetail?.phoneNumber}
                                variant='standard'
                                onChange={(event)=> setVendorDetailField(event,'phoneNumber')}
                                disabled={isNotOwner()}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="vendorDetail-permamentAddress"
                                name='permamentAddress'
                                label="Permament Address"
                                defaultValue={vendorDetail?.permamentAddress}
                                variant='standard'
                                onChange={(event)=> setVendorDetailField(event,'permamentAddress')}
                                disabled={isNotOwner()}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="vendorDetail-presentAddress"
                                name='presentAddress'
                                label="Present Address"
                                defaultValue={vendorDetail?.presentAddress}
                                variant='standard'
                                onChange={(event)=> setVendorDetailField(event,'presentAddress')}
                                disabled={isNotOwner()}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item  xl={12} xs={12} xm={12} sx={{textAlign: 'right'}}>
                            <Button variant='contained' onClick={editVendorDetail} disabled={isNotOwner()} ><EditOutlined></EditOutlined></Button>
                        </Grid>
                    </Grid>
                    </CardContent>
                 </Card>
            </Box>
    );
};

export default GlobalOwnerAccount;
