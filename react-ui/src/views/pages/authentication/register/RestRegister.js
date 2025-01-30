import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../../../hooks/useScriptRef';
import AnimateButton from './../../../../component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../../utils/password-strength';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import UserService from '../../../../services/UserService';
import { useDispatch } from 'react-redux';
import UserSponsorService from '../../../../services/UserSponsorService';
import AuthService from '../../../../services/AuthService';
import AccessSponsorService from '../../../../services/AccessSponsorService';
import { LOGIN_SUCCESS } from '../../../../types';

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
// style constant
const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    }
}));

//===========================|| API JWT - REGISTER ||===========================//

const RestRegister = ({ ...others }) => {
    const dispatch=useDispatch()
    const classes = useStyles();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');

    const [form, setForm] = React.useState('registeration');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const doProcess=(values, {setErrors, setStatus, setSubmitting })=>{
        try {
             UserService.exists(values.registeredEmail).then(function (userExsits) {
                if(userExsits.data){
                    setStatus({ success: false });
                    setErrors({ submit: 'Email address already exists or associated in another member'});
                    setSubmitting(false);
                } else{
                    AuthService.register({...values, username: values.registeredEmail}).then(function (userResponse){
                        if(userResponse.data){
                            dispatch({ type: LOGIN_SUCCESS, payload: userResponse.data.token });
                            setTimeout(()=>{
                                AccessSponsorService.add({...values, userAccountId: userResponse.data.user.id}).then(function (accessSponsorResponse){
                                    if(accessSponsorResponse.data){
                                        AccessSponsorService.changeStatus({status:'Approval', remarks:'Need approval', userSponsorId: accessSponsorResponse.data.id}).then(function (accessSponsorStatusResponse){
                                           
                                        });
                                    }
                                });
                            },1000);
                        }
                    }).catch(function (error) {
                        console.error(error);
                        setStatus({ success: false });
                        setErrors({ submit: 'Sponsor not registed!' });
                        setSubmitting(false);
                    });
                }
            })
        } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
            }
        }
    }

    const businessForm=({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email address"
                        margin="normal"
                        name="emailAddress"
                        id="emailAddress"
                        type="email"
                        value={values.emailAddress}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={classes.loginInput}
                        error={touched.emailAddress && Boolean(errors.emailAddress)}
                    />
                    {touched.emailAddress && errors.emailAddress && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.emailAddress}
                        </FormHelperText>
                    )}
                </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.phoneNumber && errors.phoneNumber)} 
            className={classes.loginInput}>
                <InputLabel htmlFor="outlined-adornment-phoneNumber-register">PhoneNumber</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email-register"
                    type="phoneNumber"
                    value={values.phoneNumber}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                        {' '}
                        {errors.phoneNumber}{' '}
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.permamentAddress && errors.permamentAddress)} className={classes.loginInput}>
                <InputLabel htmlFor="outlined-adornment-password-register">permamentAddress</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password-register"
                    type={showPassword ? 'text' : 'password'}
                    value={values.permamentAddress}
                    name="permamentAddress"
                    label="permamentAddress"
                    onBlur={handleBlur}
                    onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    inputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />
                {touched.permamentAddress && errors.permamentAddress && (
                    <FormHelperText error id="standard-weight-helper-text-permamentAddress-register">
                        {errors.permamentAddress}
                    </FormHelperText>
                )}
            </FormControl>

            {strength !== 0 && (
                <FormControl fullWidth>
                    <Box
                        sx={{
                            mb: 2
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Box
                                    backgroundColor={level.color}
                                    sx={{
                                        width: 85,
                                        height: 8,
                                        borderRadius: '7px'
                                    }}
                                ></Box>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" fontSize="0.75rem">
                                    {level.label}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(event) => setChecked(event.target.checked)}
                                name="checked"
                                color="primary"
                            />
                        }
                        label={
                            <Typography variant="subtitle1">
                                Agree with &nbsp;
                                <Typography variant="subtitle1" component={Link} to="#">
                                    Terms & Condition.
                                </Typography>
                            </Typography>
                        }
                    />
                </Grid>
            </Grid>
            {errors.submit && (
                <Box
                    sx={{
                        mt: 3
                    }}
                >
                    <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
            )}

            <Box
                sx={{
                    mt: 2
                }}
            >
                <AnimateButton>
                    <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                        Add business
                    </Button>
                </AnimateButton>
            </Box>
        </form>
    );

    const bussinessProcess=()=>{
         return <Formik
                initialValues={{
                    phoneNumber: '',
                    emailAddress: '',
                    permamentAddress: '',
                    presentAddress: ''
                }}
                validationSchema={Yup.object().shape({
                    permamentAddress: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    phoneNumber: Yup.string().required('Phone number is required')
                })}
                onSubmit={
                    (values, { setErrors, setStatus, setSubmitting }) => 
                    businessForm(values, { setErrors, setStatus, setSubmitting })
                 }
            >
                {
                   ({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values })=> registerationForm({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values })
                }
            </Formik>
    }

    const registerationForm=({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Name of customer"
                        margin="normal"
                        name="accountName"
                        id="accountName"
                        type="text"
                        value={values.accountName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={classes.loginInput}
                        error={touched.accountName && Boolean(errors.accountName)}
                    />
                    {touched.accountName && errors.accountName && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.accountName}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Sponser Leader Id"
                    margin="normal"
                    name="sponsorLeaderId"
                    id="sponsorLeaderId"
                    type="text"
                    value={values.sponsorLeaderId}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={classes.loginInput}
                    error={touched.sponsorLeaderId && Boolean(errors.sponsorLeaderId)}
                />
                {touched.sponsorLeaderId && errors.sponsorLeaderId && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.sponsorLeaderId}
                    </FormHelperText>
                )}
                </Grid>
         

            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="UTR Number"
                    margin="normal"
                    name="utrNumber"
                    id="utrNumber"
                    type="text"
                    value={values.utrNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={classes.loginInput}
                    error={touched.utrNumber && Boolean(errors.utrNumber)}
                />
                {touched.utrNumber && errors.utrNumber && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.utrNumber}
                    </FormHelperText>
                )}
                        </Grid>
                        <Grid item xs={6}>
                        <Button
                            fullWidth
                            component="label"
                            role={undefined}
                            variant="contained"
                            className={classes.loginInput}
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            size='large'
                            style={{height:60}}
                            >
                            Upload Reciept
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event)=>{
                                    var file = event.target.files[0];
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
            
                                    reader.onloadend = function (e) {
                                        console.log(reader.result);
                                        values['utrReceipt']=reader.result;
                                    }.bind(this)
                                }}
                                //error={touched.utrReceipt && Boolean(errors.utrReceipt)}
                            />
                            </Button>
                            {touched.utrReceipt && errors.utrReceipt && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.utrReceipt}
                                </FormHelperText>
                            )}
                        
                </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.channelSubscription && errors.channelSubscription)} className={classes.loginInput}>
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    name="registeredEmail"
                    id="registeredEmail"
                    type="email"
                    value={values.registeredEmail}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={classes.loginInput}
                    error={touched.registeredEmail && Boolean(errors.registeredEmail)}
                />
                {touched.registeredEmail && errors.registeredEmail && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.registeredEmail}
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} className={classes.loginInput}>
                <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password-register"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    inputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />
                {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-register">
                        {errors.password}
                    </FormHelperText>
                )}
            </FormControl>

            {strength !== 0 && (
                <FormControl fullWidth>
                    <Box
                        sx={{
                            mb: 2
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Box
                                    backgroundColor={level.color}
                                    sx={{
                                        width: 85,
                                        height: 8,
                                        borderRadius: '7px'
                                    }}
                                ></Box>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" fontSize="0.75rem">
                                    {level.label}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(event) => setChecked(event.target.checked)}
                                name="checked"
                                color="primary"
                            />
                        }
                        label={
                            <Typography variant="subtitle1">
                                Agree with &nbsp;
                                <Typography variant="subtitle1" component={Link} to="#">
                                    Terms & Condition.
                                </Typography>
                            </Typography>
                        }
                    />
                </Grid>
            </Grid>
            {errors.submit && (
                <Box
                    sx={{
                        mt: 3
                    }}
                >
                    <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
            )}

            <Box
                sx={{
                    mt: 2
                }}
            >
                <AnimateButton>
                    <Button
                        disableElevation
                        //disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Sign UP
                    </Button>
                </AnimateButton>
            </Box>
        </form>
    );

    useEffect(() => {
        changePassword('123456');
    }, []);

    const registerationProcess=()=>{
        return <Formik
        initialValues={{
            accountName: '',
            utrNumber: '',
            sponsorLeaderId: '',
            utrReceipt:'',
            registeredEmail:'',
            password: ''
        }}
        validationSchema={Yup.object().shape({
            utrNumber: Yup.number().required('UTR number is required'),
            accountName: Yup.string().required('Name is required'),
            utrReceipt: Yup.string().required('Reciept is required'),
            registeredEmail: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={
            (values, { setErrors, setStatus, setSubmitting }) => 
               doProcess(values, { setErrors, setStatus, setSubmitting }
            )
        }
    >
        {
           ({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values })=> 
            registerationForm({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values })
        }
    </Formik>
    }

    return (
        <React.Fragment>
            {
                registerationProcess()

            }
        </React.Fragment>
    );
};

export default RestRegister;
