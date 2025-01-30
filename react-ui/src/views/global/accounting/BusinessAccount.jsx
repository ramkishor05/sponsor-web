import { Button, Grid, TextField } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect } from 'react';
import { editBusinessAccount, getBusinessAccount } from '../../../actions/BusinessAccountActions';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

 const BusinessAccount = (props)=>{

    const dispatch=useDispatch();

    const { businessAccount } = useSelector(state=>state.businessAccountReducer);

    useEffect(()=>{
        dispatch(getBusinessAccount());
    },[])
    
    const updateBankName= (event)=>{
        if(!businessAccount['bankAccount']){
            businessAccount['bankAccount']={}
        }
        businessAccount['bankAccount']['bankName']=event.target.value;
    }

    const updateAccountHolder =(event)=>{
        if(!businessAccount['bankAccount']){
            businessAccount['bankAccount']={}
         }
        businessAccount['bankAccount']['accountHolder']=event.target.value;
    }

    const updateAccountNumber= (event)=>{
        if(!businessAccount['bankAccount']){
            businessAccount['bankAccount']={}
         }
        businessAccount['bankAccount']['accountNumber']=event.target.value;
    }

    const updateIfsc= (event)=>{
        if(!businessAccount['bankAccount']){
            businessAccount['bankAccount']={}
         }
        businessAccount['bankAccount']['ifsc']=event.target.value;
    }

    const updateUpiHolder= (event)=>{
         if(!businessAccount['bankUpi']){
            businessAccount['bankUpi']={}
         }
         businessAccount['bankUpi']['upiHolder']=event.target.value;
    }

    const updateUpiCode= (event)=>{
        if(!businessAccount['bankUpi']){
            businessAccount['bankUpi']={}
        }
        businessAccount['bankUpi']['upiId']=event.target.value;
    }
    
    const uploadQR=(event)=>{
        var file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            console.log(reader.result);
            if(!businessAccount['bankUpi']){
                businessAccount['bankUpi']={}
             }
            businessAccount['bankUpi']['qrCode']=reader.result;
        }.bind(this)
    }

    const onSave=()=>{
        dispatch(editBusinessAccount(businessAccount.id, businessAccount));
    }

    return <Grid container spacing={2} style={{border:1}}>
    <Grid item sx={5} md={5} xs={5}>  
         <Grid container spacing={2}  >
            <Grid item sx={12} md={12}> 
                <TextField
                fullWidth
                value={businessAccount?.bankAccount?.bankName}
                label="Bank Name"
                variant={'standard'}
                size='small'
                onChange={updateBankName}
                ></TextField>

                <TextField
                fullWidth
                value={businessAccount?.bankAccount?.accountHolder}
                label="Account Holder"
                variant={'standard'}
                size='small'
                onChange={updateAccountHolder}
                ></TextField>

                <TextField
                fullWidth
                value={businessAccount?.bankAccount?.accountNumber}
                label="Account Number"
                variant={'standard'}
                size='small'
                onChange={updateAccountNumber}
                ></TextField>

                <TextField
                fullWidth
                value={businessAccount?.bankAccount?.ifsc}
                label="IFSC"
                variant={'standard'}
                size='small'
                onChange={updateIfsc}
                ></TextField>
            </Grid>
        </Grid>
    </Grid>
    <Grid item sx={5} md={5} xs={5}>  
        <Grid container spacing={0} >
            <Grid item sx={12} md={12}>    
            <TextField
               fullWidth
                value={businessAccount?.bankUpi?.upiHolder}
                label="UPI Holder"
                variant={'standard'}
                size='small'
                onChange={updateUpiHolder}
                ></TextField>

                <TextField
                fullWidth
                value={businessAccount?.bankUpi?.upiId}
                label="UPI Address"
                variant={'standard'}
                size='small'
                onChange={updateUpiCode}
                ></TextField>

            <Button
                style={{marginTop:5}}
                fullWidth
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                size='large'
                >
                Upload QR
                <VisuallyHiddenInput
                    type="file"
                    onChange={uploadQR}
                />
                </Button>

            </Grid>
        </Grid>
        
    </Grid>
    <Grid item sx={2} md={2} xs={2}>  
        <Button fullWidth variant="contained" color='secondary' onClick={()=> onSave()}>Save</Button>
    </Grid>
</Grid>
}

export default BusinessAccount;