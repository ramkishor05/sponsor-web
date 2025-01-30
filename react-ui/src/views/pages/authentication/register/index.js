import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Button, ButtonGroup, useTheme } from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper1 from './../AuthWrapper1';
import AuthCardWrapper from './../AuthCardWrapper';
import Logo from './../../../../component/Logo';
import RestRegister from './RestRegister';
import AuthFooter from './../../../../component/cards/AuthFooter';
import UPI from './upi_transfer.webp'
import QRCode from "react-qr-code";
import BANK from './bank-transfer.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { getBusinessAccount } from '../../../../actions/BusinessAccountActions';



// assets

//===============================|| AUTH3 - REGISTER ||===============================//

const Register = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const [paymentMode, setPaymentMode]=useState("");

    const {businessAccount} = useSelector(state=>state.businessAccountReducer);
    console.log("businessAccount=",businessAccount);
    useEffect(()=>{
        callback()
    },[]);

    const callback=()=>{
        dispatch(getBusinessAccount());
    }

    const upiView=()=>{
       if(businessAccount?.bankUpi?.qrCode!=='' && businessAccount?.bankUpi?.qrCode!==null){
        debugger;
            return <img src={businessAccount?.bankUpi?.qrCode} width={240} height={240}/>
        }
       if(businessAccount?.bankUpi?.upiId && businessAccount?.bankUpi?.upiHolder ){
          return <QRCode
               size={240}
               style={{ height: "auto", maxWidth: "100%", width: "100%" }}
               value={'upi://pay?pa='+businessAccount?.bankUpi?.upiId+'&pn='+businessAccount?.bankUpi?.upiHolder+'&mc=0000&mode=02&purpose=00'}
               viewBox={`0 0 150 150`}
           />
       }
      return "";
    }

    const impsView=()=>{

    }

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item >
                                        <RouterLink to="#">
                                            <Logo />
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                   
                                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Enter your detail to continue
                                                    </Typography>
                                                    <ButtonGroup>
                                                        <Button variant='outlined' onClick={()=>
                                                             {
                                                                setPaymentMode('IMPS')
                                                                callback()
                                                             }
                                                             }>
                                                            <img src={BANK} width={40} height={40}/>
                                                            <span style={{fontSize:24}}>IMPS</span>
                                                        </Button>
                                                        <Button variant='outlined' onClick={()=> {
                                                            setPaymentMode('UPI')
                                                            callback()
                                                        }}>
                                                            <img src={UPI} width={40} height={40}/>
                                                            <span style={{fontSize:24}}>UPI</span>
                                                        </Button>
                                                    </ButtonGroup>
                                                    

                                                  {
                                                    
                                                    paymentMode==='UPI' && 
                                                    <div>
                                                        {
                                                            upiView()
                                                        }
                                                    </div>

                                                  }  
                                                  {
                                                    paymentMode==='IMPS' &&
                                                     
                                                    <div style={{width: 240}}>
                                                        <Grid container>
                                                            <Grid item sx={7} xs={7} lg={7}>
                                                                Bank Name:
                                                            </Grid>
                                                            <Grid item sx={5} xs={5} lg={5}>
                                                                {businessAccount?.bankAccount?.bankName}
                                                            </Grid>

                                                            <Grid item sx={7} xs={7} lg={7}>
                                                                Account Holder:
                                                            </Grid>
                                                            <Grid item sx={5} xs={5} lg={5}>
                                                                {businessAccount?.bankAccount?.accountHolder}
                                                            </Grid>
                                                            <Grid item sx={7} xs={7} lg={7}>
                                                                Account Number:
                                                            </Grid>
                                                            <Grid item sx={5} xs={5} lg={5}>
                                                                {businessAccount?.bankAccount?.accountNumber}
                                                            </Grid>
                                                            <Grid item sx={7} xs={7} lg={7}>
                                                                IFSC:
                                                            </Grid>
                                                            <Grid item sx={5} xs={5} lg={5}>
                                                                {businessAccount?.bankAccount?.ifsc}
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                  }
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RestRegister />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                component={RouterLink}
                                                to="/login"
                                                variant="subtitle1"
                                                sx={{ textDecoration: 'none' }}
                                            >
                                                Have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Register;
