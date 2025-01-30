import React, { useState } from 'react';

// material-ui
import { Box, Button, Card, CardContent, CardHeader, Fab, FormControl, Grid, InputLabel, MenuItem, Select, TableCell, TextField} from '@material-ui/core';

// project imports
import { useDispatch} from 'react-redux';

import { updateUserVendor } from '../../../actions';
import { EditOutlined } from '@material-ui/icons';
import DynamicTable from '../../../component/table/DynamicTable';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PreviewIcon from '@mui/icons-material/Preview';

const tableheaders = [
    {
        name: "name",
        label: "Name",
        type: 'text'
    },
    {
        name: "emailAddress",
        label: "Email address",
        type: 'email'
    },
    {
        name: "phoneNumber",
        label: "Phone number",
        type: 'text'
    },
    {
        name: "mobileNumber",
        label: "mobileNumber",
        type: 'text'
    },
    {
        name: "permamentAddress",
        label: "Permament address",
        type: 'text'
    },
    {
        name: "presentAddress",
        label: "Present Address",
        type: 'text'
    },
    {
        name: "actions",
        label: "Actions",
        render: (value, row, rowIndex, header, props)=>{
            return <TableCell key={header.name+'_'+rowIndex} align='right'>
                       
                    <Fab color="secondary" aria-label="Delete" size='small' onClick={() => props.deleteAction(row)} >
                        <DeleteIcon />
                    </Fab>
                </TableCell>
        }
    }
];

const CustOwnerAccount = ({vendorAccount, userAccount, vendorList}) => {
    const dispatch= useDispatch();
        
    const [vendorDetail, setVendorDetail]= useState(vendorAccount);

    const setVendorDetailField= (event, name)=>{
        let newVendorDetail={...vendorDetail};
        newVendorDetail[name]=event.target.value;
        setVendorDetail(newVendorDetail);
    }

    const editVendorDetail=()=>{
        console.log("vendorDetail=",vendorDetail)
        dispatch(updateUserVendor(vendorDetail?.id, vendorDetail));
    }

    const isNotOwner= ()=>{
        return vendorDetail?.id!==userAccount?.ownerId;
    }

     const _delete = row => {
        row['parentVendorId']=null;
        dispatch(updateUserVendor(row?.id, row));
     };

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
                                        <FormControl fullWidth style={{paddingLeft:0, marginLeft:0}}>
                                            <InputLabel 
                                            htmlFor="vendorDetail-parentVendorId"
                                            id={"vendorDetail-parentVendorId-label"}>{"Super owner"}</InputLabel>
                                            <Select
                                                id="vendorDetail-parentVendorId"
                                                label="Super owner"
                                                name='parentVendorId'
                                                defaultValue={vendorDetail?.parentVendorId}
                                                value={vendorDetail?.parentVendorId}
                                                variant='standard'
                                                onChange={(event)=> setVendorDetailField(event,'parentVendorId')}
                                                disabled={isNotOwner()}
                                            >
                                            {
                                                vendorList.filter(vendor=>vendor.name && vendor.id!==userAccount.ownerId).map(vendor=><MenuItem value={vendor.id} key={vendor.id}>{vendor.name} - {vendor.emailAddress}</MenuItem>)
                                            }
                                            </Select>
                                        </FormControl>
                                    </Grid>
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
                            <Grid item  xl={12} xs={12} xm={12} sx={{textAlign: 'right'}}>
                            <DynamicTable 
                                headers={tableheaders} 
                                dataList={vendorDetail.vendorList}
                                deleteAction = {_delete}
                                ></DynamicTable>
                            </Grid>
                        </Grid>
                    </CardContent>
                 </Card>
            </Box>
    );
};

export default CustOwnerAccount;
