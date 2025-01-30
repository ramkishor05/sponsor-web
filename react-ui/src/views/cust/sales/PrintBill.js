import React, { Component } from 'react';
import 'date-fns';

import moment from 'moment';


// material-ui
import { Avatar, Box, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, List, ListItem, ListItemText, Modal, Paper, Radio, RadioGroup, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from '@material-ui/core';
import CustomerDropDwon from '../../../component/dropdwons/CustomerDropDwon';
// project imports
import { makeStyles, styled } from '@material-ui/styles';
import ItemOptions from '../../../component/dropdwons/ItemOptions';
import { 
    getCustProductList, getCustCustomerList
 } from '../../../actions';

import ShoppingCartButton from '../../../component/buttons/ShoppingCartButton';
import DynamicField from '../../../component/fields/DynamicField';
import { connect } from 'react-redux';
import { GridCloseIcon } from '@mui/x-data-grid';
import { LabelImportant } from '@material-ui/icons';
import PaymentField from '../../../component/fields/PaymentField';
import Invoice from '../../../component/invoices/Invoice';

  const ToggleSwitch = styled((props) => (
    <Switch fullWidth focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

//==============================|| SAMPLE PAGE ||==============================//
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    root: {
        width: '100%',
      },
      container: {
        maxHeight: 440,
      }
  }));

  class PrintBill extends Component {

    render() {

    const { open, close, title, type, data, headers} = this.props;
    
    return (
        <>
        
        <BootstrapDialog
            aria-labelledby="Add Sale"
            aria-describedby="Modal for adding sales"
            open={open}
            onClose={close}
            maxWidth={'md'}
            fullWidth={true}
        >
           <DialogTitle>
              <Typography>
              {title}
              </Typography>
              <IconButton
              aria-label="close"
              onClick={close}
              sx={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  color: (theme) => theme.palette.grey[500],
                  background:(theme) => theme.palette.secondary
              }}
              >
              <GridCloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
                <Invoice invoice={data} {...this.props}></Invoice>
            </DialogContent>
           
         </BootstrapDialog>
         </>
    );
};
  }



const mapStateToProps = state => {
    const { custProductList } = state.custProductReducer;

    const { custCustomerList } = state.custCustomerReducer;

    return { custProductList, custCustomerList };
}

export default connect(mapStateToProps, { getCustProductList, getCustCustomerList})(PrintBill);